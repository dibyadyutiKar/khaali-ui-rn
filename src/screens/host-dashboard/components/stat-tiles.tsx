import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  deltaLabel?: string;
};

export function StatTiles({ stats }: { stats: DashboardStat[] }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      {stats.map((stat) => (
        <View key={stat.id} style={[styles.tile, { backgroundColor: theme.backgroundElement }]}>
          <View style={styles.valueRow}>
            <ThemedText type="statValue">{stat.value}</ThemedText>
            {stat.deltaLabel && (
              <ThemedText type="smallBold" themeColor="textSecondary">
                {stat.deltaLabel}
              </ThemedText>
            )}
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {stat.label}
          </ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  tile: {
    flex: 1,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    gap: Spacing.half,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: Spacing.one,
  },
});
