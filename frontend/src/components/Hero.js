import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Play, LayoutDashboard, PieChart as PieChartIcon, ArrowUpRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden min-h-[90vh] flex items-center pt-20 pb-32">
      {/* Deep layered glowing background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] opacity-30 pointer-events-none mix-blend-screen">
        <div className="absolute inset-0 bg-primary-glow blur-[120px] rounded-[100%]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start text-left"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium text-gray-300">Intelligent Expense Tracking 2.0</span>
          </motion.div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1]">
            Your expenses.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-purple-400 drop-shadow-sm">
              Clearly structured.
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-light">
            AI-powered expense tracking to analyze and optimize your spending. Say goodbye to manual spreadsheets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/signup" className="w-full sm:w-auto">
              <button className="btn btn-primary w-full sm:w-auto px-8 py-4 text-base rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)]">
                Get Started <ArrowRight size={20} />
              </button>
            </Link>
            <button className="btn w-full sm:w-auto px-8 py-4 text-base rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md transition-all">
              <Play size={20} fill="currentColor" className="text-gray-300" />
              View Demo
            </button>
          </div>
        </motion.div>

        {/* Right Content - Mock UI / Floating Visuals */}
        <div className="relative h-[500px] w-full hidden lg:block perspective-1000">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: -15, rotateX: 5 }}
            animate={{ opacity: 1, scale: 1, rotateY: -5, rotateX: 5 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-10 right-0 w-[500px] bg-[#0B0F14]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Mock Dashboard Top */}
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-premium flex items-center justify-center shadow-lg"><LayoutDashboard size={20} className="text-white"/></div>
                <div>
                  <div className="text-white font-semibold">Overview</div>
                  <div className="text-xs text-gray-500">Real-time sync</div>
                </div>
              </div>
              <div className="text-2xl font-bold font-mono text-white">$4,250.00</div>
            </div>
            
            {/* Mock Mini Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Top Spend</div>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-orange-400 bg-orange-500/10 p-1.5 rounded-lg"><PieChartIcon size={16}/></span> Food & Dining
                </div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
                <div className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">Growth</div>
                <div className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-green-400 bg-green-500/10 p-1.5 rounded-lg"><ArrowUpRight size={16}/></span> +2.4%
                </div>
              </div>
            </div>

            {/* Mock Chart Area */}
            <div className="h-32 w-full bg-gradient-to-t from-primary/20 to-transparent rounded-xl border border-primary/20 border-b-0 relative overflow-hidden">
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0B0F14] to-transparent"></div>
               {/* Decorative lines to simulate chart */}
               <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                 <path d="M0,100 L20,80 L40,90 L60,40 L80,60 L100,20 L100,100 Z" fill="url(#hero-grad)" />
                 <defs>
                   <linearGradient id="hero-grad" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.5" />
                     <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                   </linearGradient>
                 </defs>
               </svg>
            </div>
          </motion.div>
          
          {/* Floating Element 1 */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-12 bg-[#1A1F2B]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                <Sparkles size={20} className="text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400 font-medium">Smart Insights</div>
                <div className="text-white font-semibold">AI Automated categorization</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
