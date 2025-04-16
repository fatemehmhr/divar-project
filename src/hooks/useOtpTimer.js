import { useState, useEffect, useCallback } from 'react';

const useOTPTimer = (initialTime = 20) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialTime);
    setIsExpired(false);
  }, [initialTime]);

  const startTimer = useCallback(() => {
    setIsExpired(false);
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft <= 0 && !isExpired) {
      setIsExpired(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isExpired]);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isExpired,
    isLoading,
    resetTimer,
    startTimer,
    setIsLoading
  };
};

export default useOTPTimer;