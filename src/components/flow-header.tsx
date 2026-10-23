import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Header for a focused multi-step flow: back + centered title. */
export function FlowHeader({ title, onBack }: { title: string; onBack: () => void }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={onBack}
        hitSlop={Spacing.one}
        style={({ pressed }) => [styles.side, { opacity: pressed ? 0.6 : 1 }]}>
        <Icon name={{ sf: 'chevron.left', md: 'arrow-back' }} size={20} color={theme.text} />
      </Pressable>

      <ThemedText type="defaultBold" style={styles.title} numberOfLines={1}>
        {title}
      </ThemedText>

      <View style={styles.side} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  side: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
