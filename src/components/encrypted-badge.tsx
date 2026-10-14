import { StyleSheet } from 'react-native';

import { Icon } from '@/components/icon';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

export function EncryptedBadge() {
  const theme = useTheme();

  return (
    <Pill tone="infoMuted" style={styles.pill}>
      <Icon name={{ sf: 'lock.shield', md: 'security' }} size={12} color={theme.text} />
      <ThemedText type="small" numberOfLines={1} style={styles.label}>
        256-bit encrypted
      </ThemedText>
    </Pill>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexShrink: 1,
  },
  label: {
    fontWeight: 600,
  },
});
