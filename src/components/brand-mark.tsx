import { StyleSheet, View } from 'react-native';

import { Dot } from '@/components/dot';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** The logo — its dot is the one place the brand green appears as decoration. */
export function BrandMark() {
  const theme = useTheme();

  return (
    <View style={styles.row} accessibilityRole="header" accessibilityLabel="Khaali">
      <ThemedText type="defaultBold" style={styles.label}>
        KHAALI
      </ThemedText>
      <Dot color={theme.accent} size={6} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  label: {
    letterSpacing: 0.3,
  },
});
