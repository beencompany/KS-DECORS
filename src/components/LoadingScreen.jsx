import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible && !onComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-royal"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center"
      >
        <h1 className="text-4xl md:text-6xl font-luxury text-gradient font-bold mb-4 tracking-wider">
          KS DECORS
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lightGold font-body tracking-[0.2em] uppercase text-sm md:text-base"
        >
          We Decorate Your Dreams
        </motion.p>
        
        {/* Shimmer line */}
        <div className="w-24 h-px bg-darkPurple relative overflow-hidden mt-6 mx-auto">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
