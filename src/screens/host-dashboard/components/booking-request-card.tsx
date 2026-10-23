import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type BookingRequest = {
  id: string;
  renterName: string;
  rating: number;
  vehicle: string;
  earnAmount: number;
  spotLabel: string;
  timeLabel: string;
};

export function BookingRequestCard({
  request,
  onAccept,
  onDecline,
}: {
  request: BookingRequest;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <View style={styles.topRow}>
        <View style={styles.who}>
          <ThemedText type="defaultBold" numberOfLines={1}>
            {request.renterName}
          </ThemedText>
          <View style={styles.inline}>
            <Icon name={{ sf: 'star.fill', md: 'star' }} size={12} color={theme.textSecondary} />
            <ThemedText type="small" themeColor="textSecondary" numberOfLines={1} style={styles.shrink}>
              {request.rating.toFixed(1)} · {request.vehicle}
            </ThemedText>
          </View>
        </View>
        <ThemedText type="statValue">₹{request.earnAmount}</ThemedText>
      </View>

      <View style={styles.details}>
        <ThemedText type="small" numberOfLines={1}>
          {request.timeLabel}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {request.spotLabel}
        </ThemedText>
      </View>

      <View style={styles.actions}>
        <Button title="Decline" variant="tonal" size="sm" onPress={onDecline} style={styles.action} />
        <Button title="Accept" size="sm" onPress={onAccept} style={styles.action} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    gap: Spacing.three,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  who: {
    flex: 1,
    gap: Spacing.half,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  shrink: {
    flexShrink: 1,
  },
  details: {
    gap: Spacing.half,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  action: {
    flex: 1,
  },
});
