import { StyleSheet, View } from 'react-native';

import { Dot } from '@/components/dot';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function SpotSummaryCard({
  title,
  bay,
  typeLabel,
  address,
}: {
  title: string;
  bay: string;
  typeLabel: string;
  address: string;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.infoMuted }]}>
      <View style={styles.topRow}>
        <View style={styles.statusRow}>
          <Dot color={theme.accent} size={6} />
          <ThemedText type="small" style={styles.statusLabel}>
            {typeLabel}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            • {bay}
          </ThemedText>
        </View>

        <View style={[styles.icon, { backgroundColor: theme.text }]}>
          <ThemedText type="smallBold" style={{ color: theme.background }}>
            P
          </ThemedText>
        </View>
      </View>

      <ThemedText type="default" style={styles.title}>
        {title}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {address}
      </ThemedText>

      <View style={styles.hostRow}>
        <View style={styles.hostLeft}>
          <Icon name={{ sf: 'lock.shield', md: 'security' }} size={13} color={theme.textSecondary} />
          <ThemedText type="small" themeColor="textSecondary">
            Access code via gate guard
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="accent" style={styles.verifiedLabel}>
          Verified Host
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    gap: Spacing.half,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  statusLabel: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 700,
    marginTop: Spacing.one,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
  hostLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  verifiedLabel: {
    fontWeight: 700,
  },
});
