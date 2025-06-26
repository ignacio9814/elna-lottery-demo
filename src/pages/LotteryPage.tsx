import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import DataPreview from '../components/DataPreview';
import LotteryConfigComponent from '../components/LotteryConfig';
import LotteryWheel from '../components/LotteryWheel';
import WinnerDisplay from '../components/WinnerDisplay';
import ResultsDisplay from '../components/ResultsDisplay';
import HistoryView from '../components/HistoryView';
import { Participant, Winner, LotteryConfig, LotteryHistory } from '../types';
import {
  selectWinners,
  addToHistory,
  loadFromHistory,
  clearHistory,
  generateId
} from '../utils/lotteryUtils';

const DEFAULT_CONFIG: LotteryConfig = {
  totalWinners: 75,
  showTopWinners: true,
  topWinnersCount: 3
};

type Step = 'upload' | 'preview' | 'config' | 'lottery' | 'topWinners' | 'results' | 'history';

const LotteryPage: React.FC = () => {
  const [step, setStep] = useState<Step>('upload');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [config, setConfig] = useState<LotteryConfig>(DEFAULT_CONFIG);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [topWinnerIndex, setTopWinnerIndex] = useState(0);
  const [history, setHistory] = useState<LotteryHistory[]>(loadFromHistory());
  const [error, setError] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentTopWinner, setCurrentTopWinner] = useState<Winner | null>(null);

  // Paso 1: Cargar archivo
  const handleFileUpload = (data: Participant[]) => {
    setParticipants(data);
    setError(null);
    setStep('preview');
  };

  // Paso 2: Vista previa
  const handlePreviewContinue = () => {
    setStep('config');
  };

  // Paso 3: Configuración
  const handleConfigStart = () => {
    // Generar ganadores
    const selected = selectWinners(participants, config);
    setWinners(selected);
    setTopWinnerIndex(0);
    if (config.showTopWinners && config.topWinnersCount > 0) {
      setStep('lottery');
      setIsSpinning(true);
    } else {
      setStep('results');
    }
  };

  const handleWinnerSelected = (winner: Participant) => {
    setCurrentTopWinner(winners[topWinnerIndex]);
  };

  // Paso 5: Resultados
  const handleNewLottery = () => {
    setParticipants([]);
    setWinners([]);
    setConfig(DEFAULT_CONFIG);
    setTopWinnerIndex(0);
    setCurrentTopWinner(null);
    setStep('upload');
  };

  // Historial
  const handleViewHistory = () => setStep('history');
  const handleBackFromHistory = () => setStep('results');
  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  // Renderizado condicional por paso
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-8 px-2">
      {step === 'upload' && (
        <FileUpload
          onFileUpload={handleFileUpload}
          onError={setError}
        />
      )}
      {step === 'preview' && (
        <DataPreview
          participants={participants}
          onContinue={handlePreviewContinue}
          onBack={() => setStep('upload')}
        />
      )}
      {step === 'config' && (
        <LotteryConfigComponent
          config={config}
          onConfigChange={setConfig}
          onStart={handleConfigStart}
          onBack={() => setStep('preview')}
          participantsCount={participants.length}
        />
      )}
      {step === 'lottery' && config.showTopWinners && winners.length > 0 && (
        <>
          {!currentTopWinner ? (
            <LotteryWheel
              participants={participants}
              onWinnerSelected={handleWinnerSelected}
              isSpinning={isSpinning}
              onSpinComplete={() => {
                setIsSpinning(false);
                setCurrentTopWinner(winners[topWinnerIndex]);
              }}
            />
          ) : (
            <WinnerDisplay
              winner={winners[topWinnerIndex]}
              onNext={() => {
                if (topWinnerIndex + 1 < config.topWinnersCount) {
                  setTopWinnerIndex(topWinnerIndex + 1);
                  setCurrentTopWinner(null);
                  setIsSpinning(true);
                } else {
                  setStep('results');
                  // Guardar en historial
                  const newHistory: LotteryHistory = {
                    id: generateId(),
                    date: new Date().toISOString(),
                    participants: participants.length,
                    winners,
                    totalWinners: config.totalWinners
                  };
                  const updatedHistory = addToHistory(history, newHistory);
                  setHistory(updatedHistory);
                }
              }}
              isLastTopWinner={topWinnerIndex + 1 === config.topWinnersCount}
            />
          )}
        </>
      )}
      {step === 'results' && (
        <ResultsDisplay
          winners={winners}
          onNewLottery={handleNewLottery}
          onViewHistory={handleViewHistory}
        />
      )}
      {step === 'history' && (
        <HistoryView
          history={history}
          onBack={handleBackFromHistory}
          onClearHistory={handleClearHistory}
        />
      )}
      {error && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {error}
          <button
            className="ml-4 text-white/80 hover:text-white font-bold"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default LotteryPage; 