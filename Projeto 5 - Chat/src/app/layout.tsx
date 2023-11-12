import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider as ConnectionProvider } from "@/context/connect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat-DCC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectionProvider>{children}</ConnectionProvider>
      </body>
    </html>
  );
}
