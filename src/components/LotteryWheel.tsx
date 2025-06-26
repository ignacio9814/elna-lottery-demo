import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Participant } from '../types';
import logo from '../assets/logo.png';

interface LotteryWheelProps {
  participants: Participant[];
  onWinnerSelected: (winner: Participant) => void;
  isSpinning: boolean;
  onSpinComplete: () => void;
}

const LotteryWheel: React.FC<LotteryWheelProps> = ({
  participants,
  onWinnerSelected,
  isSpinning,
  onSpinComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedParticipants, setDisplayedParticipants] = useState<Participant[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const spinDuration = 3000; // 3 seconds
  const spinInterval = 50; // 50ms between each name change

  useEffect(() => {
    if (isSpinning) {
      const repeated = [...participants, ...participants, ...participants];
      setDisplayedParticipants(repeated);
      setCurrentIndex(0);
      let elapsed = 0;
      let localIndex = 0;
      let running = true;
      let lastTimeout: NodeJS.Timeout | null = null;
      let lastIndex = -1;
      // Animación principal con ease-out
      const spinStep = () => {
        if (!running) return;
        const progress = Math.min(elapsed / spinDuration, 1);
        const interval = 50 + 130 * Math.pow(progress, 2);
        // Elegir siguiente índice aleatorio distinto al anterior
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * participants.length);
        } while (nextIndex === lastIndex && participants.length > 1);
        setCurrentIndex(nextIndex);
        lastIndex = nextIndex;
        elapsed += interval;
        if (elapsed < spinDuration) {
          lastTimeout = setTimeout(spinStep, interval);
        } else {
          // Flashes finales: secuencia rápida de nombres distintos
          let flashes = 0;
          const maxFlashes = 7;
          const flashNames = () => {
            if (!running) return;
            if (flashes < maxFlashes) {
              let flashIndex;
              do {
                flashIndex = Math.floor(Math.random() * participants.length);
              } while (flashIndex === lastIndex && participants.length > 1);
              setCurrentIndex(flashIndex);
              lastIndex = flashIndex;
              flashes++;
              setTimeout(flashNames, 90);
            } else {
              // Mostrar el ganador real solo un instante
              let winnerIndex;
              do {
                winnerIndex = Math.floor(Math.random() * participants.length);
              } while (winnerIndex === lastIndex && participants.length > 1);
              setCurrentIndex(winnerIndex);
              const winner = participants[winnerIndex];
              setTimeout(() => {
                if (running) {
                  onWinnerSelected(winner);
                  onSpinComplete();
                }
              }, 600);
            }
          };
          flashNames();
        }
      };
      spinStep();
      return () => {
        running = false;
        if (lastTimeout) clearTimeout(lastTimeout);
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isSpinning, participants, onWinnerSelected, onSpinComplete]);

  const currentParticipant = displayedParticipants[currentIndex] || participants[0];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto mb-8">
      <div className="flex flex-col items-center mb-8">
        <motion.div
          className="flex items-center justify-center mb-4"
          initial={false}
          animate={isSpinning ? { scale: [1, 1.08, 1], filter: 'drop-shadow(0 0 32px #D6E4F0)' } : { scale: 1, filter: 'drop-shadow(0 0 0px #D6E4F0)' }}
          transition={{ duration: 1.2, repeat: isSpinning ? Infinity : 0, ease: 'easeInOut' }}
        >
          <motion.div
            className="rounded-full flex items-center justify-center w-[120px] h-[120px] bg-[#D6E4F0] shadow-[0_0_32px_#EAF1FB,0_4px_24px_#D6E4F022]"
            animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
            transition={{ repeat: isSpinning ? Infinity : 0, duration: 1.2, ease: 'linear' }}
          >
            <img
              src={logo}
              alt="Logo ELNA"
              className="w-20 h-20 drop-shadow-xl"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </motion.div>
        </motion.div>
        <h2 className="font-title text-2xl md:text-3xl font-bold text-text mb-2 select-none">
          Sorteando premio principal…
        </h2>
      </div>
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg mx-auto mb-8">
        <div className="bg-white border border-primary/10 rounded-2xl shadow-lg px-2 py-6 w-full flex flex-col items-center" style={{ minHeight: 90 }}>
          <div className="relative w-full h-12 md:h-16 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 flex items-center justify-center w-full"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-3xl md:text-4xl font-title text-text select-none truncate w-full text-center">
                  {currentParticipant?.nombre || 'Cargando...'}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="text-center mt-2">
            <span className="text-text/70 text-base md:text-lg font-sans select-none">
              DNI: {currentParticipant?.dni || '---'}
            </span>
          </div>
        </div>
      </div>
      <div className="text-center mt-2">
        <motion.div
          className="inline-flex items-center space-x-2 text-primary/70 font-sans"
          animate={isSpinning ? { opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 1, repeat: isSpinning ? Infinity : 0 }}
        >
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-text/70">Sorteando…</span>
        </motion.div>
      </div>
    </div>
  );
};

export default LotteryWheel; 