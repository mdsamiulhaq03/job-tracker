"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JotionLogo } from "@/components/JotionLogo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const result = await signIn("credentials", { email, password, redirect: false });
    setIsLoading(false);
    if (result?.error) {
      toast({ title: "Login failed", description: "Invalid email or password.", variant: "destructive" });
    } else {
      router.push("/dashboard");
    }
  };

  const fieldClass = "bg-c-input border-c-border text-c-text placeholder:text-c-t4 focus-visible:ring-1 focus-visible:ring-c-t3";

  return (
    <div className="min-h-screen bg-c-bg flex items-center justify-center px-4 relative">
      <Link href="/" className="absolute top-4 left-4 flex items-center gap-1.5 text-c-t3 hover:text-c-text text-sm transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-3">
            <JotionLogo iconSize={26} textSize="text-2xl" />
          </div>
          <p className="text-c-t3 text-sm">Sign in to your account</p>
        </div>

        <div className="space-y-3">
          <GoogleSignInButton label="Sign in with Google" />

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-c-border" />
            <span className="text-xs text-c-t4">or</span>
            <div className="flex-1 h-px bg-c-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-c-t3 text-xs">Email</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={fieldClass} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-c-t3 text-xs">Password</Label>
              <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={fieldClass} />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-c-text text-c-bg hover:bg-white hover:text-black font-medium">
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-c-t3">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-c-t2 hover:text-c-text transition-colors underline underline-offset-4">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
