import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col pt-20 bg-slate-50">
      <Navbar isPublic={true} />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 lg:py-24 flex items-center justify-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl w-full"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 mb-4">
              Simple, transparent <span className="text-primary">pricing</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-sm mx-auto">
              No hidden fees. No surprise charges. Just powerful expense tracking.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-200 relative overflow-hidden group">
            {/* Free Plan Badge */}
            <div className="absolute top-0 right-0 bg-primary text-white text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-bl-xl tracking-wider uppercase shadow-sm">
              Free Plan
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-primary flex items-center justify-center border border-green-100 shadow-sm">
                <Star size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Free Mode</h2>
                <div className="text-sm text-slate-500 font-medium">Limited time offer</div>
              </div>
            </div>

            <div className="mb-8 p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-center text-slate-700 font-medium text-base sm:text-lg leading-relaxed">
                "We are currently running in free mode.<br className="hidden sm:block" /> All features are available at no cost."
              </p>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                "Unlimited expense tracking",
                "AI-powered categorization",
                "Advanced analytics & charts",
                "CSV exports",
                "Secure data encryption"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-600">
                  <CheckCircle2 size={20} className="text-primary flex-shrink-0" />
                  <span className="text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>

            <Link to="/signup" className="block w-full">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="btn btn-primary w-full py-4 text-base sm:text-lg rounded-xl shadow-sm"
              >
                Get Started for Free
              </motion.button>
            </Link>
          </div>
        </motion.div>

      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
