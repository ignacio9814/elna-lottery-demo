import { Participant, Winner, LotteryHistory, LotteryConfig } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const selectWinners = (participants: Participant[], config: LotteryConfig): Winner[] => {
  if (participants.length === 0) return [];
  
  const shuffled = shuffleArray(participants);
  const winners: Winner[] = [];
  
  for (let i = 0; i < Math.min(config.totalWinners, shuffled.length); i++) {
    winners.push({
      ...shuffled[i],
      position: i + 1,
      isTopWinner: i < config.topWinnersCount
    });
  }
  
  return winners;
};

export const saveToHistory = (history: LotteryHistory[]): void => {
  try {
    localStorage.setItem('elna-lottery-history', JSON.stringify(history));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromHistory = (): LotteryHistory[] => {
  try {
    const stored = localStorage.getItem('elna-lottery-history');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return [];
  }
};

export const addToHistory = (history: LotteryHistory[], newEntry: LotteryHistory): LotteryHistory[] => {
  const updatedHistory = [newEntry, ...history].slice(0, 50); // Keep only last 50 entries
  saveToHistory(updatedHistory);
  return updatedHistory;
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem('elna-lottery-history');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const getPrizeName = (position: number): string => {
  if (position === 1) return '🏆 Primer Premio';
  if (position === 2) return '🥈 Segundo Premio';
  if (position === 3) return '🥉 Tercer Premio';
  return `🎁 Premio #${position}`;
};

export const getPrizeColor = (position: number): string => {
  if (position === 1) return 'from-gold-400 to-gold-600';
  if (position === 2) return 'from-gray-300 to-gray-500';
  if (position === 3) return 'from-amber-600 to-amber-800';
  return 'from-primary-400 to-primary-600';
}; 