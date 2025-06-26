import React from 'react';
import { motion } from 'framer-motion';
import { LotteryConfig } from '../types';

interface LotteryConfigProps {
  config: LotteryConfig;
  onConfigChange: (config: LotteryConfig) => void;
  onStart: () => void;
  onBack: () => void;
  participantsCount: number;
}

const LotteryConfigComponent: React.FC<LotteryConfigProps> = ({
  config,
  onConfigChange,
  onStart,
  onBack,
  participantsCount
}) => {
  const handleTotalWinnersChange = (value: number) => {
    onConfigChange({
      ...config,
      totalWinners: Math.min(value, participantsCount)
    });
  };

  const handleTopWinnersChange = (value: number) => {
    onConfigChange({
      ...config,
      topWinnersCount: Math.min(value, config.totalWinners)
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto px-4 md:px-8 flex flex-col items-center"
    >
      <div className="card p-8 md:p-12 mb-8 w-full">
        <div className="text-center mb-8">
          <h2 className="font-title text-2xl md:text-3xl font-bold text-text mb-2 select-none">
            Configuración del sorteo
          </h2>
          <p className="font-sans text-lg text-text/80 mb-1">
            Personalizá los parámetros del sorteo
          </p>
        </div>
        <div className="space-y-8">
          <div>
            <label className="block text-text font-semibold mb-3">
              Total de ganadores
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max={Math.min(75, participantsCount)}
                value={config.totalWinners}
                onChange={(e) => handleTotalWinnersChange(parseInt(e.target.value))}
                className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
                style={{ accentColor: '#1B3A6B' }}
              />
              <span className="text-primary font-bold text-lg min-w-[3rem] text-center">
                {config.totalWinners}
              </span>
            </div>
            <p className="text-text/60 text-sm mt-2">
              Máximo: {Math.min(75, participantsCount)} ganadores
            </p>
          </div>
          <div>
            <label className="block text-text font-semibold mb-3">
              Mostrar premios principales
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={config.showTopWinners}
                onChange={(e) => onConfigChange({
                  ...config,
                  showTopWinners: e.target.checked
                })}
                className="w-5 h-5 accent-primary bg-secondary border-primary rounded focus:ring-primary"
              />
              <span className="text-text">Animar los primeros ganadores</span>
            </div>
          </div>
          {config.showTopWinners && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <label className="block text-text font-semibold">
                Cantidad de premios principales
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max={Math.min(3, config.totalWinners)}
                  value={config.topWinnersCount}
                  onChange={(e) => handleTopWinnersChange(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer slider"
                  style={{ accentColor: '#FFD966' }}
                />
                <span className="text-primary font-bold text-lg min-w-[3rem] text-center">
                  {config.topWinnersCount}
                </span>
              </div>
              <p className="text-text/60 text-sm">
                Los primeros {config.topWinnersCount} ganadores tendrán animación especial
              </p>
            </motion.div>
          )}
          <div className="bg-secondary rounded-xl p-4 border border-primary/10">
            <h3 className="text-text font-semibold mb-2">Resumen</h3>
            <div className="space-y-1 text-text/80 text-sm">
              <p>• Participantes cargados: {participantsCount.toLocaleString()}</p>
              <p>• Ganadores a seleccionar: {config.totalWinners}</p>
              {config.showTopWinners && (
                <p>• Premios principales: {config.topWinnersCount}</p>
              )}
              <p>• Probabilidad: {(config.totalWinners / participantsCount * 100).toFixed(2)}%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
        <motion.button
          onClick={onBack}
          className="btn-secondary w-full sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Volver
        </motion.button>
        <motion.button
          onClick={onStart}
          className="btn-primary w-full sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Iniciar sorteo
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LotteryConfigComponent; 