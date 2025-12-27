import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Determine how long the animation stays visible
    const timer = setTimeout(() => {
      setShow(false);
      // Give time for exit animation before unmounting/notifying parent
      setTimeout(onComplete, 800); 
    }, 2500); 
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants: Variants = {
    initial: { opacity: 1 },
    exit: { 
      y: "-100%",
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const letterVariants: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <div className="relative z-10">
            <motion.div 
              className="flex items-center gap-4 md:gap-8 overflow-hidden"
              variants={wordVariants}
              initial="hidden"
              animate="visible"
            >
              {/* URBAN */}
              <div className="flex overflow-hidden">
                {['U', 'R', 'B', 'A', 'N'].map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="text-5xl md:text-8xl font-black font-montserrat text-primary inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>

              {/* Separator / Accent */}
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="w-2 h-12 md:h-20 bg-cta mx-2 md:mx-4"
              />

              {/* EDGE */}
              <div className="flex overflow-hidden">
                {['E', 'D', 'G', 'E'].map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="text-5xl md:text-8xl font-black font-montserrat text-primary inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            {/* Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-12 left-0 w-full text-center"
            >
              <p className="text-sm md:text-lg text-gray-400 tracking-[0.5em] font-medium uppercase">
                Real Estate Redefined
              </p>
            </motion.div>
          </div>

          {/* Background Decorative Elements */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-cta to-primary"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
