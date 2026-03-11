"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Mindray BS-240",
    subtitle: "Low-Level Clinical Chemistry Analyzer",
    description: "Compact and powerful chemistry solution featuring a constant throughput of 200 tests per hour.",
    image: "/BS-240.jpg",
  },
  {
    id: 2,
    title: "Mindray BS-1000M",
    subtitle: "Mid-Level Chemiluminescence System",
    description: "High-volume immunoassay testing with 240 tests per hour and a large reagent capacity.",
    image: "/BS-1000M.png",
  },
  {
    id: 3,
    title: "MedForge Care",
    subtitle: "Service Excellence",
    description: "24/7 technical support and preventative maintenance for critical lab infrastructure.",
    image: "/EZ_office.jpg",
  }
];

export default function HeroSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = (page % slides.length + slides.length) % slides.length;

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  // --- KEYBOARD CONTROLS RE-ADDED ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  // Auto-slide (Optional: increased to 8s so user can use keys more)
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, [paginate]);

  const bgVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 0.3, scale: 1, transition: { duration: 1.2 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.8 } }
  };

  const textVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.2 }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f8fafc]">
      
      {/* 1. BACKGROUND LAYER (Fade + Scale) */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.img 
            key={page}
            src={slides[imageIndex].image} 
            variants={bgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full object-cover filter grayscale" 
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/90 to-transparent z-[2]" />
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto w-full relative z-30 px-16 lg:px-24">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                  Premium Diagnostic Solutions
                </span>
              </div>

              <h2 className="text-slate-500 font-bold tracking-[0.4em] mb-4 uppercase text-xs">
                {slides[imageIndex].subtitle}
              </h2>
              
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 text-[#b91c1c] leading-[0.9]">
                {slides[imageIndex].title.split(' ')[0]}
                <span className="text-[#1e40af] italic ml-2">
                  {slides[imageIndex].title.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-lg mb-12 leading-relaxed font-medium">
                {slides[imageIndex].description}
              </p>
              
              <div className="flex items-center gap-8">
                <button className="px-10 py-5 bg-black text-white rounded-full font-bold hover:bg-blue-800 transition-all active:scale-95 shadow-2xl">
                  View Technical Specs
                </button>
                
                <div className="flex gap-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        i === imageIndex ? "w-12 bg-blue-700" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 3. EDGE CONTROLS */}
      <div className="absolute inset-0 z-40 flex items-center justify-between px-4 pointer-events-none">
        <button onClick={() => paginate(-1)} className="group p-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg text-slate-800 pointer-events-auto transition-all hover:bg-white hover:scale-110 active:scale-90" aria-label="Previous">
          <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <button onClick={() => paginate(1)} className="group p-4 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg text-slate-800 pointer-events-auto transition-all hover:bg-white hover:scale-110 active:scale-90" aria-label="Next">
          <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}