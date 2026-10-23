import { Host, Switch } from '@expo/ui';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

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
        styles.stepButton,
        { backgroundColor: theme.backgroundSelected, opacity: disabled ? 0.4 : pressed ? 0.7 : 1 },
      ]}>
      <Icon name={icon} size={16} color={theme.text} />
    </Pressable>
  );
}

export function ScheduleSection({
  dateLabel,
  timeRangeLabel,
  durationHours,
  minHours,
  maxHours,
  onChangeDuration,
  vehicleLabel,
  evCharging,
  evFee,
  onToggleEvCharging,
}: {
  dateLabel: string;
  timeRangeLabel: string;
  durationHours: number;
  minHours: number;
  maxHours: number;
  onChangeDuration: (hours: number) => void;
  vehicleLabel: string;
  evCharging: boolean;
  evFee: number;
  onToggleEvCharging: (value: boolean) => void;
}) {
  const theme = useTheme();
  const divider = <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />;

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.row}>
        <View style={styles.rowText}>
          <ThemedText type="defaultBold">{dateLabel}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {timeRangeLabel}
          </ThemedText>
        </View>
        <View style={styles.stepper}>
          <StepButton
            icon={{ sf: 'minus', md: 'remove' }}
            label="Shorten by one hour"
            disabled={durationHours <= minHours}
            onPress={() => onChangeDuration(durationHours - 1)}
          />
          <ThemedText type="smallBold" style={styles.hours} accessibilityLiveRegion="polite">
            {durationHours} hrs
          </ThemedText>
          <StepButton
            icon={{ sf: 'plus', md: 'add' }}
            label="Extend by one hour"
            disabled={durationHours >= maxHours}
            onPress={() => onChangeDuration(durationHours + 1)}
          />
        </View>
      </View>

      {divider}

      <View style={styles.row}>
        <Icon name={{ sf: 'car.fill', md: 'directions-car' }} size={18} color={theme.textSecondary} />
        <ThemedText type="default" numberOfLines={1} style={styles.rowText}>
          {vehicleLabel}
        </ThemedText>
      </View>

      {divider}

      <View style={styles.row}>
        <View style={styles.rowText}>
          <ThemedText type="default">EV charging</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            +₹{evFee}
          </ThemedText>
        </View>
        <Host matchContents>
          <Switch value={evCharging} onValueChange={onToggleEvCharging} />
        </Host>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  rowText: {
    flex: 1,
    gap: Spacing.half,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  stepButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hours: {
    minWidth: 44,
    textAlign: 'center',
  },
});
