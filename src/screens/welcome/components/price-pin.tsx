import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * A floating price chip on the map preview. Regular pins use the surface color so they read as
 * "cards resting on the map"; the featured pin inverts to the foreground color to stand out as
 * the highlighted listing — both automatically stay correct in light and dark mode.
 */
export function PricePin({
  price,
  period,
  featured,
  style,
}: {
  price: string;
  period: string;
  featured?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const background = featured ? theme.text : theme.background;
  const foreground = featured ? theme.background : theme.text;

  return (
    <View
      style={[
        styles.pin,
        featured && styles.pinFeatured,
        { backgroundColor: background, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.14)' },
        style,
      ]}>
      <ThemedText type="smallBold" style={{ color: foreground }}>
        {price}
      </ThemedText>
      <ThemedText type="small" style={{ color: foreground, opacity: 0.6 }}>
        {period}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  pin: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.full,
    borderCurve: 'continuous',
  },
  pinFeatured: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
});
