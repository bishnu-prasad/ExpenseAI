import React from 'react';
import { Trash2, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(value);
};

const getCategoryStyle = (category) => {
  const cat = category?.toLowerCase() || '';
  
  if (cat.includes('food') || cat.includes('dining')) {
    return { icon: '🍔', color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' };
  }
  if (cat.includes('travel') || cat.includes('transport') || cat.includes('flight')) {
    return { icon: '✈️', color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' };
  }
  if (cat.includes('groceries') || cat.includes('shopping') || cat.includes('mart')) {
    return { icon: '🛒', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' };
  }
  
  // Default/Others
  return { icon: '📦', color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' };
};

const ExpenseItem = ({ expense, onEdit, onDelete, index }) => {
  const style = getCategoryStyle(expense.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      className="group relative flex items-center justify-between p-5 bg-white rounded-xl border border-slate-200 transition-all duration-300 hover:shadow-md"
    >
      <div className="flex items-center gap-5">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${style.bg} border ${style.border} text-xl flex-shrink-0`}
        >
          {style.icon}
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-semibold text-lg tracking-tight text-slate-800 transition-colors group-hover:text-primary">
            {expense.title}
          </span>
          <div className="flex items-center gap-3">
            <span
              className={`text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${style.bg} ${style.color} border ${style.border}`}
            >
              {expense.category || 'Others'}
            </span>
            <span className="text-sm text-slate-500">
              Just added
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-xl font-bold font-mono text-slate-800 mr-2">
          {formatINR(expense.amount)}
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(expense)}
            className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm transition-all focus:opacity-100"
            title="Edit Expense"
            aria-label="Edit Expense"
          >
            <Edit2 size={18} />
          </button>

          <button
            onClick={() => onDelete(expense.id)}
            className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 hover:shadow-sm transition-all focus:opacity-100"
            title="Delete Expense"
            aria-label="Delete Expense"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseItem;
