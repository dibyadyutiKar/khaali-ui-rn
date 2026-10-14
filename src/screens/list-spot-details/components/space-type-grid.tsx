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
  return (
    <View style={styles.grid}>
      {options.map((option) => (
        <SpaceTypeTile
          key={option.id}
          option={option}
          active={option.id === selected}
          onPress={() => onSelect(option.id)}
        />
      ))}
    </View>
  );
}

function SpaceTypeTile({
  option,
  active,
  onPress,
}: {
  option: SpaceType;
  active: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();
  const foreground = active ? theme.background : theme.text;

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: active }}
      accessibilityLabel={option.label}
      onPress={onPress}
      style={[styles.tile, { backgroundColor: active ? theme.text : theme.backgroundElement }]}>
      <Icon name={option.icon} size={22} color={foreground as string} />
      <ThemedText type="default" style={[styles.label, { color: foreground }]}>
        {option.label}
      </ThemedText>

      {active && (
        <View style={[styles.badge, { backgroundColor: theme.accent }]}>
          <Icon name={{ sf: 'checkmark', md: 'check' }} size={11} color={theme.background as string} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  tile: {
    position: 'relative',
    flexBasis: '47%',
    flexGrow: 1,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    gap: Spacing.two,
  },
  label: {
    fontWeight: 700,
  },
  badge: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    width: 20,
    height: 20,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
