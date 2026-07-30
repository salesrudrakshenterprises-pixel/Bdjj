'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  suffix?: string;
  delay?: number;
  className?: string;
}

export function StatCard({ icon, value, label, suffix, delay = 0, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'glass-card rounded-2xl p-6 text-center group hover:shadow-[0_20px_60px_rgba(200,164,92,0.1)] transition-all duration-300',
        className
      )}
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#C8A45C]/20 to-[#E8D5A3]/10 text-[#C8A45C] mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-bold text-white">
          {value}
          {suffix && <span className="text-[#C8A45C] text-xl ml-1">{suffix}</span>}
        </div>
        <p className="text-gray-400 text-sm">{label}</p>
      </div>
    </motion.div>
  );
}
