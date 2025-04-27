'use client';

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedBadgeProps {
  children: ReactNode;
  delay?: number;
}

export default function AnimatedBadge({ children, delay = 0 }: AnimatedBadgeProps) {
  return (
    <motion.span
      className="px-2 py-1 bg-gray-950 text-white rounded-full text-xs uppercase tracking-wide"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.span>
  );
} 