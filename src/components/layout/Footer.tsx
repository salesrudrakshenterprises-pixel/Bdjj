'use client';
import Link from 'next/link';
import { Heart, Mail, MapPin, Phone, MessageCircle, Share2, Camera, Video, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/events', label: 'Events' },
];

const resources = [
  { href: '/faq', label: 'FAQ' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: '#', icon: MessageCircle, label: 'Messenger' },
  { href: '#', icon: Share2, label: 'Twitter' },
  { href: '#', icon: Camera, label: 'Instagram' },
  { href: '#', icon: Video, label: 'Youtube' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Footer() {
  return (
    <footer className="relative z-10 bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={itemVariants} className="space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full gradient-gold text-lg font-bold text-bg-primary">
                OM
              </span>
              <span className="font-display text-xl font-bold text-text-primary">
                BDJJ
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-text-secondary">
              Brahm Divya Jeewan Jyoti is dedicated to guiding souls on their
              spiritual journey toward divine peace, self-realization, and
              eternal bliss under the blessings of Gurudev.
            </p>
            <div className="space-y-3 text-sm text-text-secondary">
              <a
                href="mailto:info@bdjj.org"
                className="flex items-center gap-3 transition-colors hover:text-accent"
              >
                <Mail size={16} className="shrink-0 text-accent" />
                info@bdjj.org
              </a>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-3 transition-colors hover:text-accent"
              >
                <Phone size={16} className="shrink-0 text-accent" />
                +91-9999999999
              </a>
              <span className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>BDJJ Ashram, Vrindavan, Uttar Pradesh, India</span>
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="mb-5 font-display text-lg font-semibold text-text-primary">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-all duration-300 hover:text-accent"
                  >
                    <ArrowRight
                      size={12}
                      className="transition-all duration-300 group-hover:translate-x-1"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="mb-5 font-display text-lg font-semibold text-text-primary">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-all duration-300 hover:text-accent"
                  >
                    <ArrowRight
                      size={12}
                      className="transition-all duration-300 group-hover:translate-x-1"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="mb-4 mt-8 font-display text-lg font-semibold text-text-primary">
              Connect
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 text-text-secondary transition-all duration-300 hover:border-accent hover:bg-accent hover:text-bg-primary"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="mb-5 font-display text-lg font-semibold text-text-primary">
              Newsletter
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-text-secondary">
              Subscribe to receive daily blessings, event updates, and spiritual
              insights from Gurudev.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex overflow-hidden rounded-full border border-accent/20 bg-bg-primary focus-within:border-accent transition-all duration-300"
            >
              <input
                type="email"
                placeholder="Your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-text-muted"
              />
              <button
                type="submit"
                className="flex shrink-0 items-center gap-1.5 gradient-gold px-5 py-2.5 text-sm font-semibold text-bg-primary transition-all duration-300 hover:shadow-lg"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-text-muted">
              &copy; {new Date().getFullYear()} Brahm Divya Jeewan Jyoti. All
              rights reserved.
            </p>

            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 text-xs text-text-muted"
            >
              Made with
              <Heart size={12} className="text-accent fill-accent" />
              Love by BDJJ
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
