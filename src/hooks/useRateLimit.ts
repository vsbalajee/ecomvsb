
import { useState, useCallback } from 'react';
import { SECURITY_CONFIG } from '@/utils/security';

interface RateLimitState {
  attempts: number;
  lastAttempt: number;
  isLocked: boolean;
}

export const useRateLimit = (key: string) => {
  const [state, setState] = useState<RateLimitState>(() => {
    const stored = localStorage.getItem(`rateLimit_${key}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      const now = Date.now();
      const isLocked = parsed.isLocked && 
        (now - parsed.lastAttempt) < SECURITY_CONFIG.LOGIN_LOCKOUT_DURATION;
      
      return {
        ...parsed,
        isLocked
      };
    }
    return { attempts: 0, lastAttempt: 0, isLocked: false };
  });

  const recordAttempt = useCallback((isSuccess: boolean) => {
    const now = Date.now();
    
    if (isSuccess) {
      // Reset on successful attempt
      const newState = { attempts: 0, lastAttempt: now, isLocked: false };
      setState(newState);
      localStorage.setItem(`rateLimit_${key}`, JSON.stringify(newState));
    } else {
      // Increment failed attempts
      const newAttempts = state.attempts + 1;
      const isLocked = newAttempts >= SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS;
      
      const newState = {
        attempts: newAttempts,
        lastAttempt: now,
        isLocked
      };
      
      setState(newState);
      localStorage.setItem(`rateLimit_${key}`, JSON.stringify(newState));
    }
  }, [key, state.attempts]);

  const getRemainingTime = useCallback(() => {
    if (!state.isLocked) return 0;
    const elapsed = Date.now() - state.lastAttempt;
    return Math.max(0, SECURITY_CONFIG.LOGIN_LOCKOUT_DURATION - elapsed);
  }, [state.isLocked, state.lastAttempt]);

  return {
    isLocked: state.isLocked,
    remainingAttempts: Math.max(0, SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS - state.attempts),
    recordAttempt,
    getRemainingTime
  };
};
