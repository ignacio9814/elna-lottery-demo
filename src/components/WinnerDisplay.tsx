import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { Winner } from '../types';
import { getPrizeName, getPrizeColor } from '../utils/lotteryUtils';

interface WinnerDisplayProps {
  winner: Winner;
  onNext: () => void;
  isLastTopWinner: boolean;
}

const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ winner, onNext, isLastTopWinner }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (winner.isTopWinner) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  return (
    <div className="relative">
      {showConfetti
        ? React.createElement(Confetti as any, {
            width: windowDimensions.width,
            height: windowDimensions.height,
            recycle: false,
            numberOfPieces: 200,
            colors: ['#fbbf24', '#a855f7', '#ef4444', '#10b981', '#3b82f6']
          })
        : null}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="lottery-container p-8"
      >
        <div className="text-center">
          <motion.div
            className="text-8xl mb-6"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 1, repeat: 3 }}
          >
            {winner.position === 1 ? '🏆' : winner.position === 2 ? '🥈' : winner.position === 3 ? '🥉' : '🎁'}
          </motion.div>

          <motion.h2
            className="text-3xl font-bold mb-4 font-display text-primary"
            animate={{ 
              color: ['#1B3A6B', '#222222', '#1B3A6B'],
              textShadow: [
                '0 0 10px rgba(168, 85, 247, 0.1)',
                '0 0 20px rgba(251, 191, 36, 0.1)',
                '0 0 10px rgba(168, 85, 247, 0.1)'
              ]
            }}
            transition={{ duration: 1, repeat: 3 }}
          >
            {getPrizeName(winner.position)}
          </motion.h2>

          <motion.div
            className={`winner-card bg-gradient-to-br ${getPrizeColor(winner.position)} mb-6`}
            animate={{ 
              y: [0, -10, 0],
              boxShadow: [
                '0 10px 25px rgba(0,0,0,0.3)',
                '0 20px 40px rgba(251, 191, 36, 0.4)',
                '0 10px 25px rgba(0,0,0,0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: 3 }}
          >
            <h3 className="text-4xl font-bold mb-2 text-shadow text-primary">
              {winner.nombre}
            </h3>
            <p className="text-xl text-primary">
              DNI: {winner.dni}
            </p>
            <p className="text-lg mt-2 text-primary">
              Posición #{winner.position}
            </p>
          </motion.div>

          <motion.div
            className="text-lg mb-8 text-primary font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p>¡Felicitaciones al ganador!</p>
            {winner.isTopWinner && (
              <p className="text-primary font-bold mt-2">
                🎉 ¡Premio Principal! 🎉
              </p>
            )}
          </motion.div>

          <AnimatePresence>
            {isLastTopWinner && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 2 }}
                className="mb-6"
              >
                <div className="bg-primary-900/30 rounded-lg p-4 border border-primary-500/30">
                  <p className="text-black/90 text-lg">
                    🎊 ¡Los premios principales han sido asignados! 🎊
                  </p>
                  <p className="text-black/70 text-sm mt-2">
                    Continuando con los demás ganadores...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={onNext}
            className="btn-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLastTopWinner ? 'Continuar con Otros Ganadores' : 'Siguiente Ganador'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default WinnerDisplay; 