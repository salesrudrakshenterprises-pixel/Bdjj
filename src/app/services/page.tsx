'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Brain, Sparkles, Home, BookOpen, ChevronRight, Clock, IndianRupee } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { services } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  heart: Heart,
  users: Users,
  brain: Brain,
  sparkles: Sparkles,
  home: Home,
  'book-open': BookOpen,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function ServicesPage() {
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
            <h1 className="section-heading">
              <span className="text-gradient">Spiritual Services</span>
            </h1>
            <p className="section-subtitle mx-auto mt-4 max-w-2xl">
              Discover divine guidance and spiritual practices tailored for your journey
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 pb-20">
        <div className="container mx-auto">
          <SectionHeading
            title="Our Offerings"
            subtitle="Sacred services to nurture your spiritual growth and inner peace"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || BookOpen;
              const isFree = service.price === 0 || service.price === undefined;
              return (
                <AnimatedCard key={service.id} delay={index * 0.1}>
                  <div className="flex h-full flex-col">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-display text-xl font-bold">{service.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      {isFree ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                          Free
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-lg font-bold text-accent">
                          <IndianRupee className="h-4 w-4" />
                          {service.price}
                        </span>
                      )}
                      {service.duration && (
                        <span className="flex items-center gap-1 text-sm text-text-muted">
                          <Clock className="h-3.5 w-3.5" />
                          {service.duration}
                        </span>
                      )}
                    </div>
                    <div className="mt-5">
                      <GlowButton size="sm">
                        Book Now <ChevronRight className="h-4 w-4" />
                      </GlowButton>
                    </div>
                  </div>
                </AnimatedCard>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative bg-accent/5 px-4 py-20 dark:bg-accent/10">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5 p-8 shadow-xl backdrop-blur-sm md:p-14">
            <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="font-display text-3xl font-bold md:text-4xl"
                >
                  <span className="text-gradient">Personal Consultation</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="mt-4 leading-relaxed text-text-secondary"
                >
                  Receive personalized spiritual guidance from Gurudev in a private one-on-one
                  session. Whether you seek clarity, healing, or direction on your path, these
                  sacred conversations offer profound insight.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 flex flex-wrap gap-4"
                >
                  <GlowButton onClick={() => (window.location.href = '/member/login')}>
                    Book Consultation <ChevronRight className="h-4 w-4" />
                  </GlowButton>
                  <GlowButton
                    variant="outline"
                    onClick={() => (window.location.href = '/member/login')}
                  >
                    Learn More
                  </GlowButton>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative hidden md:block"
              >
                <div className="animate-float mx-auto flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent/5 p-8">
                  <Heart className="h-24 w-24 text-accent/60" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
