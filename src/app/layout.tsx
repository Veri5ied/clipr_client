import type { Metadata } from "next";
import "./globals.css";
import "../sass/main.scss";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Clipr",
  description: "Generate beautiful code snippets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
