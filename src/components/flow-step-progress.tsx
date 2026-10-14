import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function FlowStepProgress({
  step,
  totalSteps,
  label,
}: {
  step: number;
  totalSteps: number;
  label: string;
}) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ThemedText type="small" themeColor="textSecondary" style={styles.stepLabel}>
          Step {step} of {totalSteps}
        </ThemedText>
        <ThemedText type="small" themeColor="accent" style={styles.sectionLabel}>
          {label}
        </ThemedText>
      </View>

      <View style={[styles.track, { backgroundColor: theme.backgroundSelected }]}>
        <View
          style={[
            styles.fill,
            { backgroundColor: theme.text, width: `${(step / totalSteps) * 100}%` },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepLabel: {
    fontWeight: 700,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  sectionLabel: {
    fontWeight: 700,
  },
  track: {
    height: 4,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radius.full,
  },
});
