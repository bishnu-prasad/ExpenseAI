import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Wallet, LogOut, LayoutDashboard, User, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ isPublic = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0B0F14]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to={isPublic ? '/' : '/dashboard'} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-premium flex items-center justify-center shadow-[0_4px_15px_rgba(139,92,246,0.3)] group-hover:shadow-[0_4px_25px_rgba(139,92,246,0.5)] transition-all duration-300">
            <Wallet size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">ExpenseAI</span>
        </Link>
        
        {isPublic ? (
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#testimonials" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Testimonials</a>
            <a href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</a>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/dashboard" 
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === '/dashboard' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition-colors">
              <BarChart2 size={16} /> Analytics
            </div>
          </div>
        )}

        {isPublic ? (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-primary px-5 py-2 rounded-xl text-sm shadow-[0_4px_15px_rgba(139,92,246,0.3)] hover:shadow-[0_4px_25px_rgba(139,92,246,0.5)] transition-shadow">
              Get Started
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-gray-300 cursor-pointer hover:bg-surface-hover hover:border-white/20 transition-all overflow-hidden">
              <User size={16} />
            </div>
            <div className="w-px h-6 bg-border mx-1"></div>
            <button 
              onClick={handleLogout} 
              className="text-gray-400 p-2 rounded-lg hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
