'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export function AnimatedCard({ children, className, delay = 0, onClick }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: '0 20px 60px rgba(200, 164, 92, 0.15)' }}
      onClick={onClick}
      className={cn(
        'glass-card rounded-2xl p-6 transition-all duration-300 cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
