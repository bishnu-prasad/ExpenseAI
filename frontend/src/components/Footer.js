import React from 'react';
import { Wallet, Terminal, Hash, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border mt-20 bg-black/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-premium flex items-center justify-center shadow-lg">
            <Wallet size={16} className="text-white" />
          </div>
          <span className="text-gray-300 font-semibold tracking-tight">ExpenseAI</span>
          <span className="text-gray-600 text-sm ml-2">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-4 text-gray-500">
          <button className="hover:text-white transition-colors p-2" aria-label="Terminal">
            <Terminal size={18} />
          </button>
          <button className="hover:text-blue-400 transition-colors p-2" aria-label="Hash">
            <Hash size={18} />
          </button>
          <button className="hover:text-primary transition-colors p-2" aria-label="Website">
            <Globe size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
