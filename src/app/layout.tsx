import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../styles/fonts.css";



export const metadata: Metadata = {
  title: "To Do List",
  description: "This is my app, add delete update my task with this app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
