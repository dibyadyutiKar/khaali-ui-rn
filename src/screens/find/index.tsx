import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/icon';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { DurationFilter, FilterChips } from './components/filter-chips';
import { FindHeader } from './components/find-header';
import { SearchMap } from './components/search-map';
import { Spot, SpotCard } from './components/spot-card';

const SPOTS: Spot[] = [
  {
    id: '1',
    title: 'Covered parking, 5th Block',
    price: '₹40',
    distanceMeters: 320,
    walkMinutes: 4,
    rating: 4.8,
    status: { label: 'Verified', verified: true },
    tags: ['CCTV', 'Covered'],
  },
  {
    id: '2',
    title: 'Prestige Stilt Bay B2',
    price: '₹35',
    distanceMeters: 180,
    walkMinutes: 2,
    rating: 4.9,
    status: { label: 'Verified', verified: true },
    tags: ['Gated', 'Guard'],
  },
  {
    id: '3',
    title: 'Villa Green Driveway',
    price: '₹30',
    distanceMeters: 450,
    walkMinutes: 6,
    rating: 4.7,
    status: { label: 'Open', verified: false },
    tags: ['CCTV', '24x7'],
  },
];

export function Find() {
  const theme = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [duration, setDuration] = useState<DurationFilter>('now');

  function handleNotificationsPress() {
    // TODO: route to a notifications screen once that flow exists.
  }

  function handleSearchPress() {
    router.push('/search-location');
  }

  function handleVoicePress() {
    // TODO: wire voice search once a speech-to-text provider is chosen.
  }

  function handleLocatePress() {
    // TODO: needs a real map SDK before "center on my location" means anything —
    // see docs/gaps.md.
  }

  function handleSortFilterPress() {
    // TODO: build the sort/filter sheet once there's a real, larger result set to sort.
  }

  function handleSpotPress() {
    // TODO: route to a spot detail screen once it exists.
  }

  return (
    <ThemedView style={styles.screen}>
      <View
        style={[
          styles.fixedHeader,
          { paddingTop: Platform.OS === 'android' ? insets.top + Spacing.three : Spacing.three },
        ]}>
        <FindHeader onNotificationsPress={handleNotificationsPress} />
        <SearchBar
          value=""
          editable={false}
          onPress={handleSearchPress}
          onVoicePress={handleVoicePress}
        />
        <FilterChips selected={duration} onSelect={setDuration} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + Spacing.four },
        ]}>
        <SearchMap onLocatePress={handleLocatePress} />

        <View style={styles.listHeader}>
          <ThemedText type="default" style={styles.listHeaderLabel}>
            {SPOTS.length} spots{' '}
            <ThemedText type="default" themeColor="textSecondary">
              near Koramangala
            </ThemedText>
          </ThemedText>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sort and filter"
            onPress={handleSortFilterPress}
            style={({ pressed }) => [
              styles.sortButton,
              { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.7 : 1 },
            ]}>
            <Icon name={{ sf: 'slider.horizontal.3', md: 'tune' }} size={14} color={theme.text} />
            <ThemedText type="small" style={styles.sortLabel}>
              Sort & Filter
            </ThemedText>
          </Pressable>
        </View>

        <View style={styles.list}>
          {SPOTS.map((spot) => (
            <SpotCard key={spot.id} spot={spot} onPress={handleSpotPress} />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  fixedHeader: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  scroll: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    gap: Spacing.four,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listHeaderLabel: {
    fontWeight: 700,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.full,
  },
  sortLabel: {
    fontWeight: 600,
  },
  list: {
    gap: Spacing.four,
  },
});
