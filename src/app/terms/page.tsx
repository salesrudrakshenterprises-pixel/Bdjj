'use client';

import { motion } from 'framer-motion';
import { FileText, CheckCircle, CreditCard, Calendar, Copyright, AlertTriangle, RefreshCw } from 'lucide-react';
import { AnimatedCard } from '@/components/shared/AnimatedCard';

const sections = [
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Acceptance of Terms',
    content: 'By accessing or using the Brahm Divya Jeewan Jyoti (BDJJ) website, mobile application, and related services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services. We reserve the right to update or modify these terms at any time without prior notice. Continued use of our services after any changes constitutes acceptance of the new terms.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Membership',
    content: 'Membership to BDJJ is open to all individuals regardless of caste, creed, gender, or nationality. By registering for membership, you agree to provide accurate and complete information. Members are responsible for maintaining the confidentiality of their account credentials. BDJJ reserves the right to suspend or terminate membership if a member violates these terms or engages in conduct that is harmful to the community. Membership tiers include Basic (free), Premium (paid), and Lifetime (one-time payment) with varying benefits as described on our website.',
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Donations & Refunds',
    content: 'All donations made to BDJJ are voluntary and non-refundable unless explicitly stated otherwise. Donations are used to support our spiritual mission, ashram development, educational programs for children, food distribution, and temple construction projects. You will receive a tax receipt for your donation as per Section 80G of the Income Tax Act. In the rare event of a processing error resulting in an incorrect donation amount, please contact us within 7 days for resolution. BDJJ reserves the right to decline or refund any donation at its discretion.',
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Event Registrations',
    content: 'Event registrations are subject to availability and are confirmed upon receipt of full payment (if applicable). Cancellation policies vary by event type and will be communicated at the time of registration. Generally, cancellations made 48 hours before the event are eligible for a full refund. BDJJ reserves the right to cancel or reschedule events due to unforeseen circumstances. In such cases, registered participants will be offered a full refund or the option to transfer their registration to the rescheduled event.',
  },
  {
    icon: <Copyright className="w-6 h-6" />,
    title: 'Intellectual Property',
    content: 'All content on the BDJJ website, including text, graphics, logos, images, audio, video, and software, is the property of Brahm Divya Jeewan Jyoti or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, or exploit any content without prior written consent from BDJJ. The BDJJ name, logo, and related marks are registered trademarks. Spiritual teachings and discourses shared on our platform are for personal use only.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: 'Limitation of Liability',
    content: 'BDJJ provides its services on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the uninterrupted or error-free operation of our services. BDJJ shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of our services. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses. Our total liability for any claim arising from these terms shall not exceed the amount you have paid to us in the past 12 months.',
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Changes to Terms',
    content: 'BDJJ reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. We will make reasonable efforts to notify members of material changes via email or website announcements. Your continued use of BDJJ services after any modifications indicates your acceptance of the updated terms. We encourage you to review these terms periodically. If you do not agree with the modified terms, you must discontinue using our services.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function TermsPage() {
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
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="section-heading mb-4">Terms of Service</h1>
            <p className="section-subtitle mx-auto">
              Guidelines and terms governing your use of BDJJ spiritual services
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
                Welcome to Brahm Divya Jeewan Jyoti (BDJJ). These Terms of Service govern your use of our website, mobile application, and all related services. By accessing or using our platform, you agree to comply with and be bound by these terms. Please read them carefully. If you have any questions, please contact us before using our services.
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
                For questions about these terms, please contact us at legal@bdjj.org
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
