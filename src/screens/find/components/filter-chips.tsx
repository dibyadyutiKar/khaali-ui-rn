import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { Dot } from '@/components/dot';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type DurationFilter = 'now' | 'hourly' | 'daily' | 'monthly';

const FILTERS: { id: DurationFilter; label: string }[] = [
  { id: 'now', label: 'Now' },
  { id: 'hourly', label: 'Hourly' },
  { id: 'daily', label: 'Daily' },
  { id: 'monthly', label: 'Monthly' },
];

export function FilterChips({
  selected,
  onSelect,
}: {
  selected: DurationFilter;
  onSelect: (filter: DurationFilter) => void;
}) {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {FILTERS.map((filter) => {
        const active = filter.id === selected;
        return (
          <Pressable
            key={filter.id}
            accessibilityRole="radio"
            accessibilityState={{ checked: active }}
            accessibilityLabel={filter.label}
            onPress={() => onSelect(filter.id)}
            style={[
              styles.chip,
              { backgroundColor: active ? theme.text : theme.backgroundElement },
            ]}>
            {filter.id === 'now' && <Dot color={theme.accent} size={6} />}
            <ThemedText
              type="small"
              style={[styles.label, { color: active ? theme.background : theme.text }]}>
              {filter.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.full,
    borderCurve: 'continuous',
  },
  label: {
    fontWeight: 600,
  },
});
