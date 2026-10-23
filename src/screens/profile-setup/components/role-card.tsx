import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type Role = {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
};

export function RoleCard({
  role,
  selected,
  onPress,
}: {
  role: Role;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={role.title}
      accessibilityHint={role.subtitle}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: selected ? theme.text : 'transparent',
          opacity: pressed ? 0.85 : 1,
        },
      ]}>
      <View
        style={[
          styles.iconCircle,
          { backgroundColor: selected ? theme.text : theme.backgroundSelected },
        ]}>
        <Icon name={role.icon} size={20} color={selected ? theme.background : theme.text} />
      </View>

      <View style={styles.body}>
        <ThemedText type="defaultBold">{role.title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {role.subtitle}
        </ThemedText>
      </View>

      <View
        style={[
          styles.indicator,
          selected
            ? { backgroundColor: theme.text, borderColor: theme.text }
            : { borderColor: theme.textSecondary },
        ]}>
        {selected && <Icon name={{ sf: 'checkmark', md: 'check' }} size={12} color={theme.background} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderWidth: 2,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    padding: Spacing.three,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: Spacing.half,
  },
  indicator: {
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
