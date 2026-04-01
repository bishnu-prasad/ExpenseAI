import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutDashboard, PieChartIcon, ArrowUpRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden min-h-[90vh] flex items-center pt-24 pb-20 lg:pb-32 bg-slate-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start text-left order-1"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.15] text-slate-800">
            Track your expenses<br className="hidden sm:block" />
            <span className="text-primary">with clarity.</span>
          </h1>
          
          <p className="text-lg sm:text-lg lg:text-xl text-slate-500 mb-8 lg:mb-10 max-w-lg leading-relaxed">
            Smart AI-powered expense tracking designed for modern India.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/signup" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="btn btn-primary w-full sm:w-auto px-8 py-3.5 sm:py-4 text-base rounded-xl transition-all"
              >
                Get Started <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="btn btn-outline bg-white hover:bg-slate-50 border-slate-200 text-slate-700 w-full sm:w-auto px-8 py-3.5 sm:py-4 text-base rounded-xl shadow-sm shadow-slate-200/50"
              >
                View Dashboard
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Right Content - Responsive Dashboard Preview */}
        <div className="relative w-full order-2 flex justify-center lg:justify-end lg:pl-8 Perspective-1000">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="w-full max-w-md lg:max-w-full bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xl shadow-slate-200/50 transform-gpu lg:rotate-y-[-5deg] lg:rotate-x-[5deg]"
          >
            {/* Mock Dashboard Header */}
            <div className="flex justify-between items-center mb-6 lg:mb-8 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-primary shadow-sm border border-green-100">
                  <LayoutDashboard size={20} />
                </div>
                <div>
                  <div className="text-slate-800 font-semibold text-sm">Overview</div>
                  <div className="text-xs text-slate-500">Real-time sync</div>
                </div>
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-800">₹45,250.00</div>
            </div>
            
            {/* Mock Mini Cards */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 transition-all hover:bg-white hover:shadow-sm cursor-default">
                <div className="text-[10px] sm:text-xs text-slate-500 mb-1 sm:mb-2 uppercase tracking-wider font-semibold">Top Spend</div>
                <div className="text-sm sm:text-lg font-bold text-slate-800 flex items-center gap-1 sm:gap-2">
                  <span className="text-orange-500 bg-orange-50 p-1 sm:p-1.5 rounded-lg border border-orange-100"><PieChartIcon size={14}/></span> Food
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 transition-all hover:bg-white hover:shadow-sm cursor-default">
                <div className="text-[10px] sm:text-xs text-slate-500 mb-1 sm:mb-2 uppercase tracking-wider font-semibold">Savings</div>
                <div className="text-sm sm:text-lg font-bold text-slate-800 flex items-center gap-1 sm:gap-2">
                  <span className="text-emerald-500 bg-emerald-50 p-1 sm:p-1.5 rounded-lg border border-emerald-100"><ArrowUpRight size={14}/></span> +12.4%
                </div>
              </div>
            </div>

            {/* Mock Chart Area - Green Theme + Animation */}
            <div className="mt-8 flex items-end justify-between xl:gap-3 h-28 sm:h-32 px-1 sm:px-2">
              {[30, 60, 45, 80, 100, 40].map((height, i) => {
                const isMax = height === 100;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: "0%" }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 + i * 0.1 }}
                    className={`w-[14%] sm:w-1/6 rounded-t-lg relative ${isMax ? 'bg-[#16a34a] shadow-[0_0_15px_rgba(22,163,74,0.3)]' : 'bg-[#86efac]'}`}
                  >
                    {isMax && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.3 }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-md font-medium font-mono whitespace-nowrap shadow-lg z-10 hidden sm:block"
                      >
                        ₹12K
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
