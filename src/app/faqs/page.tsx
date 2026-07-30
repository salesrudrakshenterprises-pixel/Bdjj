'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { faqs } from '@/lib/data';

const categories = ['All', 'Membership', 'Events', 'Donations', 'Services', 'Features'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory.toLowerCase();
    const matchesSearch = !searchQuery || faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

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
            <h1 className="section-heading mb-4">Frequently Asked Questions</h1>
            <p className="section-subtitle mx-auto">
              Find answers to common questions about BDJJ, membership, events, donations, and more
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mb-8"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-accent/20 bg-bg-card text-text-primary outline-none focus:border-accent transition-colors"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-10 justify-center"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'bg-bg-card text-text-secondary border border-accent/20 hover:border-accent/50 hover:text-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <HelpCircle className="w-16 h-16 text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary text-lg">No questions found for your criteria.</p>
              <p className="text-text-muted text-sm mt-2">Try a different category or search term.</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {filtered.map((faq, i) => (
                <motion.div
                  key={faq.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.05 } },
                  }}
                >
                  <AnimatedCard
                    delay={i * 0.03}
                    onClick={() => toggleItem(faq.id)}
                    className={`p-0 overflow-hidden ${
                      openItems.has(faq.id) ? 'border-accent/40' : ''
                    }`}
                  >
                    <button className="w-full flex items-center justify-between p-5 text-left">
                      <span className="font-medium font-display text-base pr-4 flex-1">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openItems.has(faq.id) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-accent" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openItems.has(faq.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-accent/10">
                            <p className="text-text-secondary leading-relaxed pt-4">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </AnimatedCard>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
