'use client';
/* eslint-disable react/no-unescaped-entities */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    quote:
      "The cybersecurity training from ScanInfoga has been invaluable for our team. We've significantly improved our security posture and prevented several potential breaches.",
    name: 'Sarah Johnson',
    title: 'CTO, TechSolutions Inc.',
    avatar: '/placeholder.svg?height=80&width=80',
  },
  {
    quote:
      'Their penetration testing services uncovered vulnerabilities we had no idea existed. The detailed reports and remediation advice were extremely helpful.',
    name: 'Michael Chen',
    title: 'Security Director, DataSecure',
    avatar: '/placeholder.svg?height=80&width=80',
  },
  {
    quote:
      'The incident response team at ScanInfoga saved our business when we experienced a ransomware attack. Their quick action and expertise were remarkable.',
    name: 'Emily Rodriguez',
    title: 'CEO, CloudNine Systems',
    avatar: '/placeholder.svg?height=80&width=80',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="bg-gradient-to-b from-gray-900/50 to-transparent py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            What Our <span className="text-emerald-500">Clients</span> Say
          </h2>
          <p className="text-lg text-white/70">
            Hear from organizations that have strengthened their security with
            our solutions
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-0 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl"></div>
          <div className="absolute bottom-10 right-0 h-40 w-40 translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"></div>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-gray-800 bg-gray-900/40 p-8 md:p-12"
          >
            <Quote className="absolute left-8 top-8 h-12 w-12 text-emerald-500/20" />

            <div className="text-center">
              <p className="relative z-10 mb-8 text-xl italic text-white/90 md:text-2xl">
                "{testimonials[currentIndex].quote}"
              </p>

              <Avatar className="mx-auto mb-4 h-16 w-16 border-2 border-emerald-500/30">
                <AvatarImage
                  src={testimonials[currentIndex].avatar || '/placeholder.svg'}
                  alt={testimonials[currentIndex].name}
                />
                <AvatarFallback className="bg-emerald-500/10 text-emerald-500">
                  {testimonials[currentIndex].name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>

              <h4 className="text-lg font-semibold">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-white/60">
                {testimonials[currentIndex].title}
              </p>
            </div>
          </motion.div>

          <div className="mt-8 flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-emerald-500/30 bg-gray-900/70 text-emerald-400 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-300"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>

            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'scale-125 bg-emerald-500'
                      : 'bg-gray-700 hover:bg-emerald-500/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-emerald-500/30 bg-gray-900/70 text-emerald-400 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500/20 hover:text-emerald-300"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
