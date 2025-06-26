import React, { useState } from 'react';
import LotteryPage from './pages/LotteryPage';
import './index.css';
import AnimatedLogo from './components/AnimatedLogo';
import InstitutionalHeader from './components/InstitutionalHeader';

const App: React.FC = () => {
  const [showLogo, setShowLogo] = useState(true);

  return (
    <div className="min-h-screen w-full">
      <InstitutionalHeader />
      {showLogo && (
        <AnimatedLogo showWelcome onFinish={() => setShowLogo(false)} />
      )}
      <main className="pt-[140px]">
        {!showLogo && <LotteryPage />}
      </main>
    </div>
  );
};

export default App; 