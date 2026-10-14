import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Placeholder avatar — no real user photo exists yet (no backend/auth provider for one).
 * Swap for a real <Image> once profile photos are wired up; don't fabricate a fake one.
 */
export function Avatar({ size = 36 }: { size?: number }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: Radius.full, backgroundColor: theme.text },
      ]}>
      <Icon
        name={{ sf: 'person.fill', md: 'person' }}
        size={size * 0.44}
        color={theme.background as string}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
