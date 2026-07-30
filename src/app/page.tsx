'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Heart, Sun, Moon, Star, Sparkles, BookOpen, Users, Brain, Calendar,
  ArrowRight, ChevronRight, Play, Quote, Gift, Shield, Infinity, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { events, testimonials, blogPosts, services } from '@/lib/data';
import { formatDate, formatCurrency } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const serviceIconMap: Record<string, React.ReactNode> = {
  heart: <Heart className="w-8 h-8" />,
  users: <Users className="w-8 h-8" />,
  brain: <Brain className="w-8 h-8" />,
  sparkles: <Sparkles className="w-8 h-8" />,
  'book-open': <BookOpen className="w-8 h-8" />,
  home: <Shield className="w-8 h-8" />,
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary via-bg-primary to-bg-primary" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="light-ray" style={{ left: `${15 + i * 20}%`, animationDelay: `${i * 1.5}s` }} />
          ))}
        </div>
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-6xl md:text-8xl mb-8 animate-float"
          >
            ॐ
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6"
          >
            <span className="text-gradient">Awaken the Divine Within</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Embark on a sacred journey of self-discovery and spiritual transformation with Gurudev.
            Find peace, purpose, and divine connection.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/about">
              <GlowButton size="lg">
                Begin Your Journey <ArrowRight className="w-5 h-5" />
              </GlowButton>
            </Link>
            <Link href="/events">
              <GlowButton variant="outline" size="lg">
                Join Satsang <Calendar className="w-5 h-5" />
              </GlowButton>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-accent" />
        </motion.div>
      </section>

      {/* WELCOME */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            title="Welcome to Brahm Divya Jeewan Jyoti"
            subtitle="A sanctuary for souls seeking divine light and spiritual wisdom"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          >
            {[
              { icon: <Star className="w-8 h-8" />, title: 'Divine Guidance', desc: 'Personal spiritual counseling from Gurudev' },
              { icon: <Users className="w-8 h-8" />, title: 'Sacred Community', desc: 'Connect with like-minded souls' },
              { icon: <Brain className="w-8 h-8" />, title: 'Inner Peace', desc: 'Guided meditation and mindfulness' },
            ].map((item, i) => (
              <motion.div key={i} variants={itemVariants}>
                <AnimatedCard delay={i * 0.1} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full gradient-gold flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold font-display mb-3">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.desc}</p>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="py-20 px-4 bg-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Upcoming Events" subtitle="Join us in celebration and devotion" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.slice(0, 3).map((event, i) => (
              <motion.div key={event.id} variants={itemVariants}>
                <AnimatedCard delay={i * 0.1} className="p-0 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-accent text-white">
                      {event.type}
                    </span>
                    <span className="absolute bottom-3 left-3 text-white text-sm font-medium">
                      {formatDate(event.date)}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold font-display mb-2">{event.title}</h3>
                    <p className="text-sm text-text-secondary mb-3">{event.location}</p>
                    <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-accent-light rounded-full transition-all"
                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-text-muted mb-4">{event.registered}/{event.capacity} registered</p>
                    <Link href={`/events/${event.id}`} className="text-accent font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/events">
              <GlowButton variant="outline">View All Events <ArrowRight className="w-4 h-4" /></GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Devotee Voices" subtitle="Hear from those who found light on this path" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          >
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={t.id} variants={itemVariants} className="min-w-[320px] md:min-w-[380px] snap-start flex-shrink-0">
                <AnimatedCard delay={i * 0.1} className="h-full">
                  <Quote className="w-8 h-8 text-accent/30 mb-4" />
                  <p className="text-text-secondary leading-relaxed mb-6 italic">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className={`w-4 h-4 ${s < t.rating ? 'text-accent fill-accent' : 'text-text-muted'}`} />
                    ))}
                  </div>
                  <div className="border-t border-accent/10 pt-3">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-text-muted">{t.location}</p>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-4 bg-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Spiritual Services" subtitle="Guidance and practices for your spiritual growth" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {services.slice(0, 3).map((s, i) => (
              <motion.div key={s.id} variants={itemVariants}>
                <AnimatedCard delay={i * 0.1} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full gradient-gold flex items-center justify-center text-white">
                    {serviceIconMap[s.icon] || <Heart className="w-8 h-8" />}
                  </div>
                  <h3 className="text-xl font-semibold font-display mb-3">{s.title}</h3>
                  <p className="text-text-secondary leading-relaxed mb-4">{s.description}</p>
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-accent/10 text-accent">
                    {s.available ? 'Available' : 'Contact Us'}
                  </span>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/services">
              <GlowButton variant="outline">Explore All Services <ArrowRight className="w-4 h-4" /></GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* DAILY BLESSINGS */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl gradient-gold p-12 md:p-16 text-center"
          >
            <Sparkles className="absolute top-4 right-4 w-6 h-6 text-white/40 animate-pulse-glow" />
            <Sparkles className="absolute bottom-8 left-8 w-4 h-4 text-white/30 animate-float" />
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">Receive Daily Divine Blessings</h2>
            <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">Start each day with sacred wisdom and divine light delivered to your heart.</p>
            <Link href="/blessings">
              <GlowButton size="lg" className="bg-white text-accent hover:shadow-[0_8px_25px_rgba(255,255,255,0.3)]">
                Get Daily Blessings <Gift className="w-5 h-5" />
              </GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* DONATION */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Support the Mission</h2>
            <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto">Your contributions help us spread spiritual wisdom and serve humanity.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/donations">
                <GlowButton size="lg">
                  Donate Now <Heart className="w-5 h-5" />
                </GlowButton>
              </Link>
              <Link href="/about">
                <GlowButton variant="outline" size="lg">
                  Learn More <ArrowRight className="w-5 h-5" />
                </GlowButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="Latest Wisdom" subtitle="Insights and teachings from Gurudev" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.div key={post.id} variants={itemVariants}>
                <AnimatedCard delay={i * 0.1} className="p-0 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-3 left-3 text-white text-xs">{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold font-display mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {post.excerpt.length > 100 ? post.excerpt.slice(0, 100) + '...' : post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted">{post.readTime} min read</span>
                      <Link href={`/blog/${post.slug}`} className="text-accent font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        Read More <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/blog">
              <GlowButton variant="outline">View All Posts <ArrowRight className="w-4 h-4" /></GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 px-4 bg-bg-secondary">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-10 md:p-14 text-center"
          >
            <h2 className="text-3xl font-bold font-display mb-3">Stay Connected</h2>
            <p className="text-text-secondary mb-8">Receive spiritual updates and event invitations</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full border border-accent/20 bg-white dark:bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
              />
              <GlowButton type="submit">Subscribe</GlowButton>
            </form>
            <p className="text-xs text-text-muted mt-4">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER SPACER */}
      <section className="py-12 px-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-2xl font-display text-accent"
        >
          Om Shanti
        </motion.p>
        <p className="text-text-muted text-sm mt-2">Peace be with you</p>
      </section>
    </main>
  );
}
