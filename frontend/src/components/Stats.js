import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const statsList = [
    { value: '120K+', label: 'Active Users', delay: 0 },
    { value: '₹3M+', label: 'Tracked Spending', delay: 0.1 },
    { value: '4.8/5', label: 'Average Rating', delay: 0.2 }
  ];

  return (
    <section className="w-full py-10 border-y border-slate-200 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {statsList.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay, duration: 0.5 }}
              className="flex flex-col items-center justify-center py-4 md:py-0 text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-slate-800 mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-slate-500 font-medium tracking-wide uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
