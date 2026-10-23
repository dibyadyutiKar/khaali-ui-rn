import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type FareLine = {
  label: string;
  amount: number;
};

export function FareSummary({
  lines,
  total,
  cancelNote,
}: {
  lines: FareLine[];
  total: number;
  cancelNote: string;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      {lines.map((line) => (
        <View key={line.label} style={styles.line}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
            {line.label}
          </ThemedText>
          <ThemedText type="small">
            {line.amount < 0 ? '−' : ''}₹{Math.abs(line.amount)}
          </ThemedText>
        </View>
      ))}

      <View style={[styles.line, styles.total, { borderTopColor: theme.backgroundSelected }]}>
        <ThemedText type="defaultBold">Total</ThemedText>
        <ThemedText type="statValue">₹{total}</ThemedText>
      </View>

      <ThemedText type="small" themeColor="textSecondary">
        {cancelNote}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
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
    gap: Spacing.three,
  },
  label: {
    flexShrink: 1,
  },
  total: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.two,
    marginTop: Spacing.one,
  },
});
