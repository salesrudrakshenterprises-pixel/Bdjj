'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import {
  Heart, Brain, Users, BookOpen, Sparkles, Sun, Star, Infinity, Target, Eye,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const offers = [
  { icon: Heart, title: 'Spiritual Guidance', desc: 'Personalized spiritual counseling to help you navigate life\'s challenges and discover your true purpose.' },
  { icon: Brain, title: 'Meditation', desc: 'Learn ancient meditation techniques to calm your mind, enhance awareness, and connect with your inner self.' },
  { icon: Users, title: 'Community Events', desc: 'Join like-minded souls in satsangs, retreats, and spiritual gatherings to grow together.' },
  { icon: BookOpen, title: 'Divine Teachings', desc: 'Study sacred texts and spiritual wisdom passed down through generations of enlightened masters.' },
];

const values = [
  { icon: Heart, title: 'Compassion', desc: 'We believe in unconditional love and kindness towards all beings, recognizing the divine in everyone.' },
  { icon: Sun, title: 'Service', desc: 'Selfless service is the highest form of worship. We serve humanity as an offering to the divine.' },
  { icon: Sparkles, title: 'Devotion', desc: 'Through sincere devotion and surrender, we open our hearts to receive divine grace and guidance.' },
];

const milestones = [
  { year: '2015', icon: Star, title: 'The Beginning', desc: 'Brahm Divya Jeewan Jyoti was founded with a vision to spread spiritual light.' },
  { year: '2017', icon: Users, title: 'First Retreat', desc: 'The first spiritual retreat brought together 200 seekers from across the nation.' },
  { year: '2019', icon: BookOpen, title: 'Teachings Expanded', desc: 'Launched online courses and meditation programs reaching thousands globally.' },
  { year: '2021', icon: Target, title: 'Global Reach', desc: 'Established centers in 5 countries, creating a worldwide spiritual community.' },
  { year: '2023', icon: Infinity, title: 'Digital Ashram', desc: 'Launched the digital platform to bring divine teachings to every doorstep.' },
  { year: '2025', icon: Eye, title: 'The Future', desc: 'Continuing to expand with new initiatives for global spiritual awakening.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero Banner */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F0F1A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,164,92,0.2)_0%,_transparent_70%)]" />
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-divine/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <motion.div className="relative z-10 mx-auto max-w-4xl text-center" {...fadeUp}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light shadow-lg"
          >
            <Infinity className="h-10 w-10 text-[#1A1A2E]" />
          </motion.div>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            About{' '}
            <span className="text-gradient">Brahm Divya Jeewan Jyoti</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
            A sacred space dedicated to spiritual awakening, inner peace, and the realization
            of your highest self through timeless wisdom and divine guidance.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/member/login">
              <GlowButton size="lg">
                <Sparkles className="h-5 w-5" />
                Join Our Community
              </GlowButton>
            </Link>
            <Link href="/events">
              <GlowButton variant="outline" size="lg">
                Explore Events
              </GlowButton>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Mission */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div {...fadeUp}>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <SectionHeading title="Our Mission" subtitle="Why we exist" centered={false} />
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                Brahm Divya Jeewan Jyoti is founded on the principle that every soul deserves to
                experience the light of divine consciousness. Our mission is to guide seekers on
                their spiritual journey through authentic teachings, meditation practices, and a
                supportive community rooted in love, compassion, and service.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                We strive to bridge the gap between ancient wisdom and modern living, making
                spiritual practices accessible to all who seek inner peace and self-realization.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-accent/20 via-accent-light/10 to-accent/5 p-1">
                <div className="flex h-full w-full items-center justify-center rounded-3xl bg-bg-primary">
                  <div className="text-center">
                    <Sun className="mx-auto h-20 w-20 text-accent animate-float" />
                    <p className="mt-4 font-display text-2xl font-bold text-accent">Light of the Divine</p>
                    <p className="mt-2 text-sm text-text-muted">Awaken your inner radiance</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="relative overflow-hidden bg-bg-secondary px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-divine/20 via-divine/10 to-transparent p-1">
                <div className="flex h-full w-full items-center justify-center rounded-3xl bg-bg-secondary">
                  <div className="text-center">
                    <Eye className="mx-auto h-20 w-20 text-divine animate-float" style={{ animationDelay: '1s' }} />
                    <p className="mt-4 font-display text-2xl font-bold text-divine">Divine Vision</p>
                    <p className="mt-2 text-sm text-text-muted">See beyond the ordinary</p>
                  </div>
                </div>
              </div>
              <div className="absolute -left-4 -top-4 h-32 w-32 rounded-full bg-divine/10 blur-2xl" />
            </motion.div>
            <motion.div {...fadeUp} className="order-1 lg:order-2">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-divine/10">
                <Eye className="h-8 w-8 text-divine" />
              </div>
              <SectionHeading title="Our Vision" subtitle="What we aspire to create" centered={false} />
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                We envision a world where every individual recognizes their innate divinity
                and lives in harmony with themselves, others, and the universe. A world where
                spiritual wisdom guides daily life, compassion fuels action, and love is the
                foundation of all relationships.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-text-secondary">
                Our vision is to create a global community of awakened souls who carry the
                torch of divine light, illuminating the path for others to follow.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="What We Offer" subtitle="Sacred services and programs for your spiritual journey" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map((item, i) => (
              <AnimatedCard key={item.title} delay={i * 0.1}>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-light/20">
                  <item.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative overflow-hidden bg-bg-secondary px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-divine/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHeading title="Our Values" subtitle="The principles that guide our spiritual community" />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((item, i) => (
              <AnimatedCard key={item.title} delay={i * 0.15}>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light shadow-lg mx-auto">
                  <item.icon className="h-8 w-8 text-[#1A1A2E]" />
                </div>
                <h3 className="text-center font-display text-2xl font-bold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-center text-text-secondary leading-relaxed">{item.desc}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey / Timeline */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title="Our Journey" subtitle="Milestones on the path of divine service" />
          <div className="relative mt-16">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-accent/40 via-accent to-accent/40 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((item, i) => {
                const isEven = i % 2 === 0;
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                  >
                    <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="glass-card inline-block rounded-2xl p-6 max-w-md">
                        <span className="font-display text-sm font-bold tracking-widest text-accent">{item.year}</span>
                        <h3 className="mt-2 font-display text-xl font-semibold text-text-primary">{item.title}</h3>
                        <p className="mt-2 text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className="relative z-10 hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light shadow-lg">
                      <Icon className="h-5 w-5 text-[#1A1A2E]" />
                    </div>
                    <div className="flex-1 hidden md:block" />
                    {/* Mobile view */}
                    <div className="flex md:hidden items-center gap-4 w-full">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light shadow-lg">
                        <Icon className="h-4 w-4 text-[#1A1A2E]" />
                      </div>
                      <div className="glass-card rounded-2xl p-4 flex-1">
                        <span className="font-display text-xs font-bold tracking-widest text-accent">{item.year}</span>
                        <h3 className="mt-1 font-display text-lg font-semibold text-text-primary">{item.title}</h3>
                        <p className="mt-1 text-xs text-text-secondary leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Join Our Community */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-divine/5 to-accent/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        <motion.div
          {...fadeUp}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light shadow-xl"
          >
            <Star className="h-10 w-10 text-[#1A1A2E]" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
            Join Our Spiritual Community
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            Become part of a growing family of seekers. Together, we walk the path of light,
            love, and divine realization.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/member/login">
              <GlowButton size="lg">
                <Sparkles className="h-5 w-5" />
                Join Now
              </GlowButton>
            </Link>
            <Link href="/contact">
              <GlowButton variant="outline" size="lg">
                Contact Us
              </GlowButton>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
