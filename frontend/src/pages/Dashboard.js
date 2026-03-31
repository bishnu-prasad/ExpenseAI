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

// Tailwind Premium Palette
const COLORS = ['#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#14b8a6', '#f97316'];

const Dashboard = () => {
  const [analytics, setAnalytics] = useState({ total_spent: 0, category_breakdown: {} });
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [toast, setToast] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [analyticsRes, expensesRes] = await Promise.all([
        api.get('/analytics'),
        api.get('/expenses')
      ]);
      setAnalytics(analyticsRes.data);
      setExpenses(expensesRes.data);
    } catch (err) {
      showToast('Connection failed. Please refresh.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses(prev => prev.filter(e => e.id !== id));
      api.get('/analytics').then(res => setAnalytics(res.data));
      showToast('Transaction deleted', 'success');
    } catch (err) {
      showToast('Failed to delete expense', 'error');
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    setIsSubmitting(true);
    try {
      await api.post('/expenses', { title, amount: parseFloat(amount) });
      setTitle('');
      setAmount('');
      setIsModalOpen(false);
      showToast('Expense AI categorized successfully!', 'success');
      fetchData();
    } catch (err) {
      showToast('Failed to capture expense', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pieData = Object.keys(analytics.category_breakdown).map((key) => ({
    name: key,
    value: analytics.category_breakdown[key]
  })).sort((a,b) => b.value - a.value);

  const topCategory = pieData.length > 0 ? pieData[0] : null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-chart-tooltip">
          <div className="label">{payload[0].name || label}</div>
          <div className="value">${payload[0].value.toFixed(2)}</div>
        </div>
      );
    }
    return null;
  };

  if (loading && expenses.length === 0) return <SkeletonDashboard />;

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 z-10 relative">
        {expenses.length > 0 && (
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Overview</h1>
              <p className="text-gray-400">Track and optimize your spending with AI intelligence.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary hidden md:flex shadow-[0_4px_20px_rgba(139,92,246,0.3)]">
              <Sparkles size={18} /> Log Purchase
            </button>
          </div>
        )}

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card title="Total Balance" icon={DollarSign} value={`$${analytics.total_spent.toFixed(2)}`} />
          <Card 
            title="Highest Category" 
            icon={TrendingUp} 
            value={topCategory ? <span className="capitalize">{topCategory.name}</span> : 'N/A'} 
          />
          <Card title="Total Transactions" icon={PieChartIcon} value={expenses.length} />
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <div className="lg:col-span-2">
            <Card title="Spending Breakdown Analytics">
              {pieData.length > 0 ? (
                <div className="h-[380px] w-full mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pieData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} className="capitalize" />
                      <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                      <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255,255,255,0.02)', radius: 8}} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={48}>
                        {pieData.map((_, i) => (
                          <Cell key={`cell-${i}`} fill={`url(#colorGradient${i})`} />
                        ))}
                      </Bar>
                      <defs>
                        {pieData.map((_, i) => (
                          <linearGradient key={`gradient-${i}`} id={`colorGradient${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORS[i % COLORS.length]} stopOpacity={1}/>
                            <stop offset="95%" stopColor={COLORS[i % COLORS.length]} stopOpacity={0.6}/>
                          </linearGradient>
                        ))}
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[380px] flex flex-col items-center justify-center text-gray-500 gap-4 mt-6">
                  <BarChart2 size={48} className="opacity-30" />
                  No analytics available yet
                </div>
              )}
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card title="Distribution">
              {pieData.length > 0 ? (
                <div className="h-[380px] w-full mt-6 relative flex flex-col">
                  <ResponsiveContainer width="100%" height="80%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={8}
                      >
                        {pieData.map((_, i) => (
                          <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} style={{ filter: `drop-shadow(0 0 10px ${COLORS[i % COLORS.length]}60)` }} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-4 mt-4 h-[20%] overflow-y-auto pb-4">
                    {pieData.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: COLORS[index % COLORS.length], color: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm text-gray-400 capitalize">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-[380px] flex items-center justify-center text-gray-500 mt-6">Missing data</div>
              )}
            </Card>
          </div>
        </div>

        {/* Transactions List */}
        {expenses.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Recent Activity</h2>
              <span className="text-primary text-sm font-medium hover:text-white cursor-pointer transition-colors">View All</span>
            </div>
            <div className="flex flex-col gap-3">
              {expenses.map((expense, index) => (
                <ExpenseItem key={expense.id} expense={expense} onDelete={handleDelete} index={index} />
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />

      {/* Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              className="bg-[#10141A] border border-white/10 rounded-3xl w-full max-w-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-premium"></div>
              
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Smart Track</h3>
                      <p className="text-xs text-primary font-medium tracking-wide uppercase">AI Categorization</p>
                    </div>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="btn-icon">
                    <X size={24} />
                  </button>
                </div>
                
                <form onSubmit={handleAddExpense} className="flex flex-col gap-5">
                  <div className="relative">
                    <input 
                      type="text" 
                      id="title"
                      className="peer w-full bg-black/50 border border-white/10 rounded-xl px-5 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Uber to airport"
                      required
                    />
                    <label htmlFor="title" className="absolute left-5 top-2 text-xs font-semibold text-gray-500 uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary">
                      Transaction Description
                    </label>
                  </div>
                  
                  <div className="relative">
                    <input 
                      type="number" 
                      id="amount"
                      className="peer w-full bg-black/50 border border-white/10 rounded-xl px-5 pt-6 pb-2 text-white placeholder-transparent focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                    <label htmlFor="amount" className="absolute left-5 top-2 text-xs font-semibold text-gray-500 uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-primary">
                      Amount ($)
                    </label>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-full py-4 mt-4 text-base tracking-wide flex justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 size={24} className="animate-spin text-white" /> : 'Log Intelligence'}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Application Toasts */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-6 right-6 z-[200] flex items-center gap-3 bg-gray-900 border border-white/10 rounded-xl p-4 shadow-2xl min-w-[300px]"
          >
            <div className={`w-2 h-full absolute left-0 top-0 bottom-0 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}></div>
            {toast.type === 'error' ? <div className="text-red-500 bg-red-500/10 p-2 rounded-lg ml-2"><X size={18} /></div> : <div className="text-green-500 bg-green-500/10 p-2 rounded-lg ml-2"><Wallet size={18} /></div>}
            <span className="text-white font-medium text-sm">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
