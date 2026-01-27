import { useEffect, useRef, useState } from 'react';

type UseOtpCountdownOptions = {
  duration?: number; // in seconds, default = 120
  storageKey?: string;
  onResend?: () => void;
};

export function useOtpCountdownTimer({
  duration = 120,
  storageKey = 'signupResendStartTime',
  onResend,
}: UseOtpCountdownOptions) {
  const inMemoryStartRef = useRef<number>(0);

  const [signupResendStartTime, setSignupResendStartTime] = useState<number>(
    () => {
      if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem(storageKey);
        const val = stored ? parseInt(stored, 10) : 0;
        inMemoryStartRef.current = val;
        return val;
      }
      return 0;
    },
  );

  const [countdown, setCountdown] = useState(duration);
  const showResend = countdown === 0;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!signupResendStartTime) {
      const now = Date.now();
      window.localStorage.setItem(storageKey, String(now));
      inMemoryStartRef.current = now;
      setSignupResendStartTime(now);
    }
  }, []);

  useEffect(() => {
    const startTime = signupResendStartTime || inMemoryStartRef.current;

    if (!startTime) return;

    const updateRemaining = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const remaining = Math.max(duration - elapsed, 0);

      setCountdown(remaining);
    };

    updateRemaining();

    if (countdown === 0) return;

    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, [signupResendStartTime, duration, countdown]); // Added countdown to dependencies

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey) {
        if (e.newValue) {
          const newTime = parseInt(e.newValue, 10);
          inMemoryStartRef.current = newTime;
          setSignupResendStartTime(newTime);
        } else {
          setSignupResendStartTime(inMemoryStartRef.current);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [storageKey]);

  const handleResend = () => {
    const now = Date.now();
    window.localStorage.setItem(storageKey, String(now));
    inMemoryStartRef.current = now;
    setSignupResendStartTime(now);
    setCountdown(duration);
    onResend?.();
  };

  return { countdown, showResend, handleResend };
}