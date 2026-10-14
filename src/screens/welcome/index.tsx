import { useRouter } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Dot } from '@/components/dot';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { MapPreview } from './components/map-preview';
import { StatItem } from './components/stat-item';

const STATS = [
  { value: '1,400+', label: 'Spaces in BLR' },
  { value: '100%', label: 'Gated & Safe' },
  { value: '2 Mins', label: 'Avg Booking' },
] as const;

export function Welcome() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  function handleContinuePress() {
    router.push('/verify');
  }

  function handleEarnPress() {
    // TODO: navigate to the host/list-your-space flow once it's built.
  }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Platform.OS === 'android' ? insets.top + Spacing.three : Spacing.three,
            paddingBottom: Platform.OS === 'ios' ? Spacing.four : insets.bottom + Spacing.four,
          },
        ]}>
        <View style={styles.statusRow}>
          <Pill>
            <Dot color={theme.accent} size={6} />
            <ThemedText type="small" style={styles.statusLabel}>
              Bengaluru Active
            </ThemedText>
          </Pill>
        </View>

        <MapPreview style={styles.map} />

        <Pill style={styles.hyperlocalPill}>
          <ThemedText type="label" themeColor="accent">
            ✓ Hyperlocal spaces
          </ThemedText>
        </Pill>

        <ThemedText type="headline">Parking, wherever you&apos;re going.</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          Book verified private parking by the hour, day or month.
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.statsRow}>
          {STATS.map((stat, index) => (
            <View key={stat.label} style={styles.statItemWrapper}>
              {index > 0 && (
                <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />
              )}
              <StatItem value={stat.value} label={stat.label} />
            </View>
          ))}
        </ThemedView>

        <Button title="Continue with phone number →" onPress={handleContinuePress} />

        <Pressable
          accessibilityRole="link"
          onPress={handleEarnPress}
          style={({ pressed }) => [styles.earnLink, { opacity: pressed ? 0.6 : 1 }]}>
          <ThemedText type="default" themeColor="accent" style={styles.earnLinkLabel}>
            Have a parking space? Earn from it →
          </ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusLabel: {
    fontWeight: 600,
  },
  map: {
    width: '100%',
  },
  hyperlocalPill: {
    marginTop: Spacing.one,
  },
  statsRow: {
    flexDirection: 'row',
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    paddingVertical: Spacing.three,
  },
  statItemWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    marginVertical: Spacing.half,
  },
  earnLink: {
    alignSelf: 'center',
  },
  earnLinkLabel: {
    fontWeight: 600,
    textAlign: 'center',
  },
});
