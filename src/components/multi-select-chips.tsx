import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ChipOption } from '@/components/select-chips';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Same chip visual as SelectChips, but each option toggles independently — checkbox semantics,
 * not a radio group, so it isn't forced through SelectChips' single `selected` value.
 */
export function MultiSelectChips<T extends string>({
  options,
  selected,
  onToggle,
}: {
  options: ChipOption<T>[];
  selected: T[];
  onToggle: (id: T) => void;
}) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      {options.map((option) => {
        const active = selected.includes(option.id);
        const foreground = active ? theme.background : theme.text;

        return (
          <Pressable
            key={option.id}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: active }}
            accessibilityLabel={option.label}
            onPress={() => onToggle(option.id)}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: active ? theme.text : theme.backgroundElement,
                opacity: pressed ? 0.7 : 1,
              },
            ]}>
            {option.icon && <Icon name={option.icon} size={13} color={foreground} />}
            <ThemedText type="smallBold" style={{ color: foreground }}>
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
});
