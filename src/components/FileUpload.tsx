import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Participant } from '../types';
import { readExcelFile, validateExcelFile, formatFileSize } from '../utils/excelUtils';
import logo from '../assets/logo.png';

interface FileUploadProps {
  onFileUpload: (participants: Participant[]) => void;
  onError: (message: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [wave, setWave] = useState(true);

  // Animación de saludo en loop (wave + bounce)
  React.useEffect(() => {
    if (!selectedFile) {
      const interval = setInterval(() => {
        setWave(false);
        setTimeout(() => setWave(true), 100);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [selectedFile]);

  const handleFileSelect = async (file: File) => {
    if (!validateExcelFile(file)) {
      onError('Por favor selecciona un archivo Excel válido (.xlsx, .xls, .csv)');
      return;
    }
    setSelectedFile(file);
    setIsLoading(true);
    try {
      const participants = await readExcelFile(file);
      onFileUpload(participants);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Error al procesar el archivo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Animación de saludo y salto
  const waveBounce = wave
    ? { rotate: [0, -18, 12, -12, 8, -8, 0], y: [0, -18, 0, -8, 0] }
    : { rotate: [0], y: [0] };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto px-4 md:px-8 flex flex-col items-center"
    >
      <motion.img
        src={logo}
        alt="Logo Fundación ELNA"
        className="w-40 h-40 md:w-56 md:h-56 mb-6 drop-shadow-2xl"
        animate={waveBounce}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
        onClick={handleClick}
      />
      <h2 className="font-title text-primary text-3xl md:text-4xl font-bold text-center mb-6 select-none">
        ¡Poné tus esperanzas y toda tu suerte aquí!
      </h2>
      <motion.div
        className={`relative rounded-2xl shadow-lg p-10 md:p-12 text-center transition-all duration-300 border-2 border-dashed ${
          isDragging
            ? 'border-primary bg-secondary/80'
            : 'border-primary/30 bg-secondary/60 hover:border-primary hover:bg-secondary/80'
        } backdrop-blur-md w-full`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isLoading}
        />
        {isLoading ? (
          <div className="space-y-4">
            <div className="animate-spin-slow w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-text/80">Procesando archivo...</p>
          </div>
        ) : selectedFile ? (
          <div className="space-y-4">
            <div className="text-4xl">📄</div>
            <div>
              <p className="text-text font-semibold">{selectedFile.name}</p>
              <p className="text-text/60 text-sm">{formatFileSize(selectedFile.size)}</p>
            </div>
            <p className="text-primary">Archivo seleccionado ✓</p>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              type="button"
              className="btn-primary font-title text-lg md:text-xl px-8 py-4 rounded-2xl shadow-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200"
              style={{ fontWeight: 700 }}
            >
              Seleccionar archivo Excel
            </button>
            <div className="text-sm text-text/60 space-y-1 mt-2 font-sans">
              <p>Formatos soportados: <b>.xlsx</b>, <b>.xls</b>, <b>.csv</b></p>
              <p>El archivo debe contener columnas: <b>"Nombre"</b> y <b>"DNI"</b></p>
            </div>
          </div>
        )}
      </motion.div>
      {selectedFile && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-center"
        >
          <button
            onClick={() => setSelectedFile(null)}
            className="text-primary hover:underline font-sans"
          >
            Seleccionar otro archivo
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUpload; 