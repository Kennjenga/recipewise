import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recipe wizard",
  description: "An AI based recipe assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
