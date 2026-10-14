import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon, IconName } from '@/components/icon';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SearchResult = {
  id: string;
  title: string;
  rating: number;
  reviewCount: number;
  distanceMeters: number;
  walkMinutes: number;
  tags: string[];
  highlightedTag?: string;
  pricePerHour: string;
  pricePerDay: string;
  banner: { icon: IconName; label: string };
};

export function ResultCard({
  result,
  saved,
  onToggleSave,
  onBookPress,
}: {
  result: SearchResult;
  saved: boolean;
  onToggleSave: () => void;
  onBookPress: () => void;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <View style={[styles.imageArea, { backgroundColor: theme.mapBlock }]}>
        <Icon name={{ sf: 'car.fill', md: 'directions-car' }} size={36} color={theme.textSecondary} />

        <View style={[styles.verifiedBadge, { backgroundColor: theme.accentMuted }]}>
          <Icon name={{ sf: 'checkmark', md: 'check' }} size={11} color={theme.accent} />
          <ThemedText type="small" themeColor="accent" style={styles.verifiedLabel}>
            Verified
          </ThemedText>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={saved ? `Remove ${result.title} from saved` : `Save ${result.title}`}
          onPress={onToggleSave}
          style={[styles.saveButton, { backgroundColor: theme.background }]}>
          <Icon
            name={{ sf: saved ? 'heart.fill' : 'heart', md: saved ? 'favorite' : 'favorite-border' }}
            size={16}
            color={saved ? theme.accent : theme.text}
          />
        </Pressable>

        <View style={[styles.banner, { backgroundColor: 'rgba(0, 0, 0, 0.75)' }]}>
          <Icon name={result.banner.icon} size={11} color="#ffffff" />
          <ThemedText type="small" style={styles.bannerLabel}>
            {result.banner.label}
          </ThemedText>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <ThemedText type="default" style={styles.title} numberOfLines={1}>
            {result.title}
          </ThemedText>
          <View style={styles.rating}>
            <Icon name={{ sf: 'star.fill', md: 'star' }} size={12} color={theme.text} />
            <ThemedText type="smallBold">{result.rating.toFixed(1)}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              ({result.reviewCount})
            </ThemedText>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Icon name={{ sf: 'figure.walk', md: 'directions-walk' }} size={13} color={theme.textSecondary} />
          <ThemedText type="small" themeColor="textSecondary">
            {result.distanceMeters} m • {result.walkMinutes} min walk
          </ThemedText>
        </View>

        <View style={styles.tagRow}>
          {result.tags.map((tag) => (
            <Pill key={tag} tone="backgroundSelected">
              <ThemedText type="small">{tag}</ThemedText>
            </Pill>
          ))}
          {result.highlightedTag && (
            <Pill tone="accentMuted">
              <ThemedText type="small" themeColor="accent" style={styles.highlightedTagLabel}>
                {result.highlightedTag}
              </ThemedText>
            </Pill>
          )}
        </View>

        <View style={styles.footer}>
          <View>
            <ThemedText type="smallBold">
              {result.pricePerHour}
              <ThemedText type="small" themeColor="textSecondary">
                /hr
              </ThemedText>
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {result.pricePerDay}/day
            </ThemedText>
          </View>
          <Button title="Book" size="sm" onPress={onBookPress} style={styles.bookButton} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  imageArea: {
    position: 'relative',
    aspectRatio: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    top: Spacing.two,
    left: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.full,
  },
  verifiedLabel: {
    fontWeight: 700,
  },
  saveButton: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    width: 30,
    height: 30,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    position: 'absolute',
    left: Spacing.two,
    bottom: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.full,
  },
  bannerLabel: {
    color: '#ffffff',
    fontWeight: 700,
  },
  body: {
    padding: Spacing.three,
    gap: Spacing.one,
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
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.one,
    marginTop: Spacing.half,
  },
  highlightedTagLabel: {
    fontWeight: 600,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
  bookButton: {
    paddingHorizontal: Spacing.five,
  },
});
