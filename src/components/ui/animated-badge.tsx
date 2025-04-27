'use client';

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import React from "react";

interface AnimatedBadgeProps {
  delay?: number;
  variant?: "default" | "secondary" | "outline" | "destructive";
  children: React.ReactNode;
  className?: string;
}

export function AnimatedBadge({ 
  delay = 0, 
  children, 
  variant = "default",
  className,
}: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.3, 
        delay: delay * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.05
      }}
    >
      <Badge variant={variant} className={className}>
        {children}
      </Badge>
    </motion.div>
  );
} 