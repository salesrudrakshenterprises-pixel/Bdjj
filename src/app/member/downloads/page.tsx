'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatDate } from '@/lib/utils';
import { DownloadableFile } from '@/lib/types';
import { FileText, Music, Video, File, Download, Search, Filter } from 'lucide-react';

const sampleDownloads: DownloadableFile[] = [
  {
    id: 'd1', title: 'Morning Meditation Guide', description: 'A comprehensive guide to your daily meditation practice', type: 'pdf', url: '#', size: '2.4 MB', category: 'meditation', downloads: 342, uploadedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: 'd2', title: 'Evening Satsang Recording', description: 'Divine discourse from the latest evening satsang', type: 'audio', url: '#', size: '45 MB', category: 'satsang', downloads: 187, uploadedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'd3', title: 'Guided Meditation Session', description: 'A 20-minute guided meditation with Gurudev', type: 'audio', url: '#', size: '28 MB', category: 'meditation', downloads: 521, uploadedAt: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  {
    id: 'd4', title: 'Bhagavad Gita Study Notes', description: 'Chapter-by-chapter study notes for self-reflection', type: 'document', url: '#', size: '1.8 MB', category: 'study', downloads: 98, uploadedAt: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: 'd5', title: 'Festival Celebration Video', description: 'Highlights from the recent Festival of Lights celebration', type: 'video', url: '#', size: '156 MB', category: 'events', downloads: 256, uploadedAt: new Date(Date.now() - 25 * 86400000).toISOString(),
  },
  {
    id: 'd6', title: 'Daily Prayer Booklet', description: 'Collection of daily prayers and devotional hymns', type: 'pdf', url: '#', size: '3.2 MB', category: 'devotional', downloads: 634, uploadedAt: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
  {
    id: 'd7', title: 'Mantra Chanting Audio', description: 'Sacred mantra chanting for daily practice', type: 'audio', url: '#', size: '32 MB', category: 'devotional', downloads: 412, uploadedAt: new Date(Date.now() - 35 * 86400000).toISOString(),
  },
  {
    id: 'd8', title: 'Spiritual Workshop Recording', description: 'Full recording of the Art of Living workshop', type: 'video', url: '#', size: '890 MB', category: 'workshops', downloads: 145, uploadedAt: new Date(Date.now() - 40 * 86400000).toISOString(),
  },
];

const tabs = [
  { id: 'all', label: 'All', icon: <Filter className="w-4 h-4" /> },
  { id: 'pdf', label: 'PDF', icon: <FileText className="w-4 h-4" /> },
  { id: 'audio', label: 'Audio', icon: <Music className="w-4 h-4" /> },
  { id: 'video', label: 'Video', icon: <Video className="w-4 h-4" /> },
  { id: 'document', label: 'Document', icon: <File className="w-4 h-4" /> },
];

const typeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5" />,
  audio: <Music className="w-5 h-5" />,
  video: <Video className="w-5 h-5" />,
  document: <File className="w-5 h-5" />,
};

const typeBadgeColors: Record<string, string> = {
  pdf: 'bg-red-500/20 text-red-400',
  audio: 'bg-blue-500/20 text-blue-400',
  video: 'bg-purple-500/20 text-purple-400',
  document: 'bg-green-500/20 text-green-400',
};

export default function DownloadsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = sampleDownloads.filter((f) => {
    const matchesTab = activeTab === 'all' || f.type === activeTab;
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <SectionHeading title="Downloads" subtitle="Sacred resources for your spiritual journey" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#C8A45C] text-[#1A1A2E]'
                    : 'bg-bg-glass text-gray-400 hover:text-white border border-[#C8A45C]/20'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search downloads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-glass rounded-full pl-10 pr-4 py-2 text-white placeholder-gray-500 border border-[#C8A45C]/20 focus:border-[#C8A45C] focus:outline-none text-sm transition-colors"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <AnimatedCard>
            <EmptyState
              icon={<Download className="w-10 h-10" />}
              title="No downloads available yet"
              description="Check back soon for new spiritual resources."
            />
          </AnimatedCard>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((file, i) => (
              <AnimatedCard key={file.id} delay={i * 0.05}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${typeBadgeColors[file.type]}`}>
                  {typeIcons[file.type]}
                </div>
                <h4 className="text-white font-semibold mb-1 line-clamp-1">{file.title}</h4>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{file.description}</p>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${typeBadgeColors[file.type]}`}>
                    {file.type}
                  </span>
                  <span className="text-xs text-gray-600">{file.size}</span>
                  <span className="text-xs text-gray-600">{file.downloads} downloads</span>
                </div>
                <p className="text-xs text-gray-600 mb-4">Uploaded {formatDate(file.uploadedAt)}</p>
                <GlowButton size="sm" className="w-full" onClick={() => {}}>
                  <Download className="w-4 h-4" />
                  Download
                </GlowButton>
              </AnimatedCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
