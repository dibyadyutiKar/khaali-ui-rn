import { Pressable, StyleSheet, View } from 'react-native';

import { BrandMark } from '@/components/brand-mark';
import { Icon } from '@/components/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Nav bar for screens with back navigation: back + brand mark. Tab-root screens (nothing to go
 * back to) compose BrandMark/Avatar directly instead — see screens/find/.
 */
export function Header({ onBack }: { onBack: () => void }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={onBack}
        hitSlop={Spacing.one}
        style={({ pressed }) => [
          styles.backButton,
          { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.6 : 1 },
        ]}>
        <Icon name={{ sf: 'chevron.left', md: 'chevron-left' }} size={18} color={theme.text} />
      </Pressable>

      <BrandMark />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
