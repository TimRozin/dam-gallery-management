import type { Metadata } from "next";
import "./globals.css";
import { TagProvider } from "@/lib/context";

export const metadata: Metadata = {
  title: "Digital Asset Management - Photo Gallery",
  description: "A simple DAM system for managing and searching photos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <TagProvider>{children}</TagProvider>
      </body>
    </html>
  );
}
