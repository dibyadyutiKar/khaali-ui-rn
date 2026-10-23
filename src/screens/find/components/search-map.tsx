import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type MapPin = { id: string; price: string; top: `${number}%`; left: `${number}%` };

/**
 * A static, illustrative stand-in for a real map — same visual language as the welcome
 * screen's preview. A real pannable map needs a map SDK and a listings backend; see docs/gaps.md.
 */
export function SearchMap({ pins, featured }: { pins: MapPin[]; featured: string }) {
  const theme = useTheme();

  return (
    <View
      style={[styles.card, { backgroundColor: theme.mapBlock }]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants">
      {pins.map((pin) => (
        <View
          key={pin.id}
          style={[styles.pin, { top: pin.top, left: pin.left, backgroundColor: theme.background }]}>
          <ThemedText type="smallBold">{pin.price}</ThemedText>
        </View>
      ))}

      <View style={styles.featured}>
        <View style={[styles.featuredPin, { backgroundColor: theme.text }]}>
          <ThemedText type="smallBold" style={{ color: theme.background }}>
            {featured}
          </ThemedText>
        </View>
        <View style={[styles.featuredTail, { borderTopColor: theme.text }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1.8,
    borderRadius: Radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  pin: {
    position: 'absolute',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.full,
    borderCurve: 'continuous',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
  },
  featured: {
    position: 'absolute',
    left: '12%',
    bottom: '24%',
    alignItems: 'flex-start',
  },
  featuredPin: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.full,
    borderCurve: 'continuous',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  },
  featuredTail: {
    marginLeft: Spacing.three,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
