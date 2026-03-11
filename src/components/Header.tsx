"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const navRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const headerHeight = useTransform(scrollY, [0, 100], ["72px", "60px"]);
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(15, 15, 15, 0.4)", "rgba(10, 10, 10, 0.8)"]);
  const headerBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.2)"]);

  const [activeRect, setActiveRect] = useState<{ left: number; width: number; opacity: number }>({ 
    left: 0, width: 0, opacity: 0 
  });

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const navRect = navRef.current?.getBoundingClientRect();
    if (navRect) {
      setActiveRect({ left: rect.left - navRect.left, width: rect.width, opacity: 1 });
    }
  };

  return (
    <motion.header 
      style={{ backgroundColor: headerBg, borderColor: headerBorder }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-[40px] border backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] group"
    >
      {/* Specular Edge: This 1px line at the top gives the "glass" thickness */}
      <div className="absolute top-0 left-10 right-10 h-[3px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <motion.div style={{ height: headerHeight }} className="flex items-center justify-between px-10">
        
        {/* Logo Section */}
        <Link href="/" className="z-10 relative group/logo">
          <span className="text-2xl font-black tracking-tighter flex items-center">
            <span className="text-red-700 drop-shadow-[0_0_10px_rgba(185,28,28,0.3)] transition-all group-hover/logo:scale-105">Med</span>
            <span className="text-blue-500 italic ml-0.5 group-hover/logo:translate-x-0.5 transition-transform">forge</span>
          </span>
        </Link>

        {/* Navigation Section */}
        <nav ref={navRef} className="hidden md:flex items-center relative gap-1">
          <motion.div
            initial={false}
            animate={{ 
              x: activeRect.left, 
              width: activeRect.width, 
              opacity: activeRect.opacity 
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="absolute h-10 bg-white/10 rounded-full border border-white/10 pointer-events-none shadow-inner"
          />

          {["Products", "Services", "Contact Team", "About"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              onMouseEnter={handleHover}
              onMouseLeave={() => setActiveRect(p => ({ ...p, opacity: 0 }))}
              className="px-6 py-2 text-[13px] font-semibold  hover:text-white transition-colors duration-300 z-10"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Action Button: Refined with a "Glow" on hover */}
        <div className="relative">
          <button className="hidden md:block px-7 py-2.5 bg-white text-black text-[11px] font-bold uppercase tracking-[0.1em] rounded-full transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
            Call Us
          </button>
        </div>

      </motion.div>
    </motion.header>
  );
}