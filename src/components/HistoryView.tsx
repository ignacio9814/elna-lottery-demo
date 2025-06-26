import React from 'react';
import { motion } from 'framer-motion';
import { LotteryHistory } from '../types';
import { formatDate } from '../utils/lotteryUtils';
import * as XLSX from 'xlsx';

interface HistoryViewProps {
  history: LotteryHistory[];
  onBack: () => void;
  onClearHistory: () => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onBack, onClearHistory }) => {
  const exportWinnersToExcel = (entry: LotteryHistory) => {
    const data = entry.winners.map(w => ({
      Nombre: w.nombre,
      DNI: w.dni,
      Posición: w.position,
      Premio: w.isTopWinner ? `Principal #${w.position}` : `Premio #${w.position}`
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ganadores');
    XLSX.writeFile(wb, `ganadores_sorteo_${entry.id}.xlsx`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 font-display text-primary">
          📋 Historial de Sorteos
        </h2>
        <p className="text-primary text-lg">
          {history.length} sorteo{history.length !== 1 ? 's' : ''} realizados
        </p>
      </div>

      {history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-12 text-center"
        >
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold mb-2 text-primary">
            No hay sorteo realizado
          </h3>
          <p className="text-primary/60">
            Realiza tu primer sorteo para ver el historial aquí
          </p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {history.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary">
                    Sorteo #{history.length - index}
                  </h3>
                  <p className="text-primary/60 text-sm">
                    {formatDate(new Date(entry.date))}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2 lg:mt-0 items-center">
                  <span className="bg-primary-600/20 text-primary px-3 py-1 rounded-full text-sm">
                    {entry.participants.toLocaleString()} participantes
                  </span>
                  <span className="bg-gold-600/20 text-gold-500 px-3 py-1 rounded-full text-sm">
                    {entry.totalWinners} ganadores
                  </span>
                  <button
                    className="ml-2 btn-primary px-4 py-1 text-sm rounded-lg shadow hover:bg-primary/90 transition"
                    onClick={() => exportWinnersToExcel(entry)}
                  >
                    Exportar Excel
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-primary font-semibold">🏆 Ganadores:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {entry.winners.slice(0, 12).map((winner, winnerIndex) => (
                    <motion.div
                      key={winner.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + winnerIndex * 0.05 }}
                      className={`p-3 rounded-lg border ${
                        winner.isTopWinner
                          ? 'bg-gold-600/20 border-gold-500/30'
                          : 'bg-primary-600/20 border-primary-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-primary">
                          #{winner.position}
                        </span>
                        {winner.isTopWinner && (
                          <span className="text-xs text-gold-500">🏆</span>
                        )}
                      </div>
                      <p className="font-semibold text-sm truncate text-primary">
                        {winner.nombre}
                      </p>
                      <p className="text-primary/60 text-xs">
                        DNI: {winner.dni}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                {entry.winners.length > 12 && (
                  <p className="text-primary/60 text-sm text-center">
                    ... y {entry.winners.length - 12} ganadores más
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <motion.button
          onClick={onBack}
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Volver
        </motion.button>
        
        {history.length > 0 && (
          <motion.button
            onClick={onClearHistory}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🗑️ Limpiar Historial
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default HistoryView; 