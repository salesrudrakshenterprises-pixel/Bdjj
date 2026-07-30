'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Play, Timer, Heart, Moon, Sun, Music, BarChart3, Trophy, Flame, ArrowRight, Clock, CheckCircle } from 'lucide-react';

const meditationTypes = [
  { name: 'Guided', icon: Headphones, duration: '10-30 min', color: 'from-indigo-500 to-purple-500' },
  { name: 'Silent', icon: Moon, duration: '5-60 min', color: 'from-blue-500 to-cyan-500' },
  { name: 'Breathing', icon: Wind, duration: '5-20 min', color: 'from-emerald-500 to-teal-500' },
  { name: 'Mantra', icon: Music, duration: '10-30 min', color: 'from-amber-500 to-orange-500' },
];

const achievements = [
  { icon: Flame, label: '3 Day Streak', earned: true },
  { icon: Trophy, label: 'First Session', earned: true },
  { icon: Timer, label: '5 Hours', earned: false },
  { icon: Brain, label: '10 Sessions', earned: false },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Headphones(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg>; }
function Wind(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" /></svg>; }

export default function MeditatePage() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="app-content">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-1"
      >
        {/* Daily Meditation Hero */}
        <motion.div variants={itemVariants} className="pt-2 pb-2">
          <div className="hero-card hero-gradient p-6 text-white text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <Brain className="w-5 h-5 text-white/80" />
                <span className="text-xs font-semibold uppercase tracking-wider opacity-80">Daily Meditation</span>
              </div>
              <div className="my-6">
                <motion.span
                  key={isActive ? 'active' : 'idle'}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-bold font-display tracking-tight"
                >
                  {isActive ? '4:32' : '5:00'}
                </motion.span>
                <p className="text-sm text-white/70 mt-1">{isActive ? 'remaining' : 'today'}</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsActive(!isActive)}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-white/25 backdrop-blur-sm text-white'
                    : 'bg-white text-accent shadow-lg'
                }`}
              >
                {isActive ? (
                  <>End Session <CheckCircle className="w-4 h-4" /></>
                ) : (
                  <>Begin Session <Play className="w-4 h-4 fill-current" /></>
                )}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-3 gap-3 py-2">
            {[
              { label: 'Total Minutes', value: '75', icon: Clock },
              { label: 'Sessions', value: '5', icon: BarChart3 },
              { label: 'Streak', value: '3 d', icon: Flame },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="app-card p-3.5 text-center">
                  <Icon className="w-4 h-4 text-accent mx-auto mb-1.5" />
                  <span className="block text-lg font-bold text-text-primary">{stat.value}</span>
                  <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Meditation Types */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Meditation Types</h2>
            <button className="section-action">See All</button>
          </div>
          <div className="scroll-x">
            {meditationTypes.map((type) => {
              const Icon = type.icon;
              return (
                <div key={type.name} className="app-card p-4 w-36 flex flex-col gap-2 cursor-pointer">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-bold text-text-primary">{type.name}</span>
                  <span className="text-[11px] text-text-muted">{type.duration}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Your Progress */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Your Progress</h2>
            <button className="section-action">
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
          <div className="app-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-text-primary">This Week</span>
              <span className="text-sm font-bold text-accent">45 / 120 min</span>
            </div>
            <div className="w-full h-3 bg-bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '37.5%' }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full"
              />
            </div>
            <p className="text-xs text-text-muted mt-2">75 min to reach your weekly goal</p>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div variants={itemVariants}>
          <div className="section-header">
            <h2 className="section-title">Achievements</h2>
            <Link href="/member/meditation" className="section-action">
              View All <ArrowRight className="w-3.5 h-3.5 inline" />
            </Link>
          </div>
          <div className="scroll-x pb-4">
            {achievements.map((ach) => {
              const Icon = ach.icon;
              return (
                <div
                  key={ach.label}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                    ach.earned
                      ? 'border-accent/20 bg-accent/5'
                      : 'border-bg-cardAlt bg-bg-cardAlt opacity-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${ach.earned ? 'text-accent' : 'text-text-muted'}`} />
                  <span className={`text-sm font-semibold whitespace-nowrap ${ach.earned ? 'text-text-primary' : 'text-text-muted'}`}>
                    {ach.label}
                  </span>
                  {ach.earned && <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Active Session Overlay */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
              onClick={() => setIsActive(false)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="app-card p-8 mx-4 text-center max-w-xs w-full"
              >
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-accent animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-1">Meditation in Progress</h3>
                <p className="text-4xl font-bold font-display text-accent my-4">4:32</p>
                <p className="text-sm text-text-muted mb-6">Breathing... Stay present</p>
                <button
                  onClick={() => setIsActive(false)}
                  className="btn-primary-app btn-app w-full"
                >
                  Complete Session
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
