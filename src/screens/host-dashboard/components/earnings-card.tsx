import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function Sparkline({ values }: { values: number[] }) {
  const theme = useTheme();
  const max = Math.max(...values);

  return (
    <View style={styles.sparkline} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {values.map((value, index) => (
        <View
          key={index}
          style={[
            styles.bar,
            {
              height: `${(value / max) * 100}%`,
              backgroundColor: theme.background,
              opacity: index === values.length - 1 ? 1 : 0.35,
            },
          ]}
        />
      ))}
    </View>
  );
}

/** Inverted (foreground-colored) card, so it stays high-contrast in both light and dark mode. */
export function EarningsCard({
  amount,
  deltaLabel,
  payoutLabel,
  weeklyValues,
}: {
  amount: string;
  deltaLabel: string;
  payoutLabel: string;
  weeklyValues: number[];
}) {
  const theme = useTheme();
  const muted = { color: theme.background, opacity: 0.65 };

  return (
    <View style={[styles.card, { backgroundColor: theme.text }]}>
      <View style={styles.topRow}>
        <ThemedText type="small" style={muted}>
          Earnings this month
        </ThemedText>
        <ThemedText type="smallBold" style={muted}>
          {deltaLabel}
        </ThemedText>
      </View>

      <ThemedText type="display" style={{ color: theme.background }}>
        {amount}
      </ThemedText>

      <Sparkline values={weeklyValues} />

      <ThemedText type="small" style={muted}>
        {payoutLabel}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.four,
    borderRadius: Radius.xl,
    borderCurve: 'continuous',
    gap: Spacing.one,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  sparkline: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.one,
    height: 32,
    marginVertical: Spacing.two,
  },
  bar: {
    flex: 1,
    minHeight: 3,
    borderRadius: Spacing.half,
  },
});
