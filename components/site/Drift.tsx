"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Wraps content in a subtle scroll-driven parallax — the content drifts
 * at a slightly different rate than the page, giving a "hovering" feel.
 *
 * intensity: px range. With the default 28, the wrapped content moves
 * from +28px (when entering the viewport) to -28px (when leaving),
 * for a 56px drift over the full scroll-through.
 */
export function Drift({
  children,
  intensity = 28,
  className,
}: {
  children: ReactNode;
  intensity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [intensity, -intensity]);

  return (
    <motion.div ref={ref} style={{ y, willChange: "transform" }} className={className}>
      {children}
    </motion.div>
  );
}
