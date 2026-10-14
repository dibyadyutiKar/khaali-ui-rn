import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function CurrentLocationCard({
  detectedLabel,
  onPress,
}: {
  detectedLabel: string;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Use my current location, ${detectedLabel}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.85 : 1 },
      ]}>
      <View style={[styles.iconCircle, { backgroundColor: theme.accent }]}>
        <Icon name={{ sf: 'location.fill', md: 'my-location' }} size={18} color={theme.background as string} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <ThemedText type="default" style={styles.title}>
            Use my current location
          </ThemedText>
          <Pill tone="accentMuted">
            <ThemedText type="small" themeColor="accent" style={styles.gpsLabel}>
              GPS
            </ThemedText>
          </Pill>
        </View>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {detectedLabel}
        </ThemedText>
      </View>

      <Icon name={{ sf: 'chevron.right', md: 'chevron-right' }} size={16} color={theme.textSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  title: {
    fontWeight: 700,
  },
  gpsLabel: {
    fontWeight: 700,
    letterSpacing: 0.3,
  },
});
