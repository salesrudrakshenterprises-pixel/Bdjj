'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { EmptyState } from '@/components/shared/EmptyState';
import { Certificate } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Award, Medal, Scroll, Download, Eye, Calendar, Trophy } from 'lucide-react';

const sampleCertificates: Certificate[] = [
  {
    id: 'c1', userId: 'm1', type: 'meditation', title: 'Meditation Completion – 30 Days', issuedAt: new Date(Date.now() - 15 * 86400000).toISOString(), url: '#',
  },
  {
    id: 'c2', userId: 'm1', type: 'course', title: 'Art of Living Workshop', issuedAt: new Date(Date.now() - 45 * 86400000).toISOString(), url: '#', expiryDate: new Date(Date.now() + 320 * 86400000).toISOString(),
  },
  {
    id: 'c3', userId: 'm1', type: 'donation', title: 'Silver Donor Certificate', issuedAt: new Date(Date.now() - 90 * 86400000).toISOString(), url: '#',
  },
  {
    id: 'c4', userId: 'm1', type: 'membership', title: 'Premium Membership Certificate', issuedAt: new Date(Date.now() - 180 * 86400000).toISOString(), url: '#',
  },
  {
    id: 'c5', userId: 'm1', type: 'meditation', title: 'Meditation Completion – 100 Sessions', issuedAt: new Date(Date.now() - 200 * 86400000).toISOString(), url: '#',
  },
];

const typeConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  meditation: {
    icon: <Medal className="w-6 h-6" />,
    label: 'Meditation',
    color: 'from-blue-500/20 to-blue-600/10 text-blue-400',
  },
  course: {
    icon: <Scroll className="w-6 h-6" />,
    label: 'Course',
    color: 'from-green-500/20 to-green-600/10 text-green-400',
  },
  donation: {
    icon: <Award className="w-6 h-6" />,
    label: 'Donation',
    color: 'from-rose-500/20 to-rose-600/10 text-rose-400',
  },
  membership: {
    icon: <Trophy className="w-6 h-6" />,
    label: 'Membership',
    color: 'from-purple-500/20 to-purple-600/10 text-purple-400',
  },
};

export default function CertificatesPage() {
  if (sampleCertificates.length === 0) {
    return (
      <div className="min-h-screen bg-bg-primary pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <SectionHeading title="Certificates" subtitle="Milestones of your spiritual journey" />
          <AnimatedCard>
            <EmptyState
              icon={<Award className="w-10 h-10" />}
              title="No certificates yet"
              description="Complete meditation sessions or courses to earn certificates."
            />
          </AnimatedCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeading title="Certificates" subtitle="Milestones of your spiritual journey" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCertificates.map((cert, i) => {
            const config = typeConfig[cert.type] || typeConfig.meditation;
            const expired = cert.expiryDate && new Date(cert.expiryDate) < new Date();

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C8A45C] via-[#E8D5A3] to-[#C8A45C] rounded-2xl opacity-40 group-hover:opacity-70 blur transition-opacity duration-300" />
                <div className="relative glass-card rounded-2xl p-6 bg-bg-card">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center ${config.color}`}>
                      {config.icon}
                    </div>
                    <div>
                      <span className={`text-xs font-medium uppercase tracking-wider ${config.color.split(' ').pop()}`}>
                        {config.label}
                      </span>
                      <h3 className="text-white font-semibold leading-tight">{cert.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4 text-[#C8A45C]" />
                      <span>Issued: {formatDate(cert.issuedAt)}</span>
                    </div>
                    {cert.expiryDate && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="w-4 h-4 text-[#C8A45C]" />
                        <span className={expired ? 'text-red-400' : ''}>
                          Expires: {formatDate(cert.expiryDate)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <GlowButton size="sm" variant="outline" className="flex-1" onClick={() => {}}>
                      <Eye className="w-4 h-4" />
                      View
                    </GlowButton>
                    <GlowButton size="sm" className="flex-1" onClick={() => {}}>
                      <Download className="w-4 h-4" />
                      Download
                    </GlowButton>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#C8A45C]/10 flex items-center justify-center gap-2">
                    <Award className="w-4 h-4 text-[#C8A45C]" />
                    <span className="text-[10px] text-[#C8A45C]/60 uppercase tracking-widest font-medium">
                      BDJJ Certified
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
