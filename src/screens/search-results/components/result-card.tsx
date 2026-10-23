import { Pressable, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
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
  pricePerHour: number;
  pricePerDay: number;
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
      <View style={[styles.imageArea, { backgroundColor: theme.backgroundSelected }]}>
        <Icon name={{ sf: 'car.fill', md: 'directions-car' }} size={32} color={theme.textSecondary} />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={saved ? `Remove ${result.title} from saved` : `Save ${result.title}`}
          accessibilityState={{ selected: saved }}
          onPress={onToggleSave}
          hitSlop={Spacing.one}
          style={({ pressed }) => [
            styles.saveButton,
            { backgroundColor: theme.background, opacity: pressed ? 0.7 : 1 },
          ]}>
          <Icon
            name={{ sf: saved ? 'heart.fill' : 'heart', md: saved ? 'favorite' : 'favorite-border' }}
            size={18}
            color={theme.text}
          />
        </Pressable>
      </View>

      <View style={styles.body}>
        <ThemedText type="defaultBold" numberOfLines={1}>
          {result.title}
        </ThemedText>

        <View style={styles.metaRow}>
          <Icon name={{ sf: 'star.fill', md: 'star' }} size={12} color={theme.text} />
          <ThemedText type="smallBold">{result.rating.toFixed(1)}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1} style={styles.shrink}>
            ({result.reviewCount}) · {result.distanceMeters} m · {result.walkMinutes} min walk
          </ThemedText>
        </View>

        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {result.tags.slice(0, 3).join(' · ')}
        </ThemedText>

        <View style={styles.footer}>
          <View>
            <ThemedText type="statValue">
              ₹{result.pricePerHour}
              <ThemedText type="small" themeColor="textSecondary">
                {' '}
                /hr
              </ThemedText>
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              ₹{result.pricePerDay}/day
            </ThemedText>
          </View>
          <Button title="Book" size="sm" onPress={onBookPress} />
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
    aspectRatio: 2.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    position: 'absolute',
    top: Spacing.two,
    right: Spacing.two,
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: Spacing.three,
    gap: Spacing.one,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  shrink: {
    flexShrink: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
});
