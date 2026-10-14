import { useEffect, useState } from 'react';

export function useOtpInput(length: number, resendSeconds: number) {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(resendSeconds);

  useEffect(() => {
    if (secondsLeft === 0) return;
    const timeout = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  const isComplete = digits.every((d) => d !== '');

  function handleDigit(digit: string) {
    const index = digits.findIndex((d) => d === '');
    if (index === -1) return;
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
  }

  function handleDelete() {
    let index = -1;
    for (let i = length - 1; i >= 0; i--) {
      if (digits[i] !== '') {
        index = i;
        break;
      }
    }
    if (index === -1) return;
    const next = [...digits];
    next[index] = '';
    setDigits(next);
  }

  function handleResend() {
    if (secondsLeft > 0) return;
    setSecondsLeft(resendSeconds);
    setDigits(Array(length).fill(''));
  }

  return { digits, secondsLeft, isComplete, handleDigit, handleDelete, handleResend };
}
