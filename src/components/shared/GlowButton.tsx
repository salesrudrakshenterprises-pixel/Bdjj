'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface GlowButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function GlowButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  onClick,
  type = 'button',
}: GlowButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer border-none';

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variants = {
    primary: 'bg-gradient-to-r from-[#C8A45C] via-[#E8D5A3] to-[#C8A45C] text-[#1A1A2E] hover:shadow-[0_8px_25px_rgba(200,164,92,0.4)] hover:-translate-y-0.5',
    outline: 'border-2 border-[#C8A45C] text-[#C8A45C] hover:bg-[#C8A45C] hover:text-white',
    ghost: 'text-[#C8A45C] hover:bg-[#C8A45C]/10',
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(base, sizes[size], variants[variant], disabled && 'opacity-50 cursor-not-allowed', className)}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </motion.button>
  );
}
