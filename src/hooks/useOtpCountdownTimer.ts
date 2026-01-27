import { useState, useEffect, useCallback } from 'react';

interface UseOtpCountdownTimerProps {
    storageKey: string;
    onResend: () => void;
    initialSeconds?: number;
}

export function useOtpCountdownTimer({
    storageKey,
    onResend,
    initialSeconds = 60,
}: UseOtpCountdownTimerProps) {
    const [countdown, setCountdown] = useState(0);
    const [showResend, setShowResend] = useState(false);

    useEffect(() => {
        const startTimeStr = window.localStorage.getItem(storageKey);
        const startTime = startTimeStr ? parseInt(startTimeStr, 10) : 0;

        const updateTimer = () => {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            const remaining = initialSeconds - elapsed;

            if (remaining > 0) {
                setCountdown(remaining);
                setShowResend(false);
            } else {
                setCountdown(0);
                setShowResend(true);
            }
        };

        if (startTime) {
            updateTimer();
            const interval = setInterval(updateTimer, 1000);
            return () => clearInterval(interval);
        } else {
            setShowResend(true);
        }
    }, [storageKey, initialSeconds]);

    const handleResend = useCallback(() => {
        onResend();
        const now = Date.now();
        window.localStorage.setItem(storageKey, now.toString());
        setCountdown(initialSeconds);
        setShowResend(false);
    }, [onResend, storageKey, initialSeconds]);

    return { countdown, showResend, handleResend };
}
