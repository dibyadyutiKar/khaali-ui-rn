import { StyleSheet, View } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function TrustNote({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <Icon name={icon} size={16} color={theme.accent} />
      <View style={styles.text}>
        <ThemedText type="default" style={styles.title}>
          {title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={styles.body}>
          {body}
        </ThemedText>
      </View>
    </View>
  );
}

export function TrustNotes({ cancelByLabel }: { cancelByLabel: string }) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.accentMuted }]}>
      <TrustNote
        icon={{ sf: 'checkmark.seal.fill', md: 'event-available' }}
        title="Free cancellation"
        body={`Cancel free up to 15 mins before arrival (until ${cancelByLabel}). Instant full refund.`}
      />
      <TrustNote
        icon={{ sf: 'shield.fill', md: 'verified-user' }}
        title="Khaali Space Guarantee"
        body="Dedicated bay physically guaranteed by host or receive an immediate 100% refund + ₹100 rebooking credit."
      />
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
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontWeight: 700,
  },
  body: {
    lineHeight: 18,
  },
});
