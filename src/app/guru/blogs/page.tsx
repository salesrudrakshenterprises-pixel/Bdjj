'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { StatCard } from '@/components/shared/StatCard';
import { blogPosts } from '@/lib/data';
import { formatDate, getStatusColor } from '@/lib/utils';
import {
  FileText, Plus, Edit, Trash2, Eye, Clock, CheckCircle, Save, Image
} from 'lucide-react';

const categories = ['Spiritual Wisdom', 'Meditation', 'Devotion', 'Lifestyle', 'Philosophy'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function BlogsPage() {
  const [showEditor, setShowEditor] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Spiritual Wisdom');
  const [tags, setTags] = useState('');
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const published = blogPosts.filter((p) => p.publishedAt);
  const drafts = blogPosts.filter((p) => !p.publishedAt);
  const totalViews = blogPosts.length * 1247;

  const handleSave = (asDraft: boolean) => {
    setShowEditor(false);
    setBlogTitle('');
    setContent('');
    setCategory('Spiritual Wisdom');
    setTags('');
    setFeatured(false);
    setImageUrl('');
  };

  return (
    <main className="min-h-screen bg-bg-primary px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <SectionHeading title="Blog Management" centered={false} />
          <GlowButton onClick={() => setShowEditor(!showEditor)}>
            <Plus className="h-4 w-4" />
            Write New Post
          </GlowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard icon={<FileText className="h-6 w-6" />} value={blogPosts.length} label="Total Posts" />
          <StatCard icon={<CheckCircle className="h-6 w-6" />} value={published.length} label="Published" />
          <StatCard icon={<Clock className="h-6 w-6" />} value={drafts.length} label="Drafts" />
          <StatCard icon={<Eye className="h-6 w-6" />} value={totalViews.toLocaleString()} label="Total Views" />
        </motion.div>

        {showEditor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <AnimatedCard>
              <h3 className="font-display text-lg font-semibold text-white mb-6">New Blog Post</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-secondary">Post Title</label>
                  <input
                    type="text"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Enter your post title..."
                    className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-4 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-secondary">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your spiritual wisdom here..."
                    rows={8}
                    className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-4 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-4 text-sm text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c} className="bg-[#1A1A2E]">{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="meditation, peace, love"
                      className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 px-4 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-secondary">Image URL</label>
                    <div className="relative">
                      <Image className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full rounded-xl border border-accent/20 bg-white/5 py-3 pl-11 pr-4 text-sm text-white placeholder-text-muted outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div
                        onClick={() => setFeatured(!featured)}
                        className={`relative w-11 h-6 rounded-full transition-all ${featured ? 'bg-accent' : 'bg-white/10'}`}
                      >
                        <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all shadow ${featured ? 'translate-x-5' : ''}`} />
                      </div>
                      <span className="text-sm text-text-secondary">Featured Post</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <GlowButton onClick={() => handleSave(false)}>
                    <Save className="h-4 w-4" />
                    Save as Draft
                  </GlowButton>
                  <GlowButton onClick={() => handleSave(true)} variant="outline">
                    <CheckCircle className="h-4 w-4" />
                    Publish
                  </GlowButton>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <h3 className="font-display text-lg font-semibold text-white mb-4">All Posts</h3>
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="glass-card rounded-xl p-5 border border-accent/5 hover:shadow-[0_10px_30px_rgba(200,164,92,0.1)] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent-light/10 overflow-hidden">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                  ) : (
                    <FileText className="h-6 w-6 text-accent" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-white">{post.title}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${post.publishedAt ? getStatusColor('completed') : getStatusColor('pending')}`}>
                      {post.publishedAt ? 'Published' : 'Draft'}
                    </span>
                    {post.featured && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {post.publishedAt ? formatDate(post.publishedAt) : 'Not published'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" /> {(i + 1) * 1247} views
                    </span>
                    <span className="text-accent">{post.category}</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="p-2 rounded-lg hover:bg-accent/10 text-text-muted hover:text-accent transition-all" title="Edit">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
