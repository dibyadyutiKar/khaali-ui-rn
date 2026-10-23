import { Host, Switch } from '@expo/ui';
import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type HostListing = {
  id: string;
  title: string;
  address: string;
  rateLabel: string;
  live: boolean;
};

export function HostListingCard({
  listing,
  onToggleLive,
}: {
  listing: HostListing;
  onToggleLive: (live: boolean) => void;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <View style={[styles.thumbnail, { backgroundColor: theme.backgroundSelected }]}>
        <Icon name={{ sf: 'car.fill', md: 'directions-car' }} size={22} color={theme.textSecondary} />
      </View>

      <View style={styles.body}>
        <ThemedText type="defaultBold" numberOfLines={1}>
          {listing.title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {listing.address}
        </ThemedText>
        <ThemedText type="smallBold" numberOfLines={1}>
          {listing.live ? listing.rateLabel : 'Paused'}
        </ThemedText>
      </View>

      <Host matchContents>
        <Switch value={listing.live} onValueChange={onToggleLive} />
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    gap: Spacing.three,
  },
  thumbnail: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    gap: Spacing.half,
  },
});
