import { StyleSheet, View } from 'react-native';

import { Dot } from '@/components/dot';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function BrandMark() {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <ThemedText type="default" style={styles.label}>
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
    fontWeight: 700,
    letterSpacing: 0.3,
  },
});
