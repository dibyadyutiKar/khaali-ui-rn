import { Host, Switch } from '@expo/ui';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const DAYS = [
  { id: 'mon', label: 'M' },
  { id: 'tue', label: 'T' },
  { id: 'wed', label: 'W' },
  { id: 'thu', label: 'T' },
  { id: 'fri', label: 'F' },
  { id: 'sat', label: 'S' },
  { id: 'sun', label: 'S' },
] as const;

export function AvailabilityCard({
  activeDays,
  onToggleDay,
  fromTime,
  onChangeFromTime,
  toTime,
  onChangeToTime,
  alwaysOpen,
  onToggleAlwaysOpen,
}: {
  activeDays: string[];
  onToggleDay: (id: string) => void;
  fromTime: string;
  onChangeFromTime: (value: string) => void;
  toTime: string;
  onChangeToTime: (value: string) => void;
  alwaysOpen: boolean;
  onToggleAlwaysOpen: (value: boolean) => void;
}) {
  const theme = useTheme();
  const statusLabel = alwaysOpen ? 'Active 24×7' : 'Active regular';

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.statusRow}>
        <ThemedText type="label" themeColor="textSecondary">
          Availability
        </ThemedText>
        <ThemedText type="label" themeColor="accent">
          {statusLabel}
        </ThemedText>
      </View>

      <View style={styles.dayRow}>
        {DAYS.map((day) => {
          const active = activeDays.includes(day.id);
          return (
            <Pressable
              key={day.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: active }}
              accessibilityLabel={day.id}
              onPress={() => onToggleDay(day.id)}
              style={[styles.dayCircle, { backgroundColor: active ? theme.text : theme.backgroundSelected }]}>
              <ThemedText type="smallBold" style={{ color: active ? theme.background : theme.text }}>
                {day.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.timeRow}>
        <TimeField label="From" value={fromTime} onChangeText={onChangeFromTime} disabled={alwaysOpen} />
        <TimeField label="To" value={toTime} onChangeText={onChangeToTime} disabled={alwaysOpen} />
      </View>

      <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />

      <View style={styles.alwaysOpenRow}>
        <View style={[styles.alwaysOpenIcon, { backgroundColor: theme.accentMuted }]}>
          <Icon name={{ sf: 'infinity', md: 'all-inclusive' }} size={16} color={theme.accent} />
        </View>
        <View style={styles.alwaysOpenText}>
          <ThemedText type="default" style={styles.alwaysOpenTitle}>
            Available 24×7
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Round-the-clock entry & exit
          </ThemedText>
        </View>
        <Host matchContents>
          <Switch value={alwaysOpen} onValueChange={onToggleAlwaysOpen} />
        </Host>
      </View>
    </View>
  );
}

function TimeField({
  label,
  value,
  onChangeText,
  disabled,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  disabled?: boolean;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.timeField, { backgroundColor: theme.background, opacity: disabled ? 0.4 : 1 }]}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <View style={styles.timeInputRow}>
        <Icon name={{ sf: 'clock', md: 'schedule' }} size={14} color={theme.textSecondary} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          placeholder="9:00 AM"
          placeholderTextColor={theme.textSecondary}
          style={[styles.timeInput, { color: theme.text, outlineWidth: 0 }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    gap: Spacing.three,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  timeField: {
    flex: 1,
    padding: Spacing.two,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    gap: 2,
  },
  timeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  timeInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: 700,
    padding: 0,
  },
  divider: {
    height: 1,
  },
  alwaysOpenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  alwaysOpenIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alwaysOpenText: {
    flex: 1,
    gap: 2,
  },
  alwaysOpenTitle: {
    fontWeight: 700,
  },
});
