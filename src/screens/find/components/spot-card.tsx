import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type Spot = {
  id: string;
  title: string;
  prices: { hourly: number; daily: number; monthly: number };
  distanceMeters: number;
  walkMinutes: number;
  rating: number;
  tags: string[];
};

export function SpotCard({ spot, price, unit }: { spot: Spot; price: number; unit: string }) {
  const theme = useTheme();

  return (
    <View
      style={styles.card}
      accessible
      accessibilityLabel={`${spot.title}, ₹${price} ${unit}, ${spot.walkMinutes} minute walk, rated ${spot.rating}`}>
      <View style={[styles.thumbnail, { backgroundColor: theme.backgroundElement }]}>
        <Icon name={{ sf: 'car.fill', md: 'directions-car' }} size={24} color={theme.textSecondary} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <ThemedText type="defaultBold" style={styles.title} numberOfLines={2}>
            {spot.title}
          </ThemedText>
          <ThemedText type="smallBold">
            ₹{price.toLocaleString('en-IN')}
            <ThemedText type="small" themeColor="textSecondary">
              {unit}
            </ThemedText>
          </ThemedText>
        </View>

        <View style={styles.metaRow}>
          <Icon name={{ sf: 'star.fill', md: 'star' }} size={12} color={theme.text} />
          <ThemedText type="smallBold">{spot.rating.toFixed(1)}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1} style={styles.meta}>
            · {spot.distanceMeters} m · {spot.walkMinutes} min walk
          </ThemedText>
        </View>

        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {spot.tags.join(' · ')}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: Spacing.half,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: {
    flex: 1,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  meta: {
    flexShrink: 1,
  },
});
