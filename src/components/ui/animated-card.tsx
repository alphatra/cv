'use client';

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

interface AnimatedCardProps {
  delay?: number;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function AnimatedCard({ 
  delay = 0, 
  children, 
  className = "", 
  contentClassName,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
      }}
    >
      <Card className={className}>
        {contentClassName ? (
          <CardContent className={contentClassName}>
            {children}
          </CardContent>
        ) : (
          children
        )}
      </Card>
    </motion.div>
  );
} 