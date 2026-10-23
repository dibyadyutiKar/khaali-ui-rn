import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SpaceType = {
  id: string;
  icon: IconName;
  label: string;
};

export function SpaceTypeGrid({
  options,
  selected,
  onSelect,
}: {
  options: SpaceType[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  const theme = useTheme();

  return (
    <View style={styles.grid} accessibilityRole="radiogroup">
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
              styles.tile,
              {
                backgroundColor: active ? theme.text : theme.backgroundElement,
                opacity: pressed ? 0.8 : 1,
              },
            ]}>
            <Icon name={option.icon} size={22} color={foreground} />
            <ThemedText type="defaultBold" style={{ color: foreground }}>
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  tile: {
    flexBasis: '47%',
    flexGrow: 1,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    gap: Spacing.two,
  },
});
