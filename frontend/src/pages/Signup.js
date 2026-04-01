import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      setSuccess('Account created! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      let msg = 'Failed to create account. Please try again.';
      if (err.response?.data?.detail) {
        msg = Array.isArray(err.response.data.detail)
          ? err.response.data.detail[0].msg
          : err.response.data.detail;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 relative overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-[440px] relative z-20 bg-white border border-slate-200 rounded-[1.25rem] shadow-xl shadow-slate-200/50"
      >
        <div className="p-8 md:p-10 relative">
          
          <button 
            onClick={() => navigate('/')}
            className="absolute top-6 left-6 flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-green-600 transition-colors cursor-pointer"
          >
            ← Home
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 border border-green-100 mb-6 shadow-sm">
              <Sparkles size={24} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2 tracking-tight text-slate-800">
              Create account
            </h1>
            <p className="text-sm text-slate-500">
              Join <span className="font-semibold text-primary">Velora</span> and track smartly
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
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
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  {success}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSignup} className="flex flex-col gap-6">

            <div>
              <label htmlFor="signup-email" className="input-label">
                Email Address
              </label>
              <input
                type="email"
                id="signup-email"
                className="input-field"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Ex. hello@velora.in"
                autoComplete="username"
                required
              />
            </div>

            <div className="relative mb-2">
              <label htmlFor="signup-password" className="input-label">
                Choose Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signup-password"
                  className="input-field pr-12"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors z-10"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-3.5 text-base mt-2"
              disabled={loading}
            >
              {loading
                ? <Loader2 size={20} className="animate-spin text-white" />
                : <><span>Sign up</span> <ArrowRight size={18} /></>
              }
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary transition-colors hover:underline"
            >
              Sign in
            </Link>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
