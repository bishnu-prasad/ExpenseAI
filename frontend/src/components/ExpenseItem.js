import React from 'react';
import { Trash2, Coffee, ShoppingBag, Car, Home, Zap, Heart, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const getCategoryIconAndColor = (category) => {
  const cat = category?.toLowerCase() || '';
  if (cat.includes('food') || cat.includes('coffee') || cat.includes('dining')) return { icon: <Coffee size={20} />, color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
  if (cat.includes('shopping') || cat.includes('clothing')) return { icon: <ShoppingBag size={20} />, color: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20' };
  if (cat.includes('transport') || cat.includes('gas') || cat.includes('transit')) return { icon: <Car size={20} />, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
  if (cat.includes('home') || cat.includes('rent')) return { icon: <Home size={20} />, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' };
  if (cat.includes('utility') || cat.includes('electricity')) return { icon: <Zap size={20} />, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' };
  if (cat.includes('health') || cat.includes('medical')) return { icon: <Heart size={20} />, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
  return { icon: <Monitor size={20} />, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' };
};

const ExpenseItem = ({ expense, onDelete, index }) => {
  const theme = getCategoryIconAndColor(expense.category);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative flex items-center justify-between p-5 bg-surface backdrop-blur-md border border-border rounded-2xl hover:bg-surface-hover hover:border-white/10 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center gap-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme.bg} ${theme.border} border ${theme.color} shadow-inner`}>
          {theme.icon}
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="text-white font-semibold text-lg tracking-tight group-hover:text-primary transition-colors">{expense.title}</span>
          <div className="flex items-center gap-3">
            <span className={`text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${theme.bg} ${theme.color} border ${theme.border}`}>
              {expense.category || 'Uncategorized'}
            </span>
            <span className="text-sm text-gray-500">Just added</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-xl font-bold font-mono text-white drop-shadow-sm">
          ${expense.amount.toFixed(2)}
        </div>
        
        <div className="w-px h-10 bg-border hidden sm:block"></div>
        
        <button 
          onClick={() => onDelete(expense.id)}
          className="p-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Delete Expense"
          aria-label="Delete Expense"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default ExpenseItem;
