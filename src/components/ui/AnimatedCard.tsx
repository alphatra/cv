'use client';

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  delay?: number;
}

export default function AnimatedCard({ 
  children, 
  className = "", 
  contentClassName = "", 
  delay = 0 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay,
        ease: "easeOut"
      }}
    >
      <Card className={className}>
        <CardContent className={contentClassName || "p-4"}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
} 