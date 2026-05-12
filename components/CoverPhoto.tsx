"use client";

import { useRef, useState } from "react";
import { Camera, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CoverPhotoProps {
  coverImage?: string | null;
  onCoverChange: (image: string | null) => void;
}

export function CoverPhoto({ coverImage, onCoverChange }: CoverPhotoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 5MB.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onerror = () => {
      toast({ title: "Error", description: "Failed to read the file.", variant: "destructive" });
      setIsLoading(false);
    };

    reader.onloadend = async () => {
      const result = reader.result;
      if (typeof result !== "string") {
        toast({ title: "Error", description: "Failed to read file.", variant: "destructive" });
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/user/cover", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ coverImage: result }),
        });
        if (!res.ok) throw new Error();
        onCoverChange(result);
        toast({ title: "Cover updated" });
      } catch {
        toast({ title: "Error", description: "Failed to upload cover.", variant: "destructive" });
      } finally {
        setIsLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };

    reader.readAsDataURL(file);
  };

  const handleRemove = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/cover", { method: "DELETE" });
      if (!res.ok) throw new Error();
      onCoverChange(null);
      toast({ title: "Cover removed" });
    } catch {
      toast({ title: "Error", description: "Failed to remove cover.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative w-full h-32 sm:h-48 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {coverImage ? (
        <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-c-surface via-c-panel to-c-border" />
      )}

      {isHovered && !isLoading && (
        <div className="absolute bottom-3 right-4 flex gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/50 hover:bg-black/70 text-white text-xs rounded-md backdrop-blur-sm border border-white/10 transition-all"
          >
            <Camera className="w-3.5 h-3.5" /> Change Cover
          </button>
          {coverImage && (
            <button
              onClick={handleRemove}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-black/50 hover:bg-red-900/80 text-white text-xs rounded-md backdrop-blur-sm border border-white/10 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </button>
          )}
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  );
}
