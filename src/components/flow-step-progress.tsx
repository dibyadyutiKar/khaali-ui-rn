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
        <ThemedText type="label" themeColor="textSecondary">
          Step {step} of {totalSteps}
        </ThemedText>
        <ThemedText type="smallBold" themeColor="textSecondary" numberOfLines={1} style={styles.section}>
          {label}
        </ThemedText>
      </View>

      <View style={[styles.track, { backgroundColor: theme.backgroundSelected }]}>
        <View
          style={[styles.fill, { backgroundColor: theme.text, width: `${(step / totalSteps) * 100}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  section: {
    flexShrink: 1,
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
