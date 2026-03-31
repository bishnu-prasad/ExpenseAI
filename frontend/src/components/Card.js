import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, icon: Icon, value, className = "", children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`glass-panel p-6 relative overflow-hidden group hover:border-white/20 transition-all duration-300 ${className}`}
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {(title || Icon) && (
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="text-gray-400 text-sm font-medium tracking-wide uppercase">{title}</h3>}
          {Icon && (
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:text-primary-glow transition-colors duration-300 shadow-inner">
              <Icon size={20} />
            </div>
          )}
        </div>
      )}
      {value !== undefined && (
        <div className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
          {value}
        </div>
      )}
      {children && <div className={value !== undefined ? 'mt-4' : ''}>{children}</div>}
    </motion.div>
  );
};

export default Card;
