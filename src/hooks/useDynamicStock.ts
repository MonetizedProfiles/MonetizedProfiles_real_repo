import { useState, useEffect } from 'react';

const stockValues = [3, 1, 2]; // The cycle: 3 → 1 → 2
const THIRTY_MINUTES_MS = 30 * 60 * 1000;

const calculateCurrentStock = (): number => {
  const cycleIndex = Math.floor(Date.now() / THIRTY_MINUTES_MS) % 3;
  return stockValues[cycleIndex];
};

const getTimeUntilNextChange = (): number => {
  const now = Date.now();
  const currentCycleStart = Math.floor(now / THIRTY_MINUTES_MS) * THIRTY_MINUTES_MS;
  const nextCycleStart = currentCycleStart + THIRTY_MINUTES_MS;
  return nextCycleStart - now;
};

export const useDynamicStock = (): number => {
  const [stock, setStock] = useState<number>(calculateCurrentStock);

  useEffect(() => {
    const scheduleNextUpdate = () => {
      const timeUntilChange = getTimeUntilNextChange();
      
      return setTimeout(() => {
        setStock(calculateCurrentStock());
        // Schedule the next update
        const nextTimeout = scheduleNextUpdate();
        return () => clearTimeout(nextTimeout);
      }, timeUntilChange);
    };

    const timeout = scheduleNextUpdate();
    return () => clearTimeout(timeout);
  }, []);

  return stock;
};
