export interface Participant {
  id: string;
  nombre: string;
  dni: string;
}

export interface Winner {
  id: string;
  nombre: string;
  dni: string;
  position: number;
  isTopWinner: boolean;
}

export interface LotteryHistory {
  id: string;
  date: string;
  participants: number;
  winners: Winner[];
  totalWinners: number;
}

export interface ExcelData {
  nombre: string;
  dni: string;
}

export interface LotteryConfig {
  totalWinners: number;
  showTopWinners: boolean;
  topWinnersCount: number;
}

export interface LotteryState {
  participants: Participant[];
  winners: Winner[];
  isRunning: boolean;
  currentStep: 'upload' | 'preview' | 'lottery' | 'results';
  config: LotteryConfig;
  history: LotteryHistory[];
} 