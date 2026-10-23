import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Static stand-in for a real pannable map — same honest-placeholder approach as Find's
 * SearchMap. Precise pin placement needs a real map SDK + API key; see docs/gaps.md. No map
 * controls until then: zoom/locate buttons over an illustration would be dead ends.
 */
export function PinMapPlaceholder({ areaLabel }: { areaLabel: string }) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.mapBlock }]}>
      <View style={styles.center} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <View style={[styles.pin, { backgroundColor: theme.text }]}>
          <ThemedText type="smallBold" style={{ color: theme.background }}>
            P
          </ThemedText>
        </View>
        <View style={[styles.pinTail, { borderTopColor: theme.text }]} />
      </View>

      <View style={[styles.areaLabel, { backgroundColor: theme.background }]}>
        <ThemedText type="smallBold" numberOfLines={1}>
          {areaLabel}
        </ThemedText>
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
  center: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  areaLabel: {
    position: 'absolute',
    left: Spacing.three,
    bottom: Spacing.three,
    maxWidth: '85%',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.full,
    borderCurve: 'continuous',
  },
  pin: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
  },
  pinTail: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
