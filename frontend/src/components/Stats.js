import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const statsList = [
    { value: '120K+', label: 'Active Users', delay: 0 },
    { value: '$3M+', label: 'Tracked Spending', delay: 0.1 },
    { value: '4.8/5', label: 'Average Rating', delay: 0.2 }
  ];

  return (
    <section className="w-full py-10 border-y border-white/5 bg-white/[0.01] relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {statsList.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: stat.delay, duration: 0.5 }}
              className="flex flex-col items-center justify-center py-4 md:py-0 text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                  {stat.value}
                </span>
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase">
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
