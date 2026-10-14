import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function StepProgress({ current, total }: { current: number; total: number }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.bars}>
        {Array.from({ length: total }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              { backgroundColor: index < current ? theme.text : theme.backgroundSelected },
            ]}
          />
        ))}
      </View>
      <ThemedText type="small" themeColor="textSecondary">
        Step {current} of {total}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bars: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  bar: {
    width: 28,
    height: 4,
    borderRadius: Radius.full,
  },
});
