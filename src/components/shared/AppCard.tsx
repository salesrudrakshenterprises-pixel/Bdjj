'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AppCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glass?: boolean;
  delay?: number;
}

export function AppCard({ children, className, onClick, glass = false, delay = 0 }: AppCardProps) {
  const Component = onClick ? motion.button : motion.div;
  return (
    <Component
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(glass ? 'app-card-glass' : 'app-card', className)}
    >
      {children}
    </Component>
  );
}
