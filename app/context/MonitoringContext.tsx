import { createContext, useContext, useState, useEffect } from 'react';

type Stats = {
  sleepQuality: string;
  movement: string;
  soundLevel: string;
  temperature: string;
};

type MonitoringContextType = {
  stats: Stats;
  lastUpdate: string;
  babyStatus: string;
};

const MonitoringContext = createContext<MonitoringContextType | null>(null);

export function MonitoringProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<Stats>({
    sleepQuality: 'Good',
    movement: 'Low',
    soundLevel: 'Quiet',
    temperature: '72°F'
  });
  const [lastUpdate, setLastUpdate] = useState('Just now');
  const [babyStatus, setBabyStatus] = useState('Sleeping');

  useEffect(() => {
    const updateStats = () => {
      const newMovement = Math.random() > 0.5 ? 'Low' : 'Medium';
      const newSoundLevel = Math.random() > 0.7 ? 'Moderate' : 'Quiet';
      const newStatus = Math.random() > 0.6 ? (babyStatus === 'Sleeping' ? 'Awake' : 'Sleeping') : babyStatus;

      console.log('Updating stats:', {
        movement: newMovement,
        soundLevel: newSoundLevel,
        status: newStatus
      });
      
      setStats(current => ({
        ...current,
        movement: newMovement,
        soundLevel: newSoundLevel,
      }));
      
      setBabyStatus(newStatus);
      setLastUpdate('Just now');
    };

    console.log('Setting up monitoring interval');
    updateStats(); // Initial update
    const interval = setInterval(updateStats, 20000);
    
    return () => {
      console.log('Cleaning up monitoring interval');
      clearInterval(interval);
    };
  }, [babyStatus]); // Added babyStatus as dependency since we use it in updateStats

  return (
    <MonitoringContext.Provider value={{ stats, lastUpdate, babyStatus }}>
      {children}
    </MonitoringContext.Provider>
  );
}

export function useMonitoring() {
  const context = useContext(MonitoringContext);
  if (!context) {
    throw new Error('useMonitoring must be used within a MonitoringProvider');
  }
  return context;
} 