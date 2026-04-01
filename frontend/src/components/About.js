import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Who built Velora?",
    answer: "Velora was built by Bishnu, a final-year Computer Science student, focusing on solving real-world problems with clean UI and modern technologies."
  },
  {
    question: "What is Velora?",
    answer: "Velora is a modern expense tracking application that helps users manage and understand their spending with clarity."
  },
  {
    question: "What does Velora do?",
    answer: "It allows users to log expenses, categorize spending, and visualize financial data through simple dashboards."
  },
  {
    question: "Why was Velora created?",
    answer: "Velora was created to eliminate the complexity of manual expense tracking and provide a clean, intelligent alternative."
  },
  {
    question: "What problem does Velora solve?",
    answer: "It solves the problem of unorganized spending and lack of financial awareness by providing structured insights."
  },
  {
    question: "Why should I use Velora?",
    answer: "Velora provides a simple, fast, and visually clear way to track and improve your financial habits."
  },
  {
    question: "Is Velora free to use?",
    answer: "Yes, Velora is currently in free mode for all users."
  }
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="about" className="w-full py-24 lg:py-32 bg-white relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800 mb-6"
          >
            Why <span className="text-primary">Velora?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500 leading-relaxed"
          >
            Velora is designed to simplify personal finance management using smart tracking and clean insights.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-green-200 shadow-md shadow-green-500/5' : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div 
                  className="flex justify-between items-center p-5 sm:p-6 cursor-pointer select-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className={`font-semibold text-base sm:text-lg transition-colors ${isOpen ? 'text-primary' : 'text-slate-800'}`}>
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`flex-shrink-0 ml-4 p-1 rounded-full ${isOpen ? 'bg-green-50 text-primary' : 'text-slate-400'}`}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 leading-relaxed pt-0">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
