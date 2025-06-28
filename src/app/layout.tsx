import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Performance Demonstrations",
  description: "Projeto educacional que demonstra técnicas de otimização de performance no Next.js e React",
  keywords: ["Next.js", "React", "Performance", "useCallback", "useMemo", "Image Optimization"],
  authors: [{ name: "Matheus Filho" }],
  creator: "Matheus Filho",
  openGraph: {
    title: "Next.js Performance Demonstrations",
    description: "Projeto educacional que demonstra técnicas de otimização de performance no Next.js e React",
    type: "website",
    url: "https://next-performace.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
