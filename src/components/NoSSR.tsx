"use client";

import { useEffect, useState } from "react";

export function NoSSR({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render something neutral or empty on server / first client render
    // Make it match what server sees (e.g. hidden pill)
    return <span className="absolute h-11 bg-transparent" style={{ width: 0 }} />;
  }

  return <>{children}</>;
}