import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Kanban from "./kanban/page";
import { Providers } from "./providers"; // Redux Provider
import ThemeWrapper from "./ThemeWrapper"; // Import ThemeWrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanban Task Manager",
  description: "A modern Kanban task management application",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <ThemeWrapper> 
            <Kanban />
            {children}
          </ThemeWrapper>
        </Providers>
      </body>
    </html>
  );
}
