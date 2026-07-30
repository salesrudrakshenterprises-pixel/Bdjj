'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Cookie, Share2, UserCheck, Mail } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';

const sections = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Information We Collect',
    content: 'We collect personal information that you voluntarily provide to us when you register for membership, make donations, register for events, subscribe to our newsletter, or contact us through our website. This information may include your name, email address, phone number, postal address, payment information, and demographic details. We also automatically collect certain information when you visit our website, including your IP address, browser type, device information, and usage patterns through cookies and similar technologies.',
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: 'How We Use Information',
    content: 'The information we collect is used to provide and improve our spiritual services, process donations and issue tax receipts, manage event registrations, send daily blessings and spiritual content, communicate important updates about BDJJ activities, personalize your experience on our website, and comply with legal and regulatory requirements. We do not sell your personal information to third parties. Your data is used solely for the purposes of serving your spiritual journey and maintaining the BDJJ community.',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Data Protection',
    content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of sensitive data, secure servers, regular security audits, and restricted access to personal information on a need-to-know basis. Our payment processing is handled through PCI-DSS compliant gateways. While we strive to protect your data, no method of transmission over the Internet is 100% secure.',
  },
  {
    icon: <Cookie className="w-6 h-6" />,
    title: 'Cookies',
    content: 'Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. We use essential cookies for the website to function properly, preference cookies to remember your settings, and analytics cookies to help us improve our website. You can control cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.',
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: 'Third-Party Services',
    content: 'We may engage trusted third-party service providers to assist in operating our website and conducting our spiritual mission. These include payment processors for donations, email service providers for communications, and analytics services. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose. We do not share your information with third parties for their own marketing purposes.',
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: 'Your Rights',
    content: 'You have the right to access, update, or delete your personal information held by us. You may opt out of receiving communications from us at any time. You can request a copy of the data we hold about you, ask us to correct any inaccuracies, withdraw consent for data processing, and request deletion of your account and associated data. To exercise these rights, please contact us using the information provided below. We will respond to your request within 30 days.',
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: 'Contact Us',
    content: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at: Brahm Divya Jeewan Jyoti, BDJJ Ashram, Vrindavan, Uttar Pradesh 281121, India. Email: privacy@bdjj.org, Phone: +91-98765-43210. We are committed to addressing your concerns and protecting your privacy.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary via-bg-primary to-bg-primary" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="section-heading mb-4">Privacy Policy</h1>
            <p className="section-subtitle mx-auto">
              How we collect, use, and protect your personal information
            </p>
            <p className="text-sm text-text-muted mt-4">Last updated: July 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <AnimatedCard delay={0}>
              <p className="text-text-secondary leading-relaxed">
                At Brahm Divya Jeewan Jyoti (BDJJ), we are committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services. Please read this policy carefully. By using our website, you consent to the practices described herein.
              </p>
            </AnimatedCard>

            {sections.map((section, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.05 } },
                }}
              >
                <AnimatedCard delay={i * 0.03}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-accent flex-shrink-0">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold font-display mb-3">{section.title}</h2>
                      <p className="text-text-secondary leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center pt-8"
            >
              <p className="text-text-muted text-sm">
                This Privacy Policy may be updated periodically. We encourage you to review this page regularly for any changes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
