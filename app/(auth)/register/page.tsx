"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JotionLogo } from "@/components/JotionLogo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (password.length < 8) {
      toast({ title: "Password too short", description: "Minimum 8 characters.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setIsLoading(false);
    if (!res.ok) {
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      toast({ title: "Registration failed", description: data.error ?? "Something went wrong.", variant: "destructive" });
    } else {
      toast({ title: "Account created!", description: "Please sign in." });
      router.push("/login");
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
          <p className="text-c-t3 text-sm">Create your account</p>
        </div>

        <div className="space-y-3">
          <GoogleSignInButton label="Sign up with Google" />

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-c-border" />
            <span className="text-xs text-c-t4">or</span>
            <div className="flex-1 h-px bg-c-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-c-t3 text-xs">Full Name</Label>
              <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className={fieldClass} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-c-t3 text-xs">Email</Label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={fieldClass} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-c-t3 text-xs">Password</Label>
              <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" className={fieldClass} />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-c-text text-c-bg hover:bg-white hover:text-black font-medium">
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-c-t3">
          Already have an account?{" "}
          <Link href="/login" className="text-c-t2 hover:text-c-text transition-colors underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
