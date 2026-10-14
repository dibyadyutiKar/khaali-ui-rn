import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type Role = {
  id: string;
  icon: IconName;
  title: string;
  subtitle: string;
  tag: string;
  highlight: { icon: IconName; label: string };
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
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: selected ? theme.infoMuted : theme.backgroundElement,
          borderColor: selected ? theme.text : 'transparent',
          opacity: pressed ? 0.85 : 1,
        },
      ]}>
      <View style={styles.headerRow}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: selected ? theme.text : theme.background },
          ]}>
          <Icon name={role.icon} size={20} color={(selected ? theme.background : theme.text) as string} />
        </View>

        {selected ? (
          <View style={[styles.indicator, { backgroundColor: theme.text }]}>
            <Icon name={{ sf: 'checkmark', md: 'check' }} size={12} color={theme.background as string} />
          </View>
        ) : (
          <View style={[styles.indicator, styles.indicatorEmpty, { borderColor: theme.backgroundSelected }]} />
        )}
      </View>

      <ThemedText type="default" style={styles.title}>
        {role.title}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {role.subtitle}
      </ThemedText>

      <View style={styles.tagRow}>
        <Pill tone="backgroundSelected">
          <ThemedText type="small">{role.tag}</ThemedText>
        </Pill>
        <Pill tone="accentMuted">
          <Icon name={role.highlight.icon} size={11} color={theme.accent} />
          <ThemedText type="small" themeColor="accent" style={styles.highlightLabel}>
            {role.highlight.label}
          </ThemedText>
        </Pill>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    padding: Spacing.three,
    gap: Spacing.half,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.one,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorEmpty: {
    borderWidth: 2,
  },
  title: {
    fontWeight: 700,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
    marginTop: Spacing.two,
  },
  highlightLabel: {
    fontWeight: 600,
  },
});
