'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Grid, X, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { AnimatedCard } from '@/components/shared/AnimatedCard';
import { galleryItems } from '@/lib/data';

const categories = ['All', 'Events', 'Ashram', 'Festivals', 'Ceremonies', 'Activities'] as const;
type Category = (typeof categories)[number];

const categoryValueMap: Record<string, string> = {
  All: 'all',
  Events: 'events',
  Ashram: 'ashram',
  Festivals: 'festivals',
  Ceremonies: 'ceremonies',
  Activities: 'activities',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === categoryValueMap[activeCategory]);

  const openLightbox = (url: string, title: string) => {
    setSelectedImage(url);
    setSelectedTitle(title);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedTitle('');
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="relative min-h-screen">
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="hero-gradient pointer-events-none absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <Image className="h-10 w-10 text-accent" />
            </div>
            <h1 className="section-heading">
              <span className="text-gradient">Gallery</span>
            </h1>
            <p className="section-subtitle mx-auto mt-4 max-w-2xl">
              A visual journey through sacred moments, divine ceremonies, and spiritual gatherings
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 pb-20">
        <div className="container mx-auto">
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            <Grid className="mr-1 h-4 w-4 text-accent" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                    : 'glass text-text-secondary hover:bg-accent/10 hover:text-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              viewport={{ once: true }}
              className="columns-1 gap-6 sm:columns-2 lg:columns-3"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="mb-6 break-inside-avoid"
                >
                  <AnimatedCard
                    delay={index * 0.08}
                    className="group relative cursor-pointer overflow-hidden !p-0"
                    onClick={() => openLightbox(item.url, item.title)}
                  >
                    <div className="relative overflow-hidden">
                      <div
                        className="w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${item.url})`,
                          aspectRatio: index % 3 === 0 ? '4/5' : index % 3 === 1 ? '3/4' : '1/1',
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                        <h3 className="font-display text-lg font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-sm text-white/80">{item.description}</p>
                      </div>
                      <span className="absolute left-3 top-3 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold capitalize text-white backdrop-blur-sm">
                        {item.category}
                      </span>
                      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                        <ChevronRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </AnimatedCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <Image className="mx-auto h-16 w-16 text-text-muted" />
              <p className="mt-4 text-text-muted">No images found in this category.</p>
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-xl transition-transform hover:scale-110"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="overflow-hidden rounded-2xl bg-white/5 shadow-2xl backdrop-blur-sm">
                <img
                  src={selectedImage}
                  alt={selectedTitle}
                  className="max-h-[80vh] w-auto max-w-full object-contain"
                />
                <div className="border-t border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
                  <p className="font-display text-lg font-bold text-white">{selectedTitle}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
