import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

interface AnimatedLogoProps {
  showWelcome?: boolean;
  onFinish?: () => void;
}

const AnimatedLogo = ({ showWelcome = true, onFinish }: AnimatedLogoProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShow(false);
        if (onFinish) onFinish();
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [showWelcome, onFinish]);

  // Animación de saludo (rotación de la mano)
  const waveKeyframes = [0, -18, 12, -12, 8, -8, 0];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="flex flex-col items-center justify-center min-h-screen z-50 fixed inset-0 bg-[linear-gradient(135deg,rgba(27,58,107,0.07)_0%,rgba(34,197,94,0.07)_25%,rgba(255,215,0,0.07)_50%,rgba(236,72,153,0.07)_75%,rgba(239,68,68,0.07)_100%)]"
          style={{ backdropFilter: 'blur(0.5px)' } as React.CSSProperties}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={logo}
            alt="Logo ONG"
            className="w-40 h-40 mb-6 drop-shadow-2xl"
            initial={{ scale: 0.3, opacity: 0, y: 0 }}
            animate={{
              scale: [0.3, 2.2, 1.7, 2.1, 1.8, 2, 1],
              opacity: [0, 1, 1, 1, 1, 1, 1],
              y: [0, 0, -40, 0, -18, 0, 0],
              rotate: showWelcome ? waveKeyframes : 0,
              filter: [
                'drop-shadow(0 0 0px #1B3A6B)', // azul
                'drop-shadow(0 0 48px #22c55e)', // verde
                'drop-shadow(0 0 64px #FFD700)', // amarillo
                'drop-shadow(0 0 64px #ec4899)', // rosa
                'drop-shadow(0 0 64px #ef4444)', // rojo
                'drop-shadow(0 0 0px #fff)'
              ]
            }}
            transition={{
              duration: 2.2,
              times: [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
              repeat: 0,
              ease: 'easeInOut'
            }}
          />
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-primary font-display text-center text-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            ¡Bienvenidos al sorteo ELNA!
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedLogo; 