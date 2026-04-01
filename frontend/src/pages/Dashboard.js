import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, PieChart as PieChartIcon, X, Wallet, Loader2, Sparkles, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import ExpenseItem from '../components/ExpenseItem';
import SkeletonDashboard from '../components/SkeletonDashboard';

// Exact mapping based on requirements
const getCategoryColor = (categoryName) => {
  const cat = categoryName?.toLowerCase() || '';
  if (cat.includes('food') || cat.includes('dining')) return '#f97316'; // Orange
  if (cat.includes('travel') || cat.includes('transport') || cat.includes('flight')) return '#3b82f6'; // Blue
  if (cat.includes('groceries') || cat.includes('shopping') || cat.includes('mart')) return '#22c55e'; // Green
  return '#a855f7'; // Purple (Others)
};

const formatINR = (value = 0) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(Number(value) || 0);
};

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({ total_spent: 0, category_breakdown: {} });
  const [expenses, setExpenses]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [toast, setToast]         = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [title, setTitle]         = useState('');
  const [amount, setAmount]       = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, expensesRes] = await Promise.all([
        api.get('/analytics'),
        api.get('/expenses'),
      ]);
      setAnalytics(analyticsRes.data);
      setExpenses(expensesRes.data);
    } catch {
      showToast('Connection failed. Please refresh.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(prev => prev.filter(e => e.id !== id));
      const analyticsRes = await api.get('/analytics');
      setAnalytics(analyticsRes.data);
      showToast('Transaction deleted', 'success');
    } catch {
      showToast('Failed to delete expense', 'error');
    }
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setTitle(expense.title);
    setAmount(expense.amount);
    setIsEditModalOpen(true);
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();
    if (!title || !amount || !editingExpense) return;
    setIsSubmitting(true);
    
    // Optimistic Update
    const optimisticVal = { ...editingExpense, title, amount: parseFloat(amount) };
    setExpenses(prev => prev.map(exp => exp.id === editingExpense.id ? optimisticVal : exp));

    try {
      const res = await api.put(`/expenses/${editingExpense.id}`, { title, amount: parseFloat(amount) });
      const updated = res.data;
      
      // Sync validated
      setExpenses(prev => prev.map(exp => exp.id === updated.id ? updated : exp));
      
      setIsEditModalOpen(false);
      setEditingExpense(null);
      setTitle('');
      setAmount('');
      showToast('Expense updated!', 'success');

      const analyticsRes = await api.get('/analytics');
      setAnalytics(analyticsRes.data);
    } catch {
      showToast('Failed to update expense', 'error');
      fetchData(); // Rollback if failed
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    setIsSubmitting(true);
    try {
      const res = await api.post('/expenses', { title, amount: parseFloat(amount) });
      setTitle('');
      setAmount('');
      setIsModalOpen(false);
      showToast('Velora categorized your expense!', 'success');

      const payload = res.data;
      if (Array.isArray(payload)) {
        setExpenses(payload.map(item => ({
          ...item,
          amount: Number(item.amount) || 0,
          category: item.category || 'uncategorized',
        })));
      } else {
        const normalized = {
          ...payload,
          amount: Number(payload.amount) || 0,
          category: payload.category || 'uncategorized',
        };
        setExpenses(prev => {
          if (prev.some(exp => exp.id === normalized.id)) return prev;
          return [normalized, ...prev];
        });
      }

      const analyticsRes = await api.get('/analytics');
      setAnalytics(analyticsRes.data);
    } catch {
      showToast('Failed to capture expense', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const axisColor = '#64748b';

  const pieData = Object.entries(analytics.category_breakdown || {})
    .map(([key, value]) => ({ 
      name: key, 
      value: Number(value) || 0,
      fill: getCategoryColor(key)
    }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);

  const topCategory = pieData.length > 0 ? pieData[0] : null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-md">
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">{payload[0].name || label}</div>
          <div className="text-lg font-bold text-slate-800">{formatINR(payload[0].value)}</div>
        </div>
      );
    }
    return null;
  };

  if (loading && expenses.length === 0) return <SkeletonDashboard />;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col pt-20 bg-slate-50 text-slate-800"
    >
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 z-10 relative">

        {/* Page header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-slate-800">
              Overview
            </h1>
            <p className="text-slate-500 text-sm md:text-base">
              Track and optimize your spending smoothly.
            </p>
          </div>
          <button
            onClick={() => {
              setTitle('');
              setAmount('');
              setIsModalOpen(true);
            }}
            className="btn btn-primary"
          >
            Log Purchase
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card title="Total Spent" icon={DollarSign} value={formatINR(analytics.total_spent)} />
          <Card
            title="Top Category"
            icon={TrendingUp}
            value={topCategory ? <span className="capitalize">{topCategory.name}</span> : 'N/A'}
          />
          <Card title="Transactions" icon={PieChartIcon} value={expenses.length} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Bar chart */}
          <div className="lg:col-span-2">
            <Card title="Spending Breakdown">
              {pieData.length > 0 ? (
                <div className="h-[340px] w-full mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pieData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <XAxis
                        dataKey="name"
                        stroke={axisColor}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        className="capitalize text-slate-500"
                      />
                      <YAxis
                        stroke={axisColor}
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={v => formatINR(v)}
                      />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(22, 163, 74, 0.05)' }} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                        {pieData.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[340px] flex flex-col items-center justify-center gap-4 mt-6 text-slate-400">
                  <BarChart2 size={48} className="opacity-30" />
                  No analytics available yet
                </div>
              )}
            </Card>
          </div>

          {/* Pie chart */}
          <div className="lg:col-span-1">
            <Card title="Distribution">
              {pieData.length > 0 ? (
                <div className="h-[340px] w-full mt-6 flex flex-col">
                  <div className="flex-1 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                          stroke="none"
                        >
                          {pieData.map((entry, i) => (
                            <Cell key={`cell-${i}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-4 mt-2 overflow-y-auto pb-2">
                    {pieData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full shadow-sm"
                          style={{ backgroundColor: entry.fill }}
                        />
                        <span className="text-xs font-semibold capitalize text-slate-500">
                          {entry.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-[340px] flex items-center justify-center mt-6 text-slate-400">
                  No data yet
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold tracking-tight text-slate-800">
              Recent Activity
            </h2>
          </div>
          
          {expenses.length > 0 ? (
            <div className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {expenses.map((expense, index) => (
                  <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="w-full bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Wallet size={32} />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">No expenses yet.</h3>
              <p className="text-slate-500 max-w-sm mx-auto">Start tracking your spending by logging your first purchase above.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col md:items-center justify-end md:justify-center p-0 md:p-4 bg-slate-800/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-200"
              onClick={e => e.stopPropagation()}
            >

              {/* Added consistent p-6 for modal logic */}
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-primary border border-green-100">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        Smart Track
                      </h3>
                      <p className="text-xs font-medium tracking-wide uppercase text-slate-500">
                        Log Expense
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Using space-y-5 and standard input labels */}
                <form onSubmit={handleAddExpense} className="flex flex-col gap-6">
                  
                  <div>
                    <label htmlFor="modal-title" className="input-label">
                      Transaction Description
                    </label>
                    <input
                      type="text"
                      id="modal-title"
                      className="input-field"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Ex. Uber to airport"
                      autoFocus
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-amount" className="input-label">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      id="modal-amount"
                      className="input-field font-mono"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full py-3.5 mt-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? <Loader2 size={24} className="animate-spin text-white" />
                      : 'Capture Expense'
                    }
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isEditModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col md:items-center justify-end md:justify-center p-0 md:p-4 bg-slate-800/40 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg rounded-t-3xl md:rounded-2xl overflow-hidden shadow-2xl bg-white border border-slate-200"
              onClick={e => e.stopPropagation()}
            >

              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        Update Expense
                      </h3>
                      <p className="text-xs font-medium tracking-wide uppercase text-slate-500">
                        Edit Record
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleUpdateExpense} className="flex flex-col gap-6">
                  
                  <div>
                    <label htmlFor="edit-title" className="input-label">
                      Transaction Description
                    </label>
                    <input
                      type="text"
                      id="edit-title"
                      className="input-field"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Ex. Uber to airport"
                      autoFocus
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-amount" className="input-label">
                      Amount (₹)
                    </label>
                    <input
                      type="number"
                      id="edit-amount"
                      className="input-field font-mono"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full py-3.5 mt-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? <Loader2 size={24} className="animate-spin text-white" />
                      : 'Update Record'
                    }
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 rounded-xl p-4 shadow-xl bg-white border border-slate-200 min-w-[280px]"
          >
            <div
              className={`w-1.5 h-full absolute left-0 top-0 bottom-0 rounded-l-xl ${
                toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'
              }`}
            />
            {toast.type === 'error'
              ? <div className="text-red-600 bg-red-50 p-2 rounded-lg ml-2"><X size={18} /></div>
              : <div className="text-emerald-600 bg-emerald-50 p-2 rounded-lg ml-2"><Wallet size={18} /></div>
            }
            <span className="font-medium text-sm text-slate-800">
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;
