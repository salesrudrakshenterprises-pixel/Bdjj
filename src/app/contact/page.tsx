'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';

const contactInfo = [
  { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: 'BDJJ Ashram, Vrindavan, Uttar Pradesh 281121, India' },
  { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+91-98765-43210' },
  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'contact@bdjj.org' },
  { icon: <Clock className="w-5 h-5" />, label: 'Working Hours', value: 'Mon - Sat: 6:00 AM - 8:00 PM' },
];

const socialLinks = [
  { name: 'Facebook', href: '#' },
  { name: 'Instagram', href: '#' },
  { name: 'YouTube', href: '#' },
  { name: 'WhatsApp', href: '#' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary via-bg-primary to-bg-primary" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="section-heading mb-4">Get in Touch</h1>
            <p className="section-subtitle mx-auto">
              We would love to hear from you. Reach out with your questions, blessings, or inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatedCard delay={0}>
              <h2 className="text-xl font-bold font-display mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" /> Send Us a Message
              </h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors resize-none"
                />
                <GlowButton type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4" /> Send Message
                </GlowButton>
              </form>
            </AnimatedCard>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <AnimatedCard delay={0}>
              <h2 className="text-xl font-bold font-display mb-6">Contact Information</h2>
              <div className="space-y-5">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-accent flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">{info.label}</p>
                      <p className="text-text-primary font-medium">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.1}>
              <h2 className="text-xl font-bold font-display mb-6">Our Location</h2>
              <div className="relative h-56 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-accent mx-auto mb-2 animate-float" />
                  <p className="text-sm text-text-secondary max-w-xs mx-auto">
                    BDJJ Ashram, Vrindavan, Uttar Pradesh 281121, India
                  </p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={0.2}>
              <h2 className="text-xl font-bold font-display mb-6">Connect With Us</h2>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="px-5 py-2.5 rounded-full border border-accent/20 text-sm font-medium text-accent hover:bg-accent hover:text-white transition-all"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </AnimatedCard>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
