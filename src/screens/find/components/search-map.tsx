import { Pressable, StyleSheet, View } from 'react-native';

import { Dot } from '@/components/dot';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const NEARBY_PINS = [
  { id: 'a', price: '₹30', period: '/hr', top: '16%', left: '44%' },
  { id: 'b', price: '₹35', period: '/hr', top: '30%', left: '70%' },
  { id: 'c', price: '₹150', period: '/day', top: '66%', left: '60%' },
] as const;

/**
 * A static, illustrative stand-in for a real map — same visual language as the welcome
 * screen's map preview. Swapping this for a real pannable map (with live spot coordinates)
 * needs a map SDK and a listings backend; see docs/gaps.md.
 */
export function SearchMap({ onLocatePress }: { onLocatePress: () => void }) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.mapBlock }]}>
      {NEARBY_PINS.map((pin) => (
        <View
          key={pin.id}
          style={[
            styles.pin,
            { top: pin.top, left: pin.left, backgroundColor: theme.background },
          ]}>
          <Dot color={theme.accent} size={6} />
          <ThemedText type="smallBold">{pin.price}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {pin.period}
          </ThemedText>
        </View>
      ))}

      <View style={styles.featured}>
        <View style={[styles.featuredPin, { backgroundColor: theme.text }]}>
          <ThemedText type="smallBold" style={{ color: theme.background }}>
            ₹40/hr
          </ThemedText>
        </View>
        <View style={[styles.featuredTail, { borderTopColor: theme.text }]} />
        <ThemedText type="small" themeColor="textSecondary" style={styles.locationLabel}>
          SONY WORLD JUNCTION
        </ThemedText>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Center on my location"
        onPress={onLocatePress}
        style={[styles.locateButton, { backgroundColor: theme.background }]}>
        <Icon name={{ sf: 'location.fill', md: 'my-location' }} size={18} color={theme.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    aspectRatio: 1.5,
    borderRadius: Radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  pin: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.full,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
  },
  featured: {
    position: 'absolute',
    left: '10%',
    bottom: '22%',
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
  locationLabel: {
    marginTop: Spacing.one,
    fontWeight: 700,
    letterSpacing: 0.3,
  },
  locateButton: {
    position: 'absolute',
    right: Spacing.three,
    bottom: Spacing.three,
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.16)',
  },
});
