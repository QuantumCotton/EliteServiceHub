import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';

interface Image {
  id: string;
  src: string;
  alt: string;
  category?: string;
}

interface ImageGalleryProps {
  images: Image[];
  categories?: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  categories = []
}) => {
  const { state: { theme } } = useApp();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredImages = selectedCategory
    ? images.filter(img => img.category === selectedCategory)
    : images;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="space-y-8">
      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            className="px-4 py-2 rounded-full text-sm transition-all duration-200"
            style={{
              backgroundColor: !selectedCategory ? `${theme.primary}20` : 'transparent',
              color: !selectedCategory ? theme.primary : `${theme.primary}60`
            }}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm transition-all duration-200"
              style={{
                backgroundColor: selectedCategory === category ? `${theme.primary}20` : 'transparent',
                color: selectedCategory === category ? theme.primary : `${theme.primary}60`
              }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {filteredImages.map((image) => (
          <motion.div
            key={image.id}
            variants={item}
            className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
            onClick={() => setSelectedImage(image)}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            {image.category && (
              <span
                className="absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs backdrop-blur-sm"
                style={{ backgroundColor: `${theme.background}60`, color: theme.primary }}
              >
                {image.category}
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto rounded-xl"
              />
              <button
                className="absolute top-4 right-4 p-2 rounded-full"
                style={{ backgroundColor: `${theme.background}80` }}
                onClick={() => setSelectedImage(null)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke={theme.primary}
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
