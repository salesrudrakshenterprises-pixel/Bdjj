'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import {
  Heart, Brain, BookOpen, Sparkles, Quote, Calendar,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const teachings = [
  {
    icon: Heart,
    title: 'The Path of Love',
    desc: 'Love is the highest vibration and the most direct path to the divine. Through unconditional love, we dissolve the ego and merge with the cosmic consciousness that binds all existence.',
  },
  {
    icon: Brain,
    title: 'Power of Meditation',
    desc: 'Meditation is the bridge between the mind and the soul. Regular practice stills the mental chatter, unveils your inner truth, and connects you to the infinite wellspring of peace within.',
  },
  {
    icon: BookOpen,
    title: 'Service is Worship',
    desc: 'True worship is not found in rituals alone but in selfless service to humanity. Every act of kindness, every helping hand extended, is an offering at the feet of the divine.',
  },
];

export default function GurudevPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F0F1A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,164,92,0.2)_0%,_transparent_70%)]" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-divine/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Gurudev Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative mx-auto max-w-sm"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-[#1A1A2E]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(232,213,163,0.2)_0%,_transparent_60%)]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-light shadow-xl">
                      <Sparkles className="h-12 w-12 text-[#1A1A2E]" />
                    </div>
                  </motion.div>
                  <p className="font-display text-2xl font-bold text-white">Gurudev</p>
                  <p className="mt-2 text-sm text-white/60">Spiritual Guide &amp; Mentor</p>
                  <div className="mt-6 flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="h-2 w-2 rounded-full bg-accent/60"
                        style={{ animation: `pulse-glow 2s ease-in-out ${i * 0.5}s infinite` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1A1A2E] to-transparent" />
              </div>
              <div className="absolute -right-4 -bottom-4 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
              <div className="absolute -left-4 -top-4 h-32 w-32 rounded-full bg-divine/10 blur-3xl" />
            </motion.div>

            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
                className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5"
              >
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium tracking-wider text-accent">ENLIGHTENED MASTER</span>
              </motion.div>
              <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                His Holiness{' '}
                <span className="text-gradient">Gurudev</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/70">
                A beacon of divine wisdom and compassion, Gurudev has dedicated his life to
                guiding countless souls on the path of spiritual awakening. His teachings blend
                ancient spiritual traditions with practical wisdom for modern living.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="#teachings">
                  <GlowButton>
                    <BookOpen className="h-4 w-4" />
                    Explore Teachings
                  </GlowButton>
                </Link>
                <Link href="/events">
                  <GlowButton variant="outline">
                    <Calendar className="h-4 w-4" />
                    Upcoming Events
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Gurudev */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading title="About Gurudev" subtitle="The life and journey of a spiritual master" />
          <div className="mt-12 space-y-6 text-lg leading-relaxed text-text-secondary">
            <motion.p {...fadeUp}>
              Born with a profound spiritual inclination, Gurudev embarked on his spiritual
              journey at a young age. Under the guidance of his revered master, he spent years
              in deep meditation, study of sacred scriptures, and selfless service, eventually
              attaining the highest states of spiritual realization.
            </motion.p>
            <motion.p {...fadeUp}>
              Recognizing the universal longing for spiritual connection in the modern world,
              Gurudev established Brahm Divya Jeewan Jyoti to create a sanctuary where seekers
              from all walks of life could come together to explore the depths of their own
              consciousness and experience divine love.
            </motion.p>
            <motion.p {...fadeUp}>
              Through his profound yet accessible teachings, Gurudev has touched the lives of
              thousands across the globe. His gentle wisdom, infectious compassion, and unwavering
              commitment to truth continue to inspire all those who seek his guidance.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Teachings */}
      <section id="teachings" className="relative overflow-hidden bg-bg-secondary px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-divine/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <SectionHeading title="Teachings" subtitle="Timeless wisdom for the modern seeker" />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {teachings.map((item, i) => (
              <AnimatedCard key={item.title} delay={i * 0.15}>
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent-light/20">
                  <item.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{item.desc}</p>
                <div className="mt-6 h-0.5 w-12 rounded-full bg-gradient-to-r from-accent to-accent-light" />
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Message from Gurudev */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading title="Message from Gurudev" subtitle="Words of wisdom and inspiration" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mt-12 overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/5 via-bg-glass to-divine/5 p-8 sm:p-12"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-divine/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <Quote className="mb-6 h-12 w-12 text-accent/40" />
              <blockquote className="font-display text-2xl leading-relaxed text-text-primary sm:text-3xl">
                &ldquo;The divine light resides within every soul. Your journey is not about
                finding something new, but about remembering what you have always been. In the
                silence of your heart, the universe speaks. In the stillness of your mind,
                the truth reveals itself.&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
                <div>
                  <p className="font-display text-lg font-semibold text-accent">— Gurudev</p>
                  <p className="text-sm text-text-muted">Founder, Brahm Divya Jeewan Jyoti</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events with Gurudev */}
      <section className="relative overflow-hidden bg-bg-secondary px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionHeading title="Upcoming Events with Gurudev" subtitle="Join spiritual gatherings and satsangs" />
          <motion.p
            {...fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary"
          >
            Experience the divine presence of Gurudev at our upcoming events, retreats,
            and spiritual gatherings. Each event is a unique opportunity to deepen your
            practice and connect with the spiritual community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10"
          >
            <Link href="/events">
              <GlowButton size="lg">
                <Calendar className="h-5 w-5" />
                View All Events
              </GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Book an Appointment CTA */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-divine/10 via-accent/5 to-divine/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
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
            <Heart className="h-10 w-10 text-[#1A1A2E]" />
          </motion.div>
          <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
            Book an Appointment with Gurudev
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-text-secondary">
            Seek personal spiritual guidance, blessings, or simply sit in the presence of
            the master. Appointments are available for those who sincerely seek.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/member/login">
              <GlowButton size="lg">
                <Sparkles className="h-5 w-5" />
                Book Appointment
              </GlowButton>
            </Link>
            <Link href="/contact">
              <GlowButton variant="outline" size="lg">
                <Heart className="h-5 w-5" />
                Get in Touch
              </GlowButton>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
