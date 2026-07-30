'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { StatCard } from '@/components/shared/StatCard';
import { meditationSessions } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Brain, Timer, Play, Pause, TimerReset, Trophy, Flame, Calendar, BarChart3, Save,
} from 'lucide-react';

const sessionTypes = ['guided', 'silent', 'breathing', 'mantra'] as const;
const moodOptions = ['peaceful', 'calm', 'focused', 'energetic', 'grateful', 'loving', 'joyful'];

const achievements = [
  { id: 'first', label: 'First Session', icon: '🌟', requirement: 'Complete your first meditation' },
  { id: 'week7', label: '7-Day Streak', icon: '🔥', requirement: 'Meditate 7 days in a row' },
  { id: 'week30', label: '30-Day Streak', icon: '💫', requirement: 'Meditate 30 days in a row' },
  { id: 'sessions100', label: '100 Sessions', icon: '🏆', requirement: 'Complete 100 meditation sessions' },
  { id: 'mins500', label: '500 Minutes', icon: '⏱️', requirement: 'Meditate for 500 total minutes' },
  { id: 'mins1000', label: '1,000 Minutes', icon: '👑', requirement: 'Meditate for 1,000 total minutes' },
];

function formatTimeMMSS(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function MeditationPage() {
  const today = new Date().toISOString().split('T')[0];
  const todaySessions = meditationSessions.filter((s) => s.completedAt.startsWith(today));
  const todayMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);
  const totalMinutes = meditationSessions.reduce((sum, s) => sum + s.duration, 0);
  const thisWeekSessions = meditationSessions.filter((s) => {
    const d = new Date(s.completedAt);
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    return d >= weekStart;
  }).length;

  const [showTimer, setShowTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [sessionType, setSessionType] = useState<typeof sessionTypes[number]>('guided');
  const [sessionMood, setSessionMood] = useState('');
  const [sessionNotes, setSessionNotes] = useState('');
  const [savedSessions, setSavedSessions] = useState(meditationSessions.length);

  const streakCount = (() => {
    let streak = 0;
    const d = new Date();
    while (true) {
      const dateStr = d.toISOString().split('T')[0];
      const has = meditationSessions.some((s) => s.completedAt.startsWith(dateStr));
      if (!has) break;
      streak++;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  })();

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const dayMinutes = meditationSessions
      .filter((s) => s.completedAt.startsWith(dateStr))
      .reduce((sum, s) => sum + s.duration, 0);
    return {
      day: d.toLocaleDateString('en', { weekday: 'short' }),
      minutes: dayMinutes,
    };
  });

  const startTimer = useCallback(() => {
    if (!timerRunning) {
      setTimerRunning(true);
    }
  }, [timerRunning]);

  const pauseTimer = useCallback(() => {
    setTimerRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimerRunning(false);
    setTimerSeconds(0);
  }, []);

  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning]);

  const handleSaveSession = () => {
    setSavedSessions((p) => p + 1);
    setSessionMood('');
    setSessionNotes('');
    setTimerSeconds(0);
    setShowTimer(false);
  };

  const achievedIds: string[] = [];
  if (savedSessions >= 1) achievedIds.push('first');
  if (streakCount >= 7) achievedIds.push('week7');
  if (streakCount >= 30) achievedIds.push('week30');
  if (savedSessions >= 100) achievedIds.push('sessions100');
  if (totalMinutes >= 500) achievedIds.push('mins500');
  if (totalMinutes >= 1000) achievedIds.push('mins1000');

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeading title="Meditation Tracker" subtitle="Track your journey inward" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard icon={<Timer className="w-6 h-6" />} value={todayMinutes} label="Today's Minutes" suffix="min" delay={0} />
          <StatCard icon={<Flame className="w-6 h-6" />} value={streakCount} label="Day Streak" delay={0.1} />
          <StatCard icon={<BarChart3 className="w-6 h-6" />} value={totalMinutes} label="Total Minutes" suffix="min" delay={0.2} />
          <StatCard icon={<Calendar className="w-6 h-6" />} value={thisWeekSessions} label="Sessions This Week" delay={0.3} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <AnimatedCard className="flex flex-col items-center text-center" delay={0.1}>
            <h3 className="text-xl font-semibold text-white mb-2">Start Your Practice</h3>
            <p className="text-gray-400 text-sm mb-6">Find your inner peace through meditation</p>
            <motion.button
              animate={{ boxShadow: ['0 0 0 0 rgba(200,164,92,0.4)', '0 0 0 20px rgba(200,164,92,0)', '0 0 0 0 rgba(200,164,92,0.4)'] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={() => setShowTimer(true)}
              className="w-24 h-24 rounded-full bg-gradient-to-r from-[#C8A45C] to-[#E8D5A3] flex items-center justify-center text-[#1A1A2E] shadow-lg hover:shadow-[#C8A45C]/30 transition-shadow"
            >
              <Brain className="w-10 h-10" />
            </motion.button>
            <p className="text-gray-500 text-xs mt-4">Tap to begin your session</p>
          </AnimatedCard>

          <AnimatedCard delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-[#C8A45C]" />
              <h3 className="text-lg font-semibold text-white">Last 7 Days</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={last7Days} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(200,164,92,0.1)" />
                  <XAxis dataKey="day" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: '#16213E',
                      border: '1px solid rgba(200,164,92,0.3)',
                      borderRadius: '12px',
                      color: '#F5F5F5',
                    }}
                  />
                  <Bar dataKey="minutes" fill="#C8A45C" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </AnimatedCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <AnimatedCard delay={0.3}>
              <div className="flex items-center gap-3 mb-6">
                <Save className="w-5 h-5 text-[#C8A45C]" />
                <h3 className="text-lg font-semibold text-white">Log Session</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Type</label>
                  <div className="flex flex-wrap gap-2">
                    {sessionTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSessionType(t)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          sessionType === t
                            ? 'bg-[#C8A45C] text-[#1A1A2E]'
                            : 'bg-bg-glass text-gray-400 hover:text-white border border-[#C8A45C]/20'
                        }`}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Duration</label>
                  <div className="flex items-center gap-3">
                    <TimerReset className="w-5 h-5 text-[#C8A45C]" />
                    <span className="text-2xl font-bold text-white font-mono">{formatTimeMMSS(timerSeconds)}</span>
                    <span className="text-gray-500 text-sm">({Math.floor(timerSeconds / 60)} min)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Mood</label>
                  <div className="flex flex-wrap gap-2">
                    {moodOptions.map((m) => (
                      <button
                        key={m}
                        onClick={() => setSessionMood(m)}
                        className={`px-3 py-1.5 rounded-full text-sm capitalize transition-all ${
                          sessionMood === m
                            ? 'bg-[#C8A45C] text-[#1A1A2E]'
                            : 'bg-bg-glass text-gray-400 hover:text-white border border-[#C8A45C]/20'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Notes</label>
                  <textarea
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    placeholder="How was your meditation today?"
                    rows={3}
                    className="w-full bg-bg-glass rounded-xl p-4 text-white placeholder-gray-500 border border-[#C8A45C]/20 focus:border-[#C8A45C] focus:outline-none resize-none transition-colors"
                  />
                </div>
                <GlowButton onClick={handleSaveSession} disabled={timerSeconds < 60}>
                  <Save className="w-4 h-4" />
                  Save Session
                </GlowButton>
              </div>
            </AnimatedCard>
          </div>

          <AnimatedCard delay={0.4}>
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-5 h-5 text-[#C8A45C]" />
              <h3 className="text-lg font-semibold text-white">Achievements</h3>
            </div>
            <div className="space-y-4">
              {achievements.map((a) => {
                const unlocked = achievedIds.includes(a.id);
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`p-3 rounded-xl border transition-all ${
                      unlocked
                        ? 'border-[#C8A45C]/50 bg-[#C8A45C]/10'
                        : 'border-gray-700/50 bg-bg-glass opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{a.icon}</span>
                      <div>
                        <p className={`text-sm font-semibold ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                          {a.label}
                        </p>
                        <p className="text-xs text-gray-500">{a.requirement}</p>
                      </div>
                      {unlocked && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto text-[#C8A45C] text-xs font-bold"
                        >
                          Unlocked
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedCard>
        </div>

        <AnimatedCard delay={0.5}>
          <h3 className="text-lg font-semibold text-white mb-4">Session History</h3>
          {meditationSessions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No sessions logged yet. Start your practice today!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-sm border-b border-[#C8A45C]/10">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Duration</th>
                    <th className="pb-3 font-medium">Mood</th>
                  </tr>
                </thead>
                <tbody>
                  {[...meditationSessions].reverse().slice(0, 10).map((s) => (
                    <motion.tr
                      key={s.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      className="border-b border-[#C8A45C]/5 text-sm hover:bg-[#C8A45C]/5 transition-colors"
                    >
                      <td className="py-3 text-white">{formatDate(s.completedAt)}</td>
                      <td className="py-3">
                        <span className="capitalize text-gray-300">{s.type}</span>
                      </td>
                      <td className="py-3 text-gray-300">{s.duration} min</td>
                      <td className="py-3">
                        {s.mood && (
                          <span className="capitalize text-gray-300">{s.mood}</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AnimatedCard>
      </div>

      <AnimatePresence>
        {showTimer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-card rounded-3xl p-10 text-center max-w-sm mx-4"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C8A45C]/20 to-[#E8D5A3]/10 flex items-center justify-center mx-auto mb-6">
                <Brain className="w-10 h-10 text-[#C8A45C]" />
              </div>
              <div className="text-6xl font-bold text-white font-mono tracking-wider mb-8">
                {formatTimeMMSS(timerSeconds)}
              </div>
              <div className="flex justify-center gap-4 mb-6">
                {!timerRunning ? (
                  <GlowButton onClick={startTimer}>
                    <Play className="w-4 h-4" />
                    Start
                  </GlowButton>
                ) : (
                  <GlowButton onClick={pauseTimer} variant="outline">
                    <Pause className="w-4 h-4" />
                    Pause
                  </GlowButton>
                )}
                <GlowButton onClick={resetTimer} variant="ghost">
                  <TimerReset className="w-4 h-4" />
                  Reset
                </GlowButton>
              </div>
              <button
                onClick={() => { setShowTimer(false); resetTimer(); }}
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
