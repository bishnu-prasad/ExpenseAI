import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, LineChart, Wallet } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <BrainCircuit size={28} />,
      title: "AI Categorization",
      description: "Our intelligence engine instantly assigns categories to your raw transactions, saving you hours of manual tagging.",
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-100"
    },
    {
      icon: <LineChart size={28} />,
      title: "Smart Analytics",
      description: "Visualize your financial health with interactive donuts, bar variations, and completely responsive insights.",
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100"
    },
    {
      icon: <Wallet size={28} />,
      title: "Real-time Tracking",
      description: "Easily log expenses and watch your analytics dashboard update instantly with secure, blazing-fast integrations.",
      iconColor: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-100"
    }
  ];

  return (
    <section className="w-full py-24 lg:py-32 bg-slate-50 relative z-10" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-800 mb-6"
          >
            Built for modern <span className="text-primary">finances</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-500"
          >
            We've stripped away the complexity leaving you with a radically simple dashboard that does the heavy lifting for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-md transition-all duration-300 relative overflow-hidden group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${feature.bgColor} border ${feature.borderColor} ${feature.iconColor} mb-6 transition-all group-hover:scale-110`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Features;
