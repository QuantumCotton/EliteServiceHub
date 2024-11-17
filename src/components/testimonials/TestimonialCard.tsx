import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/composite/card';
import { useApp } from '../../contexts/AppContext';

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  rating: number;
  image?: string;
  date: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial
}) => {
  const { state: { theme } } = useApp();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className="w-5 h-5"
        fill={index < rating ? theme.accent : `${theme.primary}20`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <Card className="h-full">
      <div className="flex flex-col h-full">
        {/* Rating */}
        <div className="flex mb-4">
          {renderStars(testimonial.rating)}
        </div>

        {/* Content */}
        <p 
          className="flex-grow mb-6 text-sm md:text-base"
          style={{ color: `${theme.primary}90` }}
        >
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="flex items-center">
          {testimonial.image && (
            <div className="mr-4">
              <motion.img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
                whileHover={{ scale: 1.1 }}
              />
            </div>
          )}
          <div>
            <h4 
              className="font-medium"
              style={{ color: theme.primary }}
            >
              {testimonial.name}
            </h4>
            {testimonial.role && (
              <p 
                className="text-sm"
                style={{ color: `${theme.primary}70` }}
              >
                {testimonial.role}
              </p>
            )}
          </div>
          <span 
            className="ml-auto text-sm"
            style={{ color: `${theme.primary}50` }}
          >
            {testimonial.date}
          </span>
        </div>
      </div>
    </Card>
  );
};
