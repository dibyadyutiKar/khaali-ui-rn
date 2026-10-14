import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { Dot } from '@/components/dot';
import { Icon, IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ChipOption<T extends string = string> = {
  id: T;
  label: string;
  /** A semantic icon that inverts color with selection (e.g. a checkmark, a star). */
  icon?: IconName;
  /** A fixed-color status dot that doesn't invert (e.g. a "live" indicator) — distinct from
   * `icon` since its meaning (accent-colored, always-on) doesn't follow selection state. */
  dot?: boolean;
};

export function SelectChips<T extends string>({
  options,
  selected,
  onSelect,
}: {
  options: ChipOption<T>[];
  selected: T;
  onSelect: (id: T) => void;
}) {
  const theme = useTheme();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {options.map((option) => {
        const active = option.id === selected;
        const foreground = active ? theme.background : theme.text;

        return (
          <Pressable
            key={option.id}
            accessibilityRole="radio"
            accessibilityState={{ checked: active }}
            accessibilityLabel={option.label}
            onPress={() => onSelect(option.id)}
            style={[styles.chip, { backgroundColor: active ? theme.text : theme.backgroundElement }]}>
            {option.dot && <Dot color={theme.accent} size={6} />}
            {option.icon && <Icon name={option.icon} size={12} color={foreground as string} />}
            <ThemedText type="small" style={[styles.label, { color: foreground }]}>
              {option.label}
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
