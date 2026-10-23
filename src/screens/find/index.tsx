import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { SearchBar } from '@/components/search-bar';
import { ChipOption, SelectChips } from '@/components/select-chips';
import { TabHeader } from '@/components/tab-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

import { MapPin, SearchMap } from './components/search-map';
import { Spot, SpotCard } from './components/spot-card';

type Duration = 'hourly' | 'daily' | 'monthly';

const DURATION_OPTIONS: ChipOption<Duration>[] = [
  { id: 'hourly', label: 'Hourly' },
  { id: 'daily', label: 'Daily' },
  { id: 'monthly', label: 'Monthly' },
];

const UNIT: Record<Duration, string> = { hourly: '/hr', daily: '/day', monthly: '/mo' };

const SPOTS: Spot[] = [
  {
    id: '1',
    title: 'Covered parking, 5th Block',
    prices: { hourly: 40, daily: 150, monthly: 2500 },
    distanceMeters: 320,
    walkMinutes: 4,
    rating: 4.8,
    tags: ['Covered', 'CCTV'],
  },
  {
    id: '2',
    title: 'Prestige Stilt Bay B2',
    prices: { hourly: 35, daily: 140, monthly: 2200 },
    distanceMeters: 180,
    walkMinutes: 2,
    rating: 4.9,
    tags: ['Gated', 'Guard'],
  },
  {
    id: '3',
    title: 'Villa Green Driveway',
    prices: { hourly: 30, daily: 120, monthly: 2000 },
    distanceMeters: 450,
    walkMinutes: 6,
    rating: 4.7,
    tags: ['CCTV', '24×7'],
  },
];

const PIN_POSITIONS: Pick<MapPin, 'top' | 'left'>[] = [
  { top: '18%', left: '46%' },
  { top: '34%', left: '70%' },
];

export function Find() {
  const router = useRouter();
  const [duration, setDuration] = useState<Duration>('hourly');

  const priceLabel = (spot: Spot) => `₹${spot.prices[duration].toLocaleString('en-IN')}${UNIT[duration]}`;
  const pins: MapPin[] = SPOTS.slice(1).map((spot, i) => ({
    id: spot.id,
    price: priceLabel(spot),
    ...PIN_POSITIONS[i],
  }));

  return (
    <ThemedView style={styles.screen}>
      <TabHeader />

      <View style={styles.fixedHeader}>
        <SearchBar value="" editable={false} onPress={() => router.push('/search-location')} />
        <SelectChips options={DURATION_OPTIONS} selected={duration} onSelect={setDuration} />
      </View>

      <ScrollView
        style={styles.screen}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <SearchMap pins={pins} featured={priceLabel(SPOTS[0])} />

        <ThemedText type="defaultBold">
          {SPOTS.length} spots{' '}
          <ThemedText type="default" themeColor="textSecondary">
            near Koramangala
          </ThemedText>
        </ThemedText>

        <View style={styles.list}>
          {SPOTS.map((spot) => (
            <SpotCard key={spot.id} spot={spot} price={spot.prices[duration]} unit={UNIT[duration]} />
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
    paddingTop: Spacing.three,
    gap: Spacing.three,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.four,
    gap: Spacing.three,
  },
  list: {
    gap: Spacing.three,
  },
});
