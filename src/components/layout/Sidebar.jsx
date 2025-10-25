"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Settings,
  Factory,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/procure", label: "Procure", icon: ShoppingCart },
  { href: "/ledger", label: "Ledger", icon: FileText },
  { href: "/facilities", label: "Facilities", icon: Factory },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-[#071018] min-h-screen border-r border-black/20 text-white">
        <div className="flex items-center gap-3 px-5 py-6">
          <Image
            src="/logo1.png"
            alt="GreenChain logo"
            width={40}
            height={40}
            className="object-contain rounded-md"
            priority
          />
          <div>
            <div className="text-lg font-semibold">GreenChain</div>
            <div className="text-xs text-neutral-400 -mt-0.5">
              ESG Automation
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 text-sm text-neutral-400 uppercase tracking-wider mb-2">
          Navigation
        </div>

        <nav className="px-3 space-y-1">
          {navItems.map((it) => {
            const Icon = it.icon;
            const active = pathname === it.href;
            return (
              <Link
                key={it.href}
                href={it.href}
                prefetch={false}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                  ${
                    active
                      ? "bg-white/10 text-white font-medium"
                      : "text-neutral-300 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon
                  size={18}
                  className={`${
                    active ? "text-emerald-400" : "text-emerald-500/80"
                  }`}
                />
                <span>{it.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 text-xs text-neutral-500">
          © 2025 GreenChain
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#071018] text-white border-r border-black/20"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center justify-between px-4 py-5">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9">
                  <Image
                    src="/logo1.png"
                    alt="GreenChain logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold">GreenChain</div>
                  <div className="text-xs text-neutral-400">ESG Automation</div>
                </div>
              </div>
              <button
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
                className="text-neutral-300 px-2 py-1 rounded-md hover:bg-white/3"
              >
                ✕
              </button>
            </div>

            <nav className="px-3 pb-6 space-y-1">
              {navItems.map((it) => {
                const Icon = it.icon;
                const active = pathname === it.href;
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all
                      ${
                        active
                          ? "bg-white/10 text-white font-medium"
                          : "text-neutral-300 hover:bg-white/5 hover:text-white"
                      }`}
                    onClick={() => setOpen(false)}
                    prefetch={false}
                  >
                    <Icon
                      size={18}
                      className={`${
                        active ? "text-emerald-400" : "text-emerald-500/80"
                      }`}
                    />
                    <span>{it.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile toggle button */}
      <div className="md:hidden absolute top-3 left-3 z-40">
        <button
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
          className="p-2 rounded-md bg-black/40 text-white hover:bg-black/30"
        >
          ☰
        </button>
      </div>
    </>
  );
}
