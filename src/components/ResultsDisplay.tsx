import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Winner } from '../types';
import { getPrizeName, getPrizeColor } from '../utils/lotteryUtils';

interface ResultsDisplayProps {
  winners: Winner[];
  onNewLottery: () => void;
  onViewHistory: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ winners, onNewLottery, onViewHistory }) => {
  const topWinners = winners.filter(w => w.isTopWinner);
  const otherWinners = winners.filter(w => !w.isTopWinner);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 font-display text-primary">
          🎉 ¡Sorteo Completado!
        </h2>
        <p className="text-primary text-lg">
          Se han seleccionado {winners.length} ganadores
        </p>
      </div>

      {/* Top Winners Section */}
      {topWinners.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">
            🏆 Premios Principales
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {topWinners.map((winner, index) => (
              <motion.div
                key={winner.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className={`winner-card bg-gradient-to-br ${getPrizeColor(winner.position)}`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">
                    {winner.position === 1 ? '🏆' : winner.position === 2 ? '🥈' : '🥉'}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-primary">
                    {getPrizeName(winner.position)}
                  </h4>
                  <h5 className="text-xl font-bold mb-2 text-shadow text-primary">
                    {winner.nombre}
                  </h5>
                  <p className="text-primary">DNI: {winner.dni}</p>
                  <p className="text-primary text-sm font-medium">
                    Posición #{winner.position}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Other Winners Section */}
      {otherWinners.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">
            🎁 Otros Ganadores
          </h3>
          <div className="card p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {otherWinners.map((winner, index) => {
                const isFlipped = flippedIndex === index;
                return (
                  <div
                    key={winner.id}
                    className="relative group cursor-pointer"
                    style={{ perspective: 1000 }}
                    onMouseEnter={() => setFlippedIndex(index)}
                    onMouseLeave={() => setFlippedIndex(null)}
                    onTouchStart={() => setFlippedIndex(isFlipped ? null : index)}
                  >
                    <motion.div
                      className="w-full h-full min-h-[180px]"
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, type: 'spring' }}
                    >
                      <div className={`absolute inset-0 w-full h-full backface-hidden bg-white rounded-lg p-4 border border-primary/30 shadow-xl flex flex-col items-center justify-center transition-colors`}
                        style={{ zIndex: isFlipped ? 0 : 2 }}
                      >
                        <motion.div
                          className="text-2xl mb-2 inline-block"
                        >
                          🎁
                        </motion.div>
                        <div className="text-primary text-xs font-semibold mb-2">
                          {getPrizeName(winner.position)}
                        </div>
                        <h5 className="font-semibold mb-1 text-primary">
                          {winner.nombre}
                        </h5>
                        <p className="text-primary text-sm">DNI: {winner.dni}</p>
                        <p className="text-primary text-sm font-medium">
                          Posición #{winner.position}
                        </p>
                      </div>
                      <div className="absolute inset-0 w-full h-full backface-hidden rounded-lg flex flex-col items-center justify-center bg-white border border-primary/30 shadow-xl"
                        style={{ transform: 'rotateY(180deg)', zIndex: isFlipped ? 2 : 0 }}
                      >
                        <div className="text-primary text-2xl md:text-3xl font-bold text-center drop-shadow-lg select-none">
                          Premio nº {winner.position}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center"
      >
        <div className="bg-gradient-to-r from-primary-900/30 to-gold-900/30 rounded-xl p-6 border border-primary-500/30 mb-6">
          <h3 className="text-xl font-bold mb-4 text-primary">📊 Resumen del Sorteo</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-primary">
            <div>
              <p className="text-2xl font-bold text-primary">{winners.length}</p>
              <p className="text-sm">Total Ganadores</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{topWinners.length}</p>
              <p className="text-sm">Premios Principales</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{otherWinners.length}</p>
              <p className="text-sm">Otros Premios</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={onNewLottery}
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎲 Nuevo Sorteo
          </motion.button>
          
          <motion.button
            onClick={onViewHistory}
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📋 Ver Historial
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDisplay; 