import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

export function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.item}>
      <ThemedText type="statValue">{value}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.half,
  },
  label: {
    textAlign: 'center',
  },
});
