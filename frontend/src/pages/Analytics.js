import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid, Legend, Cell
} from 'recharts';
import { BarChart2, TrendingUp, Layers, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

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

const Analytics = () => {
  const [analytics, setAnalytics] = useState({ total_spent: 0, category_breakdown: {} });
  const [loading, setLoading] = useState(true);

  const axisColor = '#64748b';

  useEffect(() => {
    api.get('/analytics')
      .then(res => setAnalytics(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categoryData = Object.entries(analytics.category_breakdown || {})
    .map(([name, value]) => ({ 
      name, 
      value: Number(value) || 0,
      fill: getCategoryColor(name)
    }))
    .filter(d => d.value > 0)
    .sort((a, b) => b.value - a.value);

  const topCategory = categoryData[0] || null;
  const avgSpend = categoryData.length
    ? analytics.total_spent / categoryData.length
    : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-md">
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">{payload[0].name || label}</div>
          <div className="text-lg font-bold text-slate-800">{formatINR(payload[0].value)}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col pt-20 bg-slate-50 text-slate-800"
    >
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center">
              <BarChart2 size={20} className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">
              Analytics
            </h1>
          </div>
          <p className="text-slate-500">
            Deep insights into your spending patterns.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64 text-slate-400">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card title="Total Spending" icon={TrendingUp} value={formatINR(analytics.total_spent)} />
              <Card
                title="Top Category"
                icon={Layers}
                value={
                  topCategory
                    ? <span className="capitalize">{topCategory.name}</span>
                    : 'N/A'
                }
              />
              <Card title="Avg per Category" icon={ArrowUpRight} value={formatINR(avgSpend)} />
            </div>

            {/* Category Bar Chart */}
            <div className="mb-8">
              <Card title="Category Breakdown">
                {categoryData.length > 0 ? (
                  <div className="h-[380px] mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => formatINR(v)} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(22, 163, 74, 0.05)' }} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={44}>
                          {categoryData.map((entry, i) => (
                            <Cell key={`cell-${i}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[380px] flex flex-col items-center justify-center gap-3 mt-6 text-slate-400">
                    <BarChart2 size={48} className="opacity-20 text-slate-300" />
                    <p>No expenses found. Start tracking!</p>
                  </div>
                )}
              </Card>
            </div>

            {/* Spending trend (simulated) */}
            {categoryData.length > 0 && (
              <Card title="Spending Trend (by Category Rank)">
                <div className="h-[300px] mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => formatINR(v)} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{ fill: '#16a34a', r: 5, strokeWidth: 0 }}
                        activeDot={{ r: 7 }}
                        name="Spending"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
          </>
        )}
      </main>

      <Footer />
    </motion.div>
  );
};

export default Analytics;
