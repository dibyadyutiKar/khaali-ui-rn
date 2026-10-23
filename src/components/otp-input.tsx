import { useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import { OtpBox } from './otp-box';

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Six display boxes driven by one real, invisible TextInput laid over them — so the system
 * keyboard, iOS "From Messages" suggestions, Android SMS autofill, and paste all work, which a
 * custom on-screen keypad can't offer.
 */
export function OtpInput({
  code,
  length,
  onChangeCode,
  secondsLeft,
  onResend,
}: {
  code: string;
  length: number;
  onChangeCode: (text: string) => void;
  secondsLeft: number;
  onResend: () => void;
}) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(true);
  const canResend = secondsLeft === 0;

  function handleResend() {
    onResend();
    inputRef.current?.focus();
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.boxRow}
        accessible
        accessibilityLabel={`Verification code, ${code.length} of ${length} digits entered`}>
        {Array.from({ length }, (_, index) => (
          <OtpBox
            key={index}
            digit={code[index] ?? ''}
            active={focused && index === Math.min(code.length, length - 1)}
          />
        ))}
        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={onChangeCode}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
          autoFocus
          caretHidden
          style={styles.hiddenInput}
        />
      </View>

      {canResend ? (
        <Pressable
          accessibilityRole="button"
          onPress={handleResend}
          hitSlop={Spacing.two}
          style={({ pressed }) => [styles.resend, { opacity: pressed ? 0.6 : 1 }]}>
          <ThemedText type="smallBold" style={styles.resendLink}>
            Resend code
          </ThemedText>
        </Pressable>
      ) : (
        <ThemedText type="small" themeColor="textSecondary" style={styles.resend}>
          Resend code in {formatTime(secondsLeft)}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
  },
  boxRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  hiddenInput: {
    ...StyleSheet.absoluteFill,
    opacity: 0,
  },
  resend: {
    alignSelf: 'flex-start',
  },
  resendLink: {
    textDecorationLine: 'underline',
  },
});
