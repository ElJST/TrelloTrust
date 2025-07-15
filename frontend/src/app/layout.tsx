"use client";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { QueryProvider } from "@/providers/QueryProvider";
import { HeroProvider } from "@/providers/HeroProvider";
import { SessionAuthProvider } from "@/providers/AuthSessionProvider";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import "./globals.css";

const myFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const hideLayout = pathName === "/login" || pathName === "/register";
  return (
    <html lang="en">
      <body className={myFont.className}>
        <HeroProvider>
          <QueryProvider>
            <SessionAuthProvider>
              <main className="dark text-foreground bg-background min-h-screen">
                {!hideLayout && <NavBar />}
                <section className="min-h-screen">{children}</section>
                <Footer />
              </main>
            </SessionAuthProvider>
          </QueryProvider>
        </HeroProvider>
      </body>
    </html>
  );
}
