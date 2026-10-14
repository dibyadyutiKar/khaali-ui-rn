import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Minimal header for a focused multi-step flow (back + centered title), distinct from Header
 * (auth/setup, back + brand + avatar) and FindHeader (tab root, brand + avatar, no back).
 * `right` is an optional slot (e.g. Avatar) for flows that want one — the listing wizard
 * doesn't, checkout does; defaults to a plain spacer so the title stays centered either way.
 */
export function FlowHeader({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack: () => void;
  right?: ReactNode;
}) {
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

      {right ?? <View style={styles.spacer} />}
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
