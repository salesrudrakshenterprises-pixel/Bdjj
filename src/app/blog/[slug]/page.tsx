'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { blogPosts } from '@/lib/data';
import { formatDate } from '@/lib/utils';

const loremParagraphs = [
  'In the sacred journey of spiritual evolution, every soul seeks the eternal truth that lies beyond the veil of material existence. The ancient wisdom passed down through generations of enlightened masters reveals that the ultimate purpose of human life is to realize the divine consciousness that resides within every being. Through dedicated practice and unwavering devotion, one can transcend the limitations of the ego and experience the boundless bliss of the supreme reality.',
  'The path of devotion, or bhakti yoga, is considered the most direct and accessible route to spiritual enlightenment in this age. By cultivating unconditional love and surrender to the divine, the heart becomes purified and the mind finds its natural state of peace. The teachings emphasize that divine love is not merely an emotion but the very fabric of existence, connecting all beings in a sacred tapestry of cosmic consciousness.',
  'Meditation serves as the bridge between the outer world of sensory experience and the inner realm of pure awareness. Through consistent practice, the practitioner learns to quiet the restless mind and access states of profound stillness where the eternal truth reveals itself. The ancient texts describe this inner journey as the most significant adventure a human being can undertake.',
  'The principles of karma and dharma provide a framework for understanding the laws that govern spiritual evolution. Every action, thought, and intention creates ripples that shape our destiny across lifetimes. By aligning our actions with divine will and performing our duties without attachment to outcomes, we gradually free ourselves from the cycle of birth and death.',
  'True wisdom is not found in books alone but in the direct experience of truth. The guru, or spiritual teacher, plays an indispensable role in guiding the disciple on this inner journey. Through the grace of the enlightened master, the disciple receives the transmission of spiritual energy and insight that accelerates the process of self-realization.',
];

export default function BlogDetailPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.slug === params.slug);
  const related = blogPosts.filter((p) => p.slug !== params.slug).slice(0, 2);

  if (!post) {
    return (
      <main className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
            <Heart className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold font-display mb-3">Post Not Found</h1>
          <p className="text-text-secondary mb-8">The spiritual article you are looking for has not been found. It may have been moved or no longer exists.</p>
          <Link href="/blog">
            <GlowButton>
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </GlowButton>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="relative pt-32 pb-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-secondary via-bg-primary to-bg-primary" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/blog" className="text-accent hover:text-accent-light font-medium text-sm flex items-center gap-2 transition-colors w-fit">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mt-3 mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-text-muted mb-8">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden mb-12"
          >
            <img src={post.image} alt={post.title} className="w-full h-[400px] md:h-[500px] object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            {loremParagraphs.map((paragraph, i) => (
              <p key={i} className="text-text-secondary leading-relaxed mb-6 text-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-accent/10"
          >
            <h3 className="text-lg font-semibold font-display mb-4">Share This Article</h3>
            <div className="flex gap-3">
              {[Share2, Heart, MessageCircle].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 px-4 bg-bg-secondary">
          <div className="max-w-6xl mx-auto">
            <SectionHeading title="Related Articles" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/blog/${r.slug}`}>
                    <AnimatedCard delay={i * 0.1} className="p-0 overflow-hidden h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-accent/90 text-white">
                          {r.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold font-display mb-2 line-clamp-2">
                          {r.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                          {r.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-muted">{r.readTime} min read</span>
                          <span className="text-accent font-medium text-xs flex items-center gap-1">
                            Read More <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                          </span>
                        </div>
                      </div>
                    </AnimatedCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
