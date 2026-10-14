import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { BrandMark } from '@/components/brand-mark';
import { Icon } from '@/components/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * The nav-bar shape for screens with back navigation (auth/setup flow): back + brand mark +
 * avatar. `badge` is the only thing that varies by screen context (an encrypted-auth pill,
 * or nothing) — never rebuild this bar's structure or styling per screen. Tab-root screens
 * (no "back" to go to) compose BrandMark/Avatar directly instead — see screens/find/.
 */
export function Header({ onBack, badge }: { onBack: () => void; badge?: ReactNode }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={onBack}
          style={({ pressed }) => [
            styles.backButton,
            { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.6 : 1 },
          ]}>
          <Icon name={{ sf: 'chevron.left', md: 'chevron-left' }} size={18} color={theme.text} />
        </Pressable>

        <BrandMark />
      </View>

      <View style={styles.right}>
        {badge}
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
    gap: Spacing.two,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexShrink: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
