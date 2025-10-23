// src/app/layout.js  (server component)
import "./styles/globals.css";
import MotionWrapper from "@/components/layout/MotionWrapper";
import { WalletProvider } from "@/providers/WalletProvider"; // named export
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "GreenChain — Dashboard",
  description: "Greenchain carbon offset automation demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* WalletProvider must wrap Navbar so connect button can use the context */}
        <WalletProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container">
              <MotionWrapper>{children}</MotionWrapper>
            </main>
            <footer className="text-sm text-muted p-4 text-center">
              © {new Date().getFullYear()} GreenChain — hackathon demo
            </footer>
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
