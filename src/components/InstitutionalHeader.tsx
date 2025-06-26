import React from 'react';
import logo from '../assets/logo.png';

const InstitutionalHeader: React.FC = () => {
  return (
    <header className="w-full bg-[#1B3A6B] shadow-lg fixed top-0 left-0 z-50 flex flex-col items-center justify-center" style={{ minHeight: 110 }}>
      <div className="flex flex-col items-center justify-center py-3 md:py-4 w-full">
        <div className="flex items-center justify-center mb-1">
          <img
            src={logo}
            alt="Logo ELNA"
            className="w-12 h-12 md:w-16 md:h-16 mr-3 drop-shadow-xl"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <span className="font-extrabold text-white text-3xl md:text-5xl tracking-tight leading-none select-none" style={{ letterSpacing: '-0.04em' }}>
            ELNA
          </span>
        </div>
        <span className="text-white text-xs md:text-base font-sans select-none">
          Escuela de Liderazgo del Norte Argentino
        </span>
      </div>
    </header>
  );
};

export default InstitutionalHeader; 