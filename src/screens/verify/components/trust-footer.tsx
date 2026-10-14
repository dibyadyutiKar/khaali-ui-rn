import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function TrustFooter({ onContactSupport }: { onContactSupport: () => void }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Icon name={{ sf: 'lock.fill', md: 'lock' }} size={14} color={theme.accent} />
        <ThemedText type="label" themeColor="accent">
          256-bit encrypted authentication
        </ThemedText>
      </View>

      <ThemedText type="small" themeColor="textSecondary" style={styles.body}>
        Never share your OTP with anyone. Khaali officials will never request this code.
      </ThemedText>

      <Pressable accessibilityRole="link" onPress={onContactSupport} hitSlop={Spacing.one}>
        <ThemedText type="small" themeColor="accent" style={styles.link}>
          Need help? Contact Khaali Support ↗
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  body: {
    lineHeight: 18,
  },
  link: {
    fontWeight: 600,
    textDecorationLine: 'underline',
  },
});
