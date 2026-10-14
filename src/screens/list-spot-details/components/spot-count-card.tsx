import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const MIN_SPOTS = 1;
const MAX_SPOTS = 20;

export function SpotCountCard({ count, onChange }: { count: number; onChange: (count: number) => void }) {
  const theme = useTheme();
  const canDecrease = count > MIN_SPOTS;
  const canIncrease = count < MAX_SPOTS;

  return (
    <View style={[styles.card, { backgroundColor: theme.infoMuted }]}>
      <View style={styles.text}>
        <ThemedText type="default" style={styles.title}>
          How many spots?
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Number of identical bays
        </ThemedText>
      </View>

      <View style={styles.stepper}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Decrease spot count"
          disabled={!canDecrease}
          onPress={() => onChange(count - 1)}
          style={[styles.button, { backgroundColor: theme.background, opacity: canDecrease ? 1 : 0.4 }]}>
          <Icon name={{ sf: 'minus', md: 'remove' }} size={14} color={theme.text} />
        </Pressable>

        <ThemedText type="statValue" style={styles.count}>
          {count}
        </ThemedText>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Increase spot count"
          disabled={!canIncrease}
          onPress={() => onChange(count + 1)}
          style={[styles.button, { backgroundColor: theme.text, opacity: canIncrease ? 1 : 0.4 }]}>
          <Icon name={{ sf: 'plus', md: 'add' }} size={14} color={theme.background as string} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  text: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontWeight: 700,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  button: {
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    minWidth: 16,
    textAlign: 'center',
  },
});
