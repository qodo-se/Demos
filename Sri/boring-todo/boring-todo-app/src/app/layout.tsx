import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boring Todo App",
  description: "Sri's boring todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
