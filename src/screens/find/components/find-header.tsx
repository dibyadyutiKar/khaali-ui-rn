import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { BrandMark } from '@/components/brand-mark';
import { Icon } from '@/components/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Tab-root header — no back button (nothing to go back to). Reuses BrandMark/Avatar from
 * the shared Header so the brand and avatar treatment stay identical across the app; only
 * the structure around them differs because this screen's needs differ (notifications,
 * no back nav).
 */
export function FindHeader({ onNotificationsPress }: { onNotificationsPress: () => void }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <BrandMark />

      <View style={styles.right}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          onPress={onNotificationsPress}
          style={({ pressed }) => [
            styles.iconButton,
            { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.6 : 1 },
          ]}>
          <Icon name={{ sf: 'bell.fill', md: 'notifications' }} size={16} color={theme.text} />
        </Pressable>

        <Avatar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
