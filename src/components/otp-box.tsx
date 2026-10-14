import { StyleSheet, View } from 'react-native';

import { Dot } from '@/components/dot';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function OtpBox({ digit, active }: { digit: string; active: boolean }) {
  const theme = useTheme();
  const filled = digit !== '';

  return (
    <View
      style={[
        styles.box,
        {
          backgroundColor: active ? theme.background : theme.backgroundElement,
          borderColor: active ? theme.text : 'transparent',
        },
      ]}>
      {filled ? (
        <ThemedText style={styles.digit}>{digit}</ThemedText>
      ) : active ? (
        <View style={[styles.caret, { backgroundColor: theme.text }]} />
      ) : (
        <Dot color={theme.backgroundSelected} size={8} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Deliberately above the type scale — a single OTP digit reads as a distinct, oversized
  // UI element, not body/heading text.
  digit: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: 700,
  },
  caret: {
    width: 2,
    height: Spacing.four,
  },
});
