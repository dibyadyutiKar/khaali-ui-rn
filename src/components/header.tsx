import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Dot } from '@/components/dot';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * The app's one nav-bar shape: back + brand mark + avatar, on every screen that has one.
 * `badge` is the only thing that varies by screen context (an encrypted-auth pill, a step
 * label, or nothing) — never rebuild this bar's structure or styling per screen.
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

        <View style={styles.brand}>
          <ThemedText type="default" style={styles.brandLabel}>
            KHAALI
          </ThemedText>
          <Dot color={theme.accent} size={6} />
        </View>
      </View>

      <View style={styles.right}>
        {badge}

        <View style={[styles.avatar, { backgroundColor: theme.text }]}>
          <Icon
            name={{ sf: 'person.fill', md: 'person' }}
            size={16}
            color={theme.background as string}
          />
        </View>
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
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  brandLabel: {
    fontWeight: 700,
    letterSpacing: 0.3,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
