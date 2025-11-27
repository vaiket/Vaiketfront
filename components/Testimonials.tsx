'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { easeInOut } from "framer-motion"; // ✔ FIX added

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aman Sharma",
    role: "Marketing Lead",
    image: "/avatars/user1.png",
    text: "This platform has helped us automate 90% of our cold email campaigns — insane ROI!"
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "Founder — Digital Agency",
    image: "/avatars/user2.png",
    text: "AI personalization boosted our replies by 3x! Its like having a 24/7 team."
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "Sales Manager",
    image: "/avatars/user3.png",
    text: "We closed 40% more deals in the first month using automation — unbelievable!"
  },
];

const cardVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeInOut, // ✔ FIX applied
    },
  },
  exit: {
    y: 60,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: easeInOut, // ✔ FIX applied
    },
  }
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="bg-black py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-12"
        >
          What Our Customers Say
        </motion.h2>

        {/* Cards Wrapper */}
        <div className="relative max-w-3xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              initial="hidden"
              animate={activeIndex === index ? "visible" : "hidden"}
              exit="exit"
              className={`absolute w-full top-0 ${
                activeIndex === index ? "block" : "hidden"
              }`}
            >
              <div className="bg-gray-900/80 border border-gray-700 rounded-2xl p-10 shadow-xl backdrop-blur-lg">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 object-cover rounded-full mx-auto border-2 border-teal-400"
                />
                <h4 className="text-xl font-bold text-white mt-6">
                  {testimonial.name}
                </h4>
                <p className="text-gray-400">{testimonial.role}</p>

                <p className="text-gray-300 mt-6 text-lg leading-relaxed max-w-xl mx-auto">
                  “{testimonial.text}”
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-teal-400 scale-125" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
