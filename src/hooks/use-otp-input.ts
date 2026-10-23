import { useEffect, useState } from 'react';

export function useOtpInput(length: number, resendSeconds: number) {
  const [code, setCodeState] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(resendSeconds);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timeout = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  /** Normalizes pasted/autofilled text (spaces, dashes) down to `length` digits. */
  function setCode(text: string) {
    const next = text.replace(/\D/g, '').slice(0, length);
    setCodeState(next);
    return next;
  }

  function handleResend() {
    if (secondsLeft > 0) return;
    setSecondsLeft(resendSeconds);
    setCodeState('');
  }

  return { code, setCode, isComplete: code.length === length, secondsLeft, handleResend };
}
