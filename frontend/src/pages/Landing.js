import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Footer from '../components/Footer';

const Landing = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);
  return (
    <div className="min-h-screen flex flex-col pt-20 overflow-x-hidden">
      <Navbar isPublic={true} />
      
      <main className="flex-1 w-full flex flex-col items-center">
        <Hero />

        <Features />
        <About />
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;
