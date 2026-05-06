"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sprout, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Detect Disease", href: "/detect" },
  { name: "History", href: "/history" },
  { name: "Suppliers", href: "/suppliers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass px-6 py-3 rounded-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sprout className="text-accent w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              🌿 CropSense
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  pathname === link.href ? "text-accent" : "text-muted"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="/detect"
              className="bg-accent text-background px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-white transition-colors"
            >
              Scan Your Crop <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 glass rounded-3xl p-6 flex flex-col gap-4"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-medium",
                  pathname === link.href ? "text-accent" : "text-white"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/detect"
              className="bg-accent text-background px-6 py-3 rounded-xl text-center font-bold"
              onClick={() => setIsOpen(false)}
            >
              Scan Your Crop
            </Link>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
