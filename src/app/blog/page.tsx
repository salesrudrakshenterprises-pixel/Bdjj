'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { GlowButton } from '@/components/shared/GlowButton';
import { blogPosts } from '@/lib/data';
import { formatDate, truncate } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured);
  const others = blogPosts.filter((p) => !p.featured);

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
            <h1 className="section-heading mb-4">Spiritual Wisdom</h1>
            <p className="section-subtitle mx-auto">
              Sacred teachings, divine insights, and guidance on the path to enlightenment
            </p>
          </motion.div>
        </div>
      </section>

      {featured && (
        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Link href={`/blog/${featured.slug}`}>
                <AnimatedCard delay={0} className="p-0 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-black/40 lg:via-transparent lg:to-transparent" />
                      <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-accent text-white">
                        Featured
                      </span>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                        {featured.category}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 leading-tight">
                        {featured.title}
                      </h2>
                      <p className="text-text-secondary leading-relaxed mb-6">
                        {featured.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          {featured.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {formatDate(featured.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {featured.readTime} min read
                        </span>
                      </div>
                      <span className="text-accent font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all w-fit">
                        Read Full Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </AnimatedCard>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading title="All Articles" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post, i) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`}>
                  <AnimatedCard delay={i * 0.05} className="p-0 overflow-hidden h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-accent/90 text-white backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold font-display mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                        {truncate(post.excerpt, 120)}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-accent/10">
                        <div className="flex items-center gap-3 text-xs text-text-muted">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.publishedAt)}
                          </span>
                        </div>
                        <span className="text-accent font-medium text-xs flex items-center gap-1 hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </AnimatedCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 bg-bg-secondary text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-display mb-3">Stay Inspired</h2>
          <p className="text-text-secondary mb-6">Receive new articles and spiritual wisdom directly in your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-full border border-accent/20 bg-white dark:bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
            />
            <GlowButton type="submit">Subscribe</GlowButton>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
