import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Minimal header for a focused multi-step flow (back + centered title, no brand/avatar) —
 * distinct from Header (auth/setup, back + brand + avatar) and FindHeader (tab root, brand
 * + avatar, no back). Built as shared now, not after a second use, because this flow's own
 * copy states it has 3 steps — the reuse is a certainty, not a guess.
 */
export function FlowHeader({ title, onBack }: { title: string; onBack: () => void }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={onBack}
        style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.6 : 1 }]}>
        <Icon name={{ sf: 'chevron.left', md: 'arrow-back' }} size={20} color={theme.text} />
      </Pressable>

      <ThemedText type="default" style={styles.title} numberOfLines={1}>
        {title}
      </ThemedText>

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 700,
  },
  spacer: {
    width: 36,
  },
});
