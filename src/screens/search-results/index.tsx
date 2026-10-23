import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Header } from '@/components/header';
import { ChipOption, SelectChips } from '@/components/select-chips';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

import { ResultCard, SearchResult } from './components/result-card';

type SortOption = 'nearest' | 'cheapest' | 'top-rated';

const SORT_OPTIONS: ChipOption<SortOption>[] = [
  { id: 'nearest', label: 'Nearest' },
  { id: 'cheapest', label: 'Cheapest' },
  { id: 'top-rated', label: 'Top rated' },
];

const COMPARE: Record<SortOption, (a: SearchResult, b: SearchResult) => number> = {
  nearest: (a, b) => a.distanceMeters - b.distanceMeters,
  cheapest: (a, b) => a.pricePerHour - b.pricePerHour,
  'top-rated': (a, b) => b.rating - a.rating,
};

const RESULTS: SearchResult[] = [
  {
    id: '1',
    title: 'Covered Parking, 5th Block',
    rating: 4.8,
    reviewCount: 62,
    distanceMeters: 180,
    walkMinutes: 2,
    tags: ['Covered', '24/7 CCTV', 'Fits SUV'],
    pricePerHour: 40,
    pricePerDay: 150,
  },
  {
    id: '2',
    title: 'Prestige Pine Wood Bay B2',
    rating: 4.9,
    reviewCount: 45,
    distanceMeters: 250,
    walkMinutes: 3,
    tags: ['Covered stilt', 'EV charging', 'Boom barrier'],
    pricePerHour: 35,
    pricePerDay: 140,
  },
  {
    id: '3',
    title: 'Villa Green Gate Driveway',
    rating: 4.7,
    reviewCount: 38,
    distanceMeters: 380,
    walkMinutes: 5,
    tags: ['Gated', 'CCTV', 'Instant book'],
    pricePerHour: 30,
    pricePerDay: 120,
  },
];

export function SearchResults() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { location } = useLocalSearchParams<{ location?: string }>();
  const locationName = location || 'Koramangala';

  const [sort, setSort] = useState<SortOption>('nearest');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const sorted = [...RESULTS].sort(COMPARE[sort]);

  function toggleSave(id: string) {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  function handleBookPress(result: SearchResult) {
    router.push({
      pathname: '/checkout',
      params: { spotTitle: result.title, pricePerHour: String(result.pricePerHour) },
    });
  }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        style={styles.screen}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Platform.OS === 'android' ? insets.top + Spacing.three : Spacing.three,
            paddingBottom: insets.bottom + Spacing.six + Spacing.four,
          },
        ]}>
        <Header onBack={() => router.back()} />

        <View style={styles.intro}>
          <ThemedText type="headline" numberOfLines={2}>
            {locationName}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {RESULTS.length} spots nearby
          </ThemedText>
        </View>

        <SelectChips options={SORT_OPTIONS} selected={sort} onSelect={setSort} />

        <View style={styles.list}>
          {sorted.map((result) => (
            <ResultCard
              key={result.id}
              result={result}
              saved={savedIds.includes(result.id)}
              onToggleSave={() => toggleSave(result.id)}
              onBookPress={() => handleBookPress(result)}
            />
          ))}
        </View>
      </ScrollView>

      <Button
        title="Map"
        size="sm"
        icon={{ sf: 'map.fill', md: 'map' }}
        onPress={() => router.dismissTo('/find')}
        style={[styles.mapButton, { bottom: insets.bottom + Spacing.three }]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    gap: Spacing.three,
  },
  intro: {
    gap: Spacing.half,
    marginTop: Spacing.one,
  },
  list: {
    gap: Spacing.three,
  },
  mapButton: {
    position: 'absolute',
    alignSelf: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
  },
});
