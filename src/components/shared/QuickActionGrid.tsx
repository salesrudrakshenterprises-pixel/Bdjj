'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  gradient?: string;
}

interface QuickActionGridProps {
  actions: QuickAction[];
  className?: string;
}

const gradients = [
  'from-[#C8A45C]/30 to-[#E8D5A3]/10',
  'from-[#7B61FF]/30 to-[#A78BFA]/10',
  'from-[#FF6B6B]/30 to-[#FFA07A]/10',
  'from-[#4ECDC4]/30 to-[#7EDDD2]/10',
  'from-[#FFD93D]/30 to-[#FFE680]/10',
  'from-[#6C5CE7]/30 to-[#A29BFE]/10',
];

export function QuickActionGrid({ actions, className }: QuickActionGridProps) {
  return (
    <div className={cn('grid grid-cols-2 gap-3', className)}>
      {actions.map((action, i) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          className={cn(
            'flex items-center gap-3 rounded-2xl p-4 text-left transition-all duration-300',
            'bg-gradient-to-br border border-white/5',
            'hover:shadow-[0_8px_30px_rgba(200,164,92,0.1)] hover:border-white/10',
            action.gradient || gradients[i % gradients.length]
          )}
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#C8A45C]">
            {action.icon}
          </div>
          <span className="text-sm font-medium text-white/90">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
