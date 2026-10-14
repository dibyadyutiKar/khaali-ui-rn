import { Pressable, StyleSheet, View } from 'react-native';

import { Dot } from '@/components/dot';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Static stand-in for a real pannable map — same honest-placeholder approach as Find's
 * SearchMap. A pin for "set your exact location" is the literal core task here, so faking
 * precise coordinates on a fabricated street map would be worse than a clear placeholder;
 * this needs a real map SDK + API key before it can be real. See docs/gaps.md. The pin stays
 * fixed (not draggable) since dragging it over non-geographic placeholder content would be
 * hollow motion, not a real capability.
 */
export function PinMapPlaceholder({
  areaLabel,
  onLocatePress,
  onZoomIn,
  onZoomOut,
}: {
  areaLabel: string;
  onLocatePress: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.mapBlock }]}>
      <View style={styles.areaLabelRow}>
        <Dot color={theme.accent} size={6} />
        <ThemedText type="smallBold">{areaLabel}</ThemedText>
      </View>

      <View style={styles.pinWrap}>
        <View style={styles.hint}>
          <Dot color={theme.accent} size={5} />
          {/* Pill bg is a fixed dark overlay regardless of theme, so its text stays fixed
              white too — pairing it with theme.background would go black-on-black in dark
              mode, since background flips dark there. */}
          <ThemedText type="small" style={styles.hintText}>
            Move map to adjust pin
          </ThemedText>
        </View>
        <View style={[styles.pin, { backgroundColor: theme.text }]}>
          <ThemedText type="smallBold" style={{ color: theme.background }}>
            P
          </ThemedText>
        </View>
        <View style={[styles.pinTail, { borderTopColor: theme.text }]} />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Center on my location"
        onPress={onLocatePress}
        style={[styles.locateButton, { backgroundColor: theme.background }]}>
        <Icon name={{ sf: 'location.fill', md: 'my-location' }} size={16} color={theme.text} />
      </Pressable>

      <View style={[styles.zoomGroup, { backgroundColor: theme.background }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Zoom in"
          onPress={onZoomIn}
          style={styles.zoomButton}>
          <Icon name={{ sf: 'plus', md: 'add' }} size={16} color={theme.text} />
        </Pressable>
        <View style={[styles.zoomDivider, { backgroundColor: theme.backgroundSelected }]} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Zoom out"
          onPress={onZoomOut}
          style={styles.zoomButton}>
          <Icon name={{ sf: 'minus', md: 'remove' }} size={16} color={theme.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    aspectRatio: 1.3,
    borderRadius: Radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
    padding: Spacing.three,
  },
  areaLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  pinWrap: {
    position: 'absolute',
    top: '42%',
    left: '50%',
    transform: [{ translateX: -22 }],
    alignItems: 'center',
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.full,
    marginBottom: Spacing.two,
  },
  hintText: {
    color: '#ffffff',
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
  locateButton: {
    position: 'absolute',
    top: Spacing.three,
    right: Spacing.three,
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.16)',
  },
  zoomGroup: {
    position: 'absolute',
    bottom: Spacing.three,
    right: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    overflow: 'hidden',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.16)',
  },
  zoomButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomDivider: {
    height: 1,
  },
});
