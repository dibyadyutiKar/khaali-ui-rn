import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FareLine = {
  label: string;
  amount: number;
  info?: string;
};

export function FareSummary({ lines, total }: { lines: FareLine[]; total: number }) {
  const theme = useTheme();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="default" style={styles.sectionTitle}>
          3. Fare summary
        </ThemedText>
        <ThemedText type="small" themeColor="accent" style={styles.surgeLabel}>
          Zero host surge
        </ThemedText>
      </View>

      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
        {lines.map((line) => (
          <View key={line.label} style={styles.line}>
            <ThemedText type="small" themeColor="textSecondary">
              {line.label}
            </ThemedText>
            <ThemedText type="small">
              {line.amount < 0 ? '−' : ''}₹{Math.abs(line.amount)}
            </ThemedText>
          </View>
        ))}

        <View style={[styles.totalRow, { borderTopColor: theme.backgroundSelected }]}>
          <View>
            <ThemedText type="default" style={styles.totalLabel}>
              Total payable
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Inclusive of all local parking tariffs
            </ThemedText>
          </View>
          <ThemedText type="statValue">₹{total}</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.two,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontWeight: 700,
  },
  surgeLabel: {
    fontWeight: 700,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    gap: Spacing.two,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.two,
    borderTopWidth: 1,
  },
  totalLabel: {
    fontWeight: 700,
  },
});
