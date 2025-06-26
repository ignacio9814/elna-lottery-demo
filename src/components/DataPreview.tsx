import React from 'react';
import { motion } from 'framer-motion';
import { Participant } from '../types';

interface DataPreviewProps {
  participants: Participant[];
  onContinue: () => void;
  onBack: () => void;
}

const DataPreview: React.FC<DataPreviewProps> = ({ participants, onContinue, onBack }) => {
  const previewData = participants.slice(0, 10); // Show first 10 rows

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto px-4 md:px-8 flex flex-col items-center"
    >
      <div className="card p-8 md:p-12 mb-8 w-full">
        <div className="text-center mb-8">
          <h2 className="font-title text-2xl md:text-3xl font-bold text-text mb-2 select-none">
            Vista previa de participantes
          </h2>
          <p className="font-sans text-lg text-text/80 mb-1">
            Se cargaron <span className="font-bold text-text">{participants.length.toLocaleString()}</span> participantes
          </p>
          <p className="font-sans text-sm text-text/60">
            Mostrando los primeros 10
          </p>
        </div>
        <div className="table-container overflow-x-auto">
          <table className="w-full min-w-[350px]">
            <thead>
              <tr className="table-header">
                <th className="px-4 py-3 text-left text-text/80 font-semibold">#</th>
                <th className="px-4 py-3 text-left text-text/90 font-semibold">Nombre</th>
                <th className="px-4 py-3 text-left text-text/90 font-semibold">DNI</th>
              </tr>
            </thead>
            <tbody>
              {previewData.map((participant, index) => (
                <motion.tr
                  key={participant.id}
                  className="table-row"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-4 py-3 text-text/60">{index + 1}</td>
                  <td className="px-4 py-3 text-text font-medium">
                    {participant.nombre}
                  </td>
                  <td className="px-4 py-3 text-text/80">{participant.dni}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
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
          onClick={onContinue}
          className="btn-primary w-full sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continuar al sorteo →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DataPreview; 