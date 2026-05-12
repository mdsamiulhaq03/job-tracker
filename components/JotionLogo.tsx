import { NotebookPen } from "lucide-react";

interface JotionLogoProps {
  iconSize?: number;
  textSize?: string;
}

export function JotionLogo({ iconSize = 28, textSize = "text-2xl" }: JotionLogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex items-center justify-center">
        <NotebookPen
          width={iconSize}
          height={iconSize}
          strokeWidth={1.5}
          className="text-c-text"
        />
      </div>
      <span
        className={`${textSize} font-bold tracking-[0.15em] text-c-text uppercase`}
        style={{ fontFamily: "var(--font-oswald), sans-serif" }}
      >
        Jotion
      </span>
    </div>
  );
}
