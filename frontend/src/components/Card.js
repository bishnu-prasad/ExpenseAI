import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, icon: Icon, value, className = '', children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      {(title || Icon) && (
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h3 className="text-xs font-semibold tracking-widest uppercase text-slate-500">
              {title}
            </h3>
          )}
          {Icon && (
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-50 border border-green-100 text-primary transition-colors duration-300">
              <Icon size={20} />
            </div>
          )}
        </div>
      )}

      {value !== undefined && (
        <div className="text-3xl md:text-4xl font-bold tracking-tight text-slate-800">
          {value}
        </div>
      )}

      {children && <div className={value !== undefined ? 'mt-4' : ''}>{children}</div>}
    </motion.div>
  );
};

export default Card;
