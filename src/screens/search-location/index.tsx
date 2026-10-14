import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Dot } from '@/components/dot';
import { Header } from '@/components/header';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { CurrentLocationCard } from './components/current-location-card';
import { LocationRow } from './components/location-row';

const SAVED_PLACES = [
  {
    id: 'home',
    icon: { sf: 'house.fill', md: 'home' },
    title: 'Home',
    meta: '1.4 km',
    subtitle: 'Prestige Acropolis, Koramangala 3rd Block',
  },
  {
    id: 'work',
    icon: { sf: 'briefcase.fill', md: 'work' },
    title: 'Work',
    meta: '6.8 km',
    subtitle: 'Bagmane Tech Park, CV Raman Nagar',
  },
] as const;

const INITIAL_RECENT_SEARCHES = [
  {
    id: '1',
    title: 'Forum Mall, Koramangala',
    badge: '12 spots left',
    subtitle: 'Hosur Rd, Chikku Lakshmaiah Layout',
  },
  {
    id: '2',
    title: 'Sony World Signal',
    badge: '₹40/hr',
    subtitle: '80 Feet Rd, 6th Block, Koramangala',
  },
  {
    id: '3',
    title: 'Indiranagar 100 Feet Road',
    badge: 'EV Fast',
    subtitle: 'Near 12th Main Junction, Indiranagar',
  },
  {
    id: '4',
    title: 'HSR Layout Sector 4',
    badge: 'Valet avail.',
    subtitle: 'Near BDA Complex, 27th Main',
  },
];

export function SearchLocation() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES);

  function handleVoicePress() {
    // TODO: wire voice search once a speech-to-text provider is chosen.
  }

  function handleUseCurrentLocation() {
    // TODO: "Koramangala 4th Block" is the hardcoded detectedLabel below, not a real GPS fix —
    // needs expo-location + a reverse-geocoding API. The navigation itself is real.
    router.push({ pathname: '/search-results', params: { location: 'Koramangala 4th Block' } });
  }

  function handleAddPlace() {
    // TODO: build a "save this place" flow once there's a real address to save.
  }

  function handleSelectPlace(name: string) {
    router.push({ pathname: '/search-results', params: { location: name } });
  }

  function handleClearAllRecents() {
    setRecentSearches([]);
  }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Platform.OS === 'android' ? insets.top + Spacing.three : Spacing.three,
            paddingBottom: insets.bottom + Spacing.four,
          },
        ]}>
        <Header onBack={() => router.back()} />

        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          onVoicePress={handleVoicePress}
          placeholder="Search for area, landmark..."
        />

        <CurrentLocationCard
          detectedLabel="Koramangala 4th Block, Bengaluru"
          onPress={handleUseCurrentLocation}
        />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="label" themeColor="textSecondary">
              Saved places
            </ThemedText>
            <Pressable accessibilityRole="button" accessibilityLabel="Add new place" onPress={handleAddPlace}>
              <ThemedText type="small" themeColor="accent" style={styles.sectionAction}>
                + Add New
              </ThemedText>
            </Pressable>
          </View>

          {SAVED_PLACES.map((place) => (
            <LocationRow
              key={place.id}
              icon={place.icon}
              title={place.title}
              meta={place.meta}
              subtitle={place.subtitle}
              trailingIcon={{ sf: 'chevron.right', md: 'chevron-right' }}
              onPress={() => handleSelectPlace(place.title)}
            />
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="label" themeColor="textSecondary">
              Recent searches
            </ThemedText>
            {recentSearches.length > 0 && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Clear all recent searches"
                onPress={handleClearAllRecents}>
                <ThemedText type="small" themeColor="textSecondary" style={styles.sectionAction}>
                  Clear all
                </ThemedText>
              </Pressable>
            )}
          </View>

          {recentSearches.length === 0 ? (
            <ThemedText type="small" themeColor="textSecondary">
              No recent searches.
            </ThemedText>
          ) : (
            recentSearches.map((item) => (
              <LocationRow
                key={item.id}
                icon={{ sf: 'clock', md: 'schedule' }}
                title={item.title}
                badge={item.badge}
                subtitle={item.subtitle}
                trailingIcon={{ sf: 'arrow.up.right', md: 'north-east' }}
                onPress={() => handleSelectPlace(item.title)}
              />
            ))
          )}
        </View>

        <View style={[styles.banner, { backgroundColor: theme.infoMuted }]}>
          <View style={styles.bannerLeft}>
            <Dot color={theme.accent} size={8} />
            <ThemedText type="small" style={styles.bannerText}>
              340+ verified spaces active in Koramangala
            </ThemedText>
          </View>
          <ThemedText type="label" themeColor="accent" style={styles.bannerDemand}>
            High demand
          </ThemedText>
        </View>
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
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.three,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionAction: {
    fontWeight: 600,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  bannerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  bannerText: {
    flex: 1,
    fontWeight: 600,
  },
  bannerDemand: {
    textAlign: 'right',
  },
});
