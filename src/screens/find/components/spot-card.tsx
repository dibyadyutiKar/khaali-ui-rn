import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type Spot = {
  id: string;
  title: string;
  price: string;
  distanceMeters: number;
  walkMinutes: number;
  rating: number;
  status: { label: string; verified: boolean };
  tags: string[];
};

export function SpotCard({ spot, onPress }: { spot: Spot; onPress: () => void }) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${spot.title}, ${spot.price} per hour`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.85 : 1 }]}>
      <View style={[styles.thumbnail, { backgroundColor: theme.backgroundElement }]}>
        <Icon name={{ sf: 'car.fill', md: 'directions-car' }} size={28} color={theme.textSecondary} />
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <ThemedText type="default" style={styles.title} numberOfLines={1}>
            {spot.title}
          </ThemedText>
          <ThemedText type="smallBold">
            {spot.price}
            <ThemedText type="small" themeColor="textSecondary">
              /hr
            </ThemedText>
          </ThemedText>
        </View>

        <View style={styles.metaRow}>
          <Icon name={{ sf: 'figure.walk', md: 'directions-walk' }} size={13} color={theme.textSecondary} />
          <ThemedText type="small" themeColor="textSecondary">
            {spot.distanceMeters} m • {spot.walkMinutes} min walk
          </ThemedText>
        </View>

        <View style={styles.tagRow}>
          <Pill tone={spot.status.verified ? 'accentMuted' : 'backgroundSelected'}>
            {spot.status.verified && (
              <Icon name={{ sf: 'checkmark', md: 'check' }} size={10} color={theme.accent} />
            )}
            <ThemedText
              type="small"
              themeColor={spot.status.verified ? 'accent' : 'text'}
              style={styles.tagLabel}>
              {spot.status.label}
            </ThemedText>
          </Pill>
          {spot.tags.map((tag) => (
            <ThemedText key={tag} type="small" themeColor="textSecondary">
              • {tag}
            </ThemedText>
          ))}
          <View style={styles.rating}>
            <Icon name={{ sf: 'star.fill', md: 'star' }} size={12} color={theme.text} />
            <ThemedText type="smallBold">{spot.rating.toFixed(1)}</ThemedText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  thumbnail: {
    width: 88,
    aspectRatio: 1.1,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: Spacing.half,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  title: {
    flex: 1,
    fontWeight: 700,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.one,
    marginTop: Spacing.half,
  },
  tagLabel: {
    fontWeight: 600,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: 'auto',
  },
});
