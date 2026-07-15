import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nilou Afshar — Artist & Art Educator in Toronto",
  description:
    "Explore the paintings, prints and drawings of Nilou Afshar and learn about art classes for children, teens and adults in Toronto.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
