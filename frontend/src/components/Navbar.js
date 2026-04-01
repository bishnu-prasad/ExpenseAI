import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User, BarChart2, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isPublic = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or ESC key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        setUserDropdownOpen(false);
      }
    };
    
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [userDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    closeMobileMenu();
  };

  const navLinkBase = `flex items-center gap-2 text-sm font-medium transition-colors`;
  const navLinkDefault = 'text-slate-500 hover:text-slate-900';
  const navLinkActive = 'text-green-600 font-semibold';

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ ease: 'easeOut', duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl border-b border-slate-200 shadow-sm py-3 bg-white/95' : 'py-4 md:py-5 bg-white md:bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">

        {/* Logo */}
        <Link to={isPublic ? '/' : '/dashboard'} className="flex items-center gap-2 group z-50">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Velora
            </span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        {isPublic ? (
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className={`${navLinkBase} ${navLinkDefault} cursor-pointer`}>Features</button>
            <button onClick={() => scrollToSection('about')} className={`${navLinkBase} ${navLinkDefault} cursor-pointer`}>About</button>
            <Link to="/pricing" className={`${navLinkBase} ${isActive('/pricing') ? navLinkActive : navLinkDefault}`}>Pricing</Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className={`${navLinkBase} ${isActive('/dashboard') ? navLinkActive : navLinkDefault}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <button
              onClick={() => navigate('/analytics')}
              className={`${navLinkBase} outline-none ${isActive('/analytics') ? navLinkActive : navLinkDefault}`}
            >
              <BarChart2 size={18} /> Analytics
            </button>
          </div>
        )}

        {/* Right actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {isPublic ? (
            <>
              <Link to="/login" className={`${navLinkBase} ${navLinkDefault} px-4 py-2`}>
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary text-sm px-6 py-2.5 rounded-xl hover:scale-105 shadow-sm">
                Get Started
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 cursor-pointer p-1.5 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all text-slate-600"
              >
                <div className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center shadow-sm">
                  <User size={18} />
                </div>
                <ChevronDown size={14} className={`transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* User Dropdown */}
              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Signed in as</p>
                      <p className="text-sm font-medium text-slate-800 truncate">user@velora.in</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden p-2 -mr-2 text-slate-600 hover:bg-slate-50 rounded-lg z-50 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
           <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl overflow-hidden z-40"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {isPublic ? (
                <>
                  <button onClick={() => scrollToSection('features')} className={`block w-full text-left py-3 text-lg font-medium border-b border-slate-100 ${navLinkDefault} cursor-pointer`}>Features</button>
                  <button onClick={() => scrollToSection('about')} className={`block w-full text-left py-3 text-lg font-medium border-b border-slate-100 ${navLinkDefault} cursor-pointer`}>About</button>
                  <Link to="/pricing" onClick={closeMobileMenu} className={`block py-3 text-lg font-medium border-b border-slate-100 ${isActive('/pricing') ? navLinkActive : navLinkDefault}`}>Pricing</Link>
                  <div className="pt-4 flex flex-col gap-3">
                    <Link to="/login" onClick={closeMobileMenu} className="btn w-full border border-slate-200 text-slate-700 bg-white py-3">Sign In</Link>
                    <Link to="/signup" onClick={closeMobileMenu} className="btn btn-primary w-full py-3">Get Started</Link>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={closeMobileMenu} className={`flex items-center gap-3 py-3 text-lg border-b border-slate-100 ${isActive('/dashboard') ? navLinkActive : navLinkDefault}`}>
                    <LayoutDashboard size={20} /> Dashboard
                  </Link>
                  <button onClick={() => { navigate('/analytics'); closeMobileMenu(); }} className={`flex items-center gap-3 w-full text-left py-3 text-lg border-b border-slate-100 ${isActive('/analytics') ? navLinkActive : navLinkDefault}`}>
                    <BarChart2 size={20} /> Analytics
                  </button>
                  <div className="pt-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3 py-2 px-4 rounded-xl bg-slate-50 mb-2 border border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <User size={20} />
                      </div>
                      <div className="truncate">
                        <p className="text-sm font-semibold text-slate-800">user@velora.in</p>
                      </div>
                    </div>
                    <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="btn w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 py-3">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
