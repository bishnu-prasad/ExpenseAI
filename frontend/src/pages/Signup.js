import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/signup', { email, password });
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      let errorMessage = 'Failed to create account. Please try again.';
      if (err.response?.data?.detail) {
        errorMessage = Array.isArray(err.response.data.detail) 
          ? err.response.data.detail[0].msg 
          : err.response.data.detail;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-panel w-full max-w-[440px] p-8 md:p-10 relative z-10"
      >
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-premium opacity-80"></div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-premium mb-6 shadow-[0_0_30px_rgba(139,92,246,0.4)]">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h1>
          <p className="text-gray-400">Join thousands tracking expenses intelligently</p>
        </div>
        
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {error}
              </div>
            </motion.div>
          )}
          {success && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                {success}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div className="relative">
            <input 
              type="email" 
              id="email" 
              className="peer input-field placeholder-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="username"
              required
            />
            <label htmlFor="email" className="absolute left-4 top-2 text-[10px] font-semibold text-primary uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-primary">
              Email Address
            </label>
          </div>
          
          <div className="relative mb-4">
            <input 
              type="password" 
              id="password" 
              className="peer input-field placeholder-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
            <label htmlFor="password" className="absolute left-4 top-2 text-[10px] font-semibold text-primary uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:text-primary">
              Choose Password
            </label>
          </div>
          
          <button type="submit" className="btn btn-primary w-full py-3.5 text-base" disabled={loading}>
            {loading ? <Loader2 size={20} className="animate-spin text-white" /> : (
              <>Sign Up <ArrowRight size={18} /></>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-gray-400">
          Already have an account? <Link to="/login" className="text-primary hover:text-white transition-colors font-medium">Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
