// src/app/layout.js (server component)
import "./styles/globals.css";
import { WalletProvider } from "@/providers/WalletProvider";
import MotionWrapper from "@/components/layout/MotionWrapper";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

export const metadata = {
  title: "GreenChain",
  description: "Greenchain demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <WalletProvider>
          <div className="min-h-screen flex">
            {/* Left sidebar stays dark */}
            <Sidebar />

            {/* Right: main animated background */}
            <div className="flex-1 flex flex-col relative metaverse-bg min-h-screen">
              <Navbar />
              <div className="navbar-divider" />
              <main className="flex-1 container py-6">
                <MotionWrapper>{children}</MotionWrapper>
              </main>
            </div>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
