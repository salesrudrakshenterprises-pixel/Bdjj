'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Sparkles, BookOpen, Bell, Mail, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { dailyBlessings } from '@/lib/data';
import { formatDate } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function BlessingsPage() {
  const [email, setEmail] = useState('');
  const today = dailyBlessings[0];
  const previousBlessings = dailyBlessings.slice(1);

  return (
    <div className="relative min-h-screen">
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="hero-gradient pointer-events-none absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <Sun className="h-10 w-10 text-accent" />
            </div>
            <h1 className="section-heading">
              <span className="text-gradient">Daily Divine Blessings</span>
            </h1>
            <p className="section-subtitle mx-auto mt-4 max-w-2xl">
              Start your day with sacred wisdom and divine grace
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 pb-16">
        <div className="container mx-auto">
          <SectionHeading
            title="Today's Blessing"
            subtitle="A sacred message for your journey today"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-3xl"
          >
            <div className="relative overflow-hidden rounded-3xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent p-8 shadow-2xl backdrop-blur-md md:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/5 blur-2xl" />
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-accent" />
                  <span className="text-sm font-medium text-accent">
                    {formatDate(today.date)}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold md:text-3xl">{today.title}</h3>
                <div className="relative my-6 border-l-4 border-accent/40 pl-5 italic">
                  <p className="text-lg leading-relaxed text-text-secondary md:text-xl">
                    &ldquo;{today.message}&rdquo;
                  </p>
                </div>
                <p className="mb-2 text-sm font-medium text-accent">{today.scripture}</p>
                <div className="mt-6 rounded-xl bg-white/40 p-5 backdrop-blur-sm dark:bg-white/5">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-accent">
                    <BookOpen className="h-4 w-4" />
                    Reflection
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">{today.reflection}</p>
                </div>
                <p className="mt-4 text-xs text-text-muted">&mdash; {today.author}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-accent/5 px-4 py-16 dark:bg-accent/10">
        <div className="container mx-auto">
          <SectionHeading
            title="Previous Blessings"
            subtitle="Catch up on the divine wisdom you may have missed"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mx-auto grid max-w-4xl gap-6"
          >
            {previousBlessings.map((blessing, index) => (
              <AnimatedCard key={blessing.id} delay={index * 0.1}>
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-text-muted">
                      <span>{formatDate(blessing.date)}</span>
                      <span className="text-accent">&bull;</span>
                      <span className="font-medium text-accent">{blessing.scripture}</span>
                    </div>
                    <h4 className="font-display text-lg font-bold">{blessing.title}</h4>
                    <p className="mt-1 leading-relaxed text-text-secondary">
                      &ldquo;{blessing.message}&rdquo;
                    </p>
                    <div className="mt-3 rounded-lg bg-accent/5 p-3">
                      <span className="text-xs font-semibold text-accent">Reflection: </span>
                      <span className="text-sm text-text-secondary">{blessing.reflection}</span>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-20">
        <div className="container mx-auto">
          <div className="mx-auto max-w-lg overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5 p-8 text-center shadow-xl backdrop-blur-sm md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <Bell className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold">Subscribe to Daily Blessings</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Receive divine wisdom and sacred messages delivered to your inbox every morning
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-full border border-accent/20 bg-white/60 py-3 pl-10 pr-4 text-sm outline-none backdrop-blur-sm transition-colors placeholder:text-text-muted focus:border-accent/50 dark:bg-white/10"
                  />
                </div>
                <GlowButton type="submit">
                  Subscribe <ChevronRight className="h-4 w-4" />
                </GlowButton>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
