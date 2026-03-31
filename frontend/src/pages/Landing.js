import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col pt-20 overflow-x-hidden">
      <Navbar isPublic={true} />
      
      <main className="flex-1 w-full flex flex-col items-center">
        <Hero />
        <Stats />
        <Features />
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;
