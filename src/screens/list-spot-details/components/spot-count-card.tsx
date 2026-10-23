import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const MIN_SPOTS = 1;
const MAX_SPOTS = 20;

function StepButton({
  icon,
  label,
  disabled,
  onPress,
}: {
  icon: IconName;
  label: string;
  disabled: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      hitSlop={Spacing.one}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.backgroundSelected, opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
      ]}>
      <Icon name={icon} size={16} color={theme.text} />
    </Pressable>
  );
}

export function SpotCountCard({ count, onChange }: { count: number; onChange: (count: number) => void }) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.text}>
        <ThemedText type="defaultBold">Number of spots</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          Identical bays at this address
        </ThemedText>
      </View>

      <View style={styles.stepper}>
        <StepButton
          icon={{ sf: 'minus', md: 'remove' }}
          label="Decrease spot count"
          disabled={count <= MIN_SPOTS}
          onPress={() => onChange(count - 1)}
        />
        <ThemedText type="statValue" style={styles.count} accessibilityLiveRegion="polite">
          {count}
        </ThemedText>
        <StepButton
          icon={{ sf: 'plus', md: 'add' }}
          label="Increase spot count"
          disabled={count >= MAX_SPOTS}
          onPress={() => onChange(count + 1)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  text: {
    flex: 1,
    gap: Spacing.half,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    minWidth: Spacing.four,
    textAlign: 'center',
  },
});
