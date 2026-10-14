import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Dot } from '@/components/dot';
import { Header } from '@/components/header';
import { Icon } from '@/components/icon';
import { Pill } from '@/components/pill';
import { ChipOption, SelectChips } from '@/components/select-chips';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { ResultCard, SearchResult } from './components/result-card';

type SortOption = 'nearest' | 'cheapest' | 'top-rated' | 'ev-charging';

const SORT_OPTIONS: ChipOption<SortOption>[] = [
  { id: 'nearest', label: 'Nearest', icon: { sf: 'checkmark', md: 'check' } },
  { id: 'cheapest', label: 'Cheapest' },
  { id: 'top-rated', label: 'Top rated', icon: { sf: 'star.fill', md: 'star' } },
  { id: 'ev-charging', label: 'EV Charging', icon: { sf: 'bolt.fill', md: 'bolt' } },
];

const RESULTS: SearchResult[] = [
  {
    id: '1',
    title: 'Covered Parking, 5th Block',
    rating: 4.8,
    reviewCount: 62,
    distanceMeters: 180,
    walkMinutes: 2,
    tags: ['Covered', '24/7 CCTV', 'Guard On-Site', 'Fits SUV'],
    pricePerHour: '₹40',
    pricePerDay: '₹150',
    banner: { icon: { sf: 'bolt.fill', md: 'bolt' }, label: 'Instant Entry via OTP' },
  },
  {
    id: '2',
    title: 'Prestige Pine Wood Bay B2',
    rating: 4.9,
    reviewCount: 45,
    distanceMeters: 250,
    walkMinutes: 3,
    tags: ['Covered Stilt', 'Boom Barrier'],
    highlightedTag: 'EV Charging',
    pricePerHour: '₹35',
    pricePerDay: '₹140',
    banner: { icon: { sf: 'bolt.fill', md: 'bolt' }, label: 'EV Ready' },
  },
  {
    id: '3',
    title: 'Villa Green Gate Driveway',
    rating: 4.7,
    reviewCount: 38,
    distanceMeters: 380,
    walkMinutes: 5,
    tags: ['Gated', 'CCTV', 'Instant Book'],
    pricePerHour: '₹30',
    pricePerDay: '₹120',
    banner: { icon: { sf: 'arrow.triangle.2.circlepath', md: 'autorenew' }, label: 'Easy Turnaround' },
  },
];

export function SearchResults() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { location } = useLocalSearchParams<{ location?: string }>();
  const locationName = location || 'Koramangala';

  const [sort, setSort] = useState<SortOption>('nearest');
  const [savedIds, setSavedIds] = useState<string[]>([]);

  function handleEditLocation() {
    router.back();
  }

  function toggleSave(id: string) {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  }

  function handleBookPress(result: SearchResult) {
    router.push({
      pathname: '/checkout',
      params: { spotTitle: result.title, pricePerHour: result.pricePerHour.replace('₹', '') },
    });
  }

  function handleShowMap() {
    router.push('/find');
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
            paddingBottom: insets.bottom + Spacing.six,
          },
        ]}>
        <Header onBack={() => router.back()} />

        <View style={styles.titleRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Edit location, currently ${locationName}`}
            onPress={handleEditLocation}
            style={styles.titleButton}>
            <ThemedText type="headline" numberOfLines={1} style={styles.title}>
              {locationName}
            </ThemedText>
            <Icon name={{ sf: 'pencil', md: 'edit' }} size={16} color={theme.textSecondary} />
          </Pressable>

          <Pill tone="accentMuted">
            <Dot color={theme.accent} size={6} />
            <ThemedText type="label" themeColor="accent">
              Live
            </ThemedText>
          </Pill>
        </View>

        <ThemedText type="small" themeColor="textSecondary">
          {RESULTS.length} verified spots nearby • Updated just now
        </ThemedText>

        <SelectChips options={SORT_OPTIONS} selected={sort} onSelect={setSort} />

        <View style={styles.list}>
          {RESULTS.map((result) => (
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

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Show results on map"
        onPress={handleShowMap}
        style={[styles.mapButton, { backgroundColor: theme.text, bottom: insets.bottom + Spacing.three }]}>
        <Icon name={{ sf: 'map.fill', md: 'map' }} size={16} color={theme.background as string} />
        <ThemedText type="default" style={{ color: theme.background, fontWeight: 600 }}>
          Map
        </ThemedText>
      </Pressable>
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
    gap: Spacing.two,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  titleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  title: {
    flexShrink: 1,
  },
  list: {
    gap: Spacing.three,
    marginTop: Spacing.one,
  },
  mapButton: {
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Radius.full,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
  },
});
