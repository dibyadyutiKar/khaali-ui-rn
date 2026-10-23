import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function OtpBox({ digit, active }: { digit: string; active: boolean }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.box,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: active ? theme.text : 'transparent',
        },
      ]}>
      {digit !== '' ? (
        <ThemedText type="statValue">{digit}</ThemedText>
      ) : active ? (
        <View style={[styles.caret, { backgroundColor: theme.text }]} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    aspectRatio: 0.85,
    maxHeight: 64,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caret: {
    width: 2,
    height: Spacing.four,
  },
});
