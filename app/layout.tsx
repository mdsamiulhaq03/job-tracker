import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"], weight: ["700"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "Jotion",
  description: "Track your job applications and internships with Jotion",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={oswald.variable}>
      <body className={`${inter.className} min-h-screen bg-c-bg text-c-text`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
