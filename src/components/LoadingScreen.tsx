"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-visible"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8}}
        >
          <div className="flex flex-col items-center w-full px-4">
            <motion.div 
              layout
              className="flex items-baseline text-[clamp(3.5rem,12vw,11rem)] font-black tracking-[-0.04em]"
            >
              
              <motion.span 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-red-700 inline-block"
              >
                M
              </motion.span>

              <AnimatePresence>
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ delay: 0.5, duration: 0.2 }}
                  className="text-red-700 overflow-hidden"
                >
                  ed
                </motion.span>
              </AnimatePresence>
              
              <motion.span 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-blue-500 italic inline-block"
              >
                f
              </motion.span>

              {/* "orge" - Expands the center */}
                <AnimatePresence>
                
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  transition={{ delay: 0.5, duration: 0.2 }}
                  className="text-blue-500 italic overflow-visible"
                >
                  orge
                </motion.span>
                </AnimatePresence>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-6 text-lg md:text-xl text-gray-500 font-light text-center max-w-lg"
            >
              Precision Forged Medical Equipment<br />
              <span className="text-gray-400 italic">Solutions Built for Reliability</span>
            </motion.p>
          </div>

          {/* Loader */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-16 flex flex-col items-center"
          >
            <div className="w-6 h-6 border-2 border-gray-100 border-t-blue-500 rounded-full animate-spin" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}