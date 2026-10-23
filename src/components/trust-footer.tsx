import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function TrustFooter({
  message,
  onContactSupport,
}: {
  message: string;
  onContactSupport: () => void;
}) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.messageRow}>
        <Icon name={{ sf: 'lock.fill', md: 'lock' }} size={12} color={theme.textSecondary} />
        <ThemedText type="small" themeColor="textSecondary" style={styles.message}>
          {message}
        </ThemedText>
      </View>

      <Pressable
        accessibilityRole="link"
        onPress={onContactSupport}
        hitSlop={Spacing.two}
        style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
        <ThemedText type="smallBold" style={styles.link}>
          Contact support
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.one,
  },
  message: {
    flex: 1,
  },
  link: {
    textDecorationLine: 'underline',
  },
});
