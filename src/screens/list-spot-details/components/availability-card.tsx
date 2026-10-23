import { Host, Switch } from '@expo/ui';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const DAYS = [
  { id: 'mon', label: 'M', name: 'Monday' },
  { id: 'tue', label: 'T', name: 'Tuesday' },
  { id: 'wed', label: 'W', name: 'Wednesday' },
  { id: 'thu', label: 'T', name: 'Thursday' },
  { id: 'fri', label: 'F', name: 'Friday' },
  { id: 'sat', label: 'S', name: 'Saturday' },
  { id: 'sun', label: 'S', name: 'Sunday' },
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

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.row}>
        <View style={styles.rowText}>
          <ThemedText type="defaultBold">Open 24×7</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Entry and exit any time
          </ThemedText>
        </View>
        <Host matchContents>
          <Switch value={alwaysOpen} onValueChange={onToggleAlwaysOpen} />
        </Host>
      </View>

      {!alwaysOpen && (
        <>
          <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />

          <View style={styles.dayRow}>
            {DAYS.map((day) => {
              const active = activeDays.includes(day.id);
              return (
                <Pressable
                  key={day.id}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: active }}
                  accessibilityLabel={day.name}
                  onPress={() => onToggleDay(day.id)}
                  hitSlop={Spacing.one}
                  style={({ pressed }) => [
                    styles.dayCircle,
                    {
                      backgroundColor: active ? theme.text : theme.backgroundSelected,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}>
                  <ThemedText type="smallBold" style={{ color: active ? theme.background : theme.text }}>
                    {day.label}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.timeRow}>
            <TimeField label="From" value={fromTime} onChangeText={onChangeFromTime} />
            <TimeField label="To" value={toTime} onChangeText={onChangeToTime} />
          </View>
        </>
      )}
    </View>
  );
}

function TimeField({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.timeField, { backgroundColor: theme.background }]}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={`${label} time`}
        placeholder="9:00 AM"
        placeholderTextColor={theme.textSecondary}
        style={[styles.timeInput, { color: theme.text }]}
      />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  rowText: {
    flex: 1,
    gap: Spacing.half,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.one,
  },
  dayCircle: {
    width: 36,
    height: 36,
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
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    gap: Spacing.half,
  },
  timeInput: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 700,
    padding: 0,
    outlineWidth: 0,
  },
});
