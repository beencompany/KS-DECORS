import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating particles
  const particles = Array.from({ length: 20 });

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden py-24">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop')",
          transform: `translateY(${offsetY * 0.5}px)`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-[rgba(15,0,30,0.75)]" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-gold/50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-gold font-luxury text-xl md:text-3xl mb-4 tracking-[0.3em] uppercase"
        >
          KS DECORS
        </motion.h2>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-7xl font-luxury text-cream font-bold leading-tight mb-6"
        >
          Transforming Celebrations <br className="hidden md:block" />
          <span className="text-gradient">Into Royal Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-cream/80 font-body text-lg md:text-xl mb-12 max-w-2xl"
        >
          Luxury Wedding & Event Decorations
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9, type: "spring", bounce: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0"
        >
          <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Link 
              to="/gallery"
              className="block w-full sm:w-auto px-8 py-4 sm:py-3 text-center bg-gold text-darkPurple font-body font-bold rounded-full uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-shadow duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">View Portfolio</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
            <Link 
              to="/contact"
              className="block w-full sm:w-auto px-8 py-4 sm:py-3 text-center border border-gold text-gold font-body font-bold rounded-full uppercase tracking-wider hover:bg-gold/10 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
