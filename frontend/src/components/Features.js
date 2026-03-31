import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, LineChart, Wallet } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <BrainCircuit size={28} />,
      title: "AI Categorization",
      description: "Our intelligence engine instantly assigns categories to your raw transactions, saving you hours of manual tagging.",
      color: "from-purple-500/20 to-transparent",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/30"
    },
    {
      icon: <LineChart size={28} />,
      title: "Smart Analytics",
      description: "Visualize your financial health with interactive donuts, bar variations, and completely responsive insights.",
      color: "from-blue-500/20 to-transparent",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/30"
    },
    {
      icon: <Wallet size={28} />,
      title: "Real-time Tracking",
      description: "Easily log expenses and watch your analytics dashboard update instantly with secure, blazing-fast integrations.",
      color: "from-emerald-500/20 to-transparent",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/30"
    }
  ];

  return (
    <section className="w-full py-24 lg:py-32 relative z-10" id="features">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Built for modern <span className="text-gradient">finances</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
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
              whileHover={{ y: -5 }}
              className="bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden group"
            >
              <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white/5 border ${feature.borderColor} ${feature.iconColor} mb-6 shadow-inner relative z-10`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 relative z-10 tracking-tight">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed relative z-10">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Features;
