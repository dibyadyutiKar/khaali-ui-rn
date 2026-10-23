import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ChipOption<T extends string = string> = {
  id: T;
  label: string;
  /** A semantic icon that inverts color with selection (e.g. a star). */
  icon?: IconName;
};

/**
 * Single-select chip row. Assumes the parent pads its content by `Spacing.three`: the row
 * bleeds back out to the screen edge so chips scroll off-screen instead of clipping at the gutter.
 */
export function SelectChips<T extends string>({
  options,
  selected,
  onSelect,
  onCard,
}: {
  options: ChipOption<T>[];
  selected: T;
  onSelect: (id: T) => void;
  /** Set when rendered on a `backgroundElement` card, so unselected chips don't vanish into it. */
  onCard?: boolean;
}) {
  const theme = useTheme();
  const idleBackground = onCard ? theme.backgroundSelected : theme.backgroundElement;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      accessibilityRole="radiogroup"
      style={styles.bleed}
      contentContainerStyle={styles.row}>
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
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: active ? theme.text : idleBackground,
                opacity: pressed ? 0.7 : 1,
              },
            ]}>
            {option.icon && <Icon name={option.icon} size={12} color={foreground} />}
            <ThemedText type="smallBold" style={{ color: foreground }}>
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bleed: {
    marginHorizontal: -Spacing.three,
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
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
});
