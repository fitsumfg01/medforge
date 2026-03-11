import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "MedForge - Your Medical Equipment Station",
  description: "Exclusive IVD Importer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-white">
        <LoadingScreen />
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}