import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function LocationRow({
  icon,
  title,
  meta,
  badge,
  subtitle,
  trailingIcon,
  onPress,
}: {
  icon: IconName;
  title: string;
  meta?: string;
  badge?: string;
  subtitle: string;
  trailingIcon: IconName;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${subtitle}`}
      onPress={onPress}
      style={({ pressed }) => [styles.row, { opacity: pressed ? 0.7 : 1 }]}>
      <View style={[styles.iconCircle, { backgroundColor: theme.backgroundElement }]}>
        <Icon name={icon} size={18} color={theme.text} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <ThemedText type="default" style={styles.title} numberOfLines={1}>
            {title}
          </ThemedText>
          {meta && (
            <ThemedText type="small" themeColor="textSecondary">
              • {meta}
            </ThemedText>
          )}
          {badge && (
            <Pill tone="backgroundSelected" style={styles.badge}>
              <ThemedText type="small" style={styles.badgeLabel}>
                {badge}
              </ThemedText>
            </Pill>
          )}
        </View>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {subtitle}
        </ThemedText>
      </View>

      <Icon name={trailingIcon} size={16} color={theme.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  title: {
    fontWeight: 700,
    flexShrink: 1,
  },
  badge: {
    paddingVertical: 2,
  },
  badgeLabel: {
    fontWeight: 600,
  },
});
