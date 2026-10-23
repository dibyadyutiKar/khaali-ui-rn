import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/header';
import { IconName } from '@/components/icon';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

import { LocationRow } from './components/location-row';

type Place = { id: string; title: string; subtitle: string };

const SAVED_PLACES: (Place & { icon: IconName })[] = [
  {
    id: 'home',
    icon: { sf: 'house.fill', md: 'home' },
    title: 'Home',
    subtitle: 'Prestige Acropolis, Koramangala 3rd Block',
  },
  {
    id: 'work',
    icon: { sf: 'briefcase.fill', md: 'work' },
    title: 'Work',
    subtitle: 'Bagmane Tech Park, CV Raman Nagar',
  },
];

const INITIAL_RECENT_SEARCHES: Place[] = [
  { id: '1', title: 'Forum Mall, Koramangala', subtitle: 'Hosur Rd, Chikku Lakshmaiah Layout' },
  { id: '2', title: 'Sony World Signal', subtitle: '80 Feet Rd, 6th Block, Koramangala' },
  { id: '3', title: 'Indiranagar 100 Feet Road', subtitle: 'Near 12th Main Junction, Indiranagar' },
  { id: '4', title: 'HSR Layout Sector 4', subtitle: 'Near BDA Complex, 27th Main' },
];

function matches(place: Place, query: string) {
  const q = query.trim().toLowerCase();
  return !q || `${place.title} ${place.subtitle}`.toLowerCase().includes(q);
}

export function SearchLocation() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES);

  const savedResults = SAVED_PLACES.filter((place) => matches(place, query));
  const recentResults = recentSearches.filter((place) => matches(place, query));

  function handleSelectPlace(name: string) {
    router.push({ pathname: '/search-results', params: { location: name } });
  }

  function handleSubmit() {
    const name = query.trim();
    if (name) handleSelectPlace(name);
  }

  function handleUseCurrentLocation() {
    // TODO: the detected area is hardcoded, not a real GPS fix — needs expo-location +
    // reverse geocoding. The navigation itself is real.
    handleSelectPlace('Koramangala 4th Block');
  }

  return (
    <ThemedView style={styles.screen}>
      <ScrollView
        style={styles.screen}
        contentInsetAdjustmentBehavior="automatic"
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Platform.OS === 'android' ? insets.top + Spacing.three : Spacing.three,
            paddingBottom: Platform.OS === 'ios' ? Spacing.four : insets.bottom + Spacing.four,
          },
        ]}>
        <Header onBack={() => router.back()} />

        <SearchBar
          value={query}
          onChangeText={setQuery}
          onSubmit={handleSubmit}
          onClear={() => setQuery('')}
          autoFocus
          placeholder="Search area or landmark"
        />

        {!query.trim() && (
          <LocationRow
            icon={{ sf: 'location.fill', md: 'my-location' }}
            title="Use my current location"
            subtitle="Koramangala 4th Block, Bengaluru"
            emphasized
            onPress={handleUseCurrentLocation}
          />
        )}

        {savedResults.length > 0 && (
          <View style={styles.section}>
            <ThemedText type="label" themeColor="textSecondary">
              Saved
            </ThemedText>
            {savedResults.map((place) => (
              <LocationRow
                key={place.id}
                icon={place.icon}
                title={place.title}
                subtitle={place.subtitle}
                onPress={() => handleSelectPlace(place.title)}
              />
            ))}
          </View>
        )}

        {recentResults.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText type="label" themeColor="textSecondary">
                Recent
              </ThemedText>
              {!query.trim() && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Clear recent searches"
                  onPress={() => setRecentSearches([])}
                  hitSlop={Spacing.two}
                  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
                  <ThemedText type="smallBold" themeColor="textSecondary">
                    Clear
                  </ThemedText>
                </Pressable>
              )}
            </View>
            {recentResults.map((place) => (
              <LocationRow
                key={place.id}
                icon={{ sf: 'clock', md: 'schedule' }}
                title={place.title}
                subtitle={place.subtitle}
                onPress={() => handleSelectPlace(place.title)}
              />
            ))}
          </View>
        )}

        {query.trim() !== '' && (
          <LocationRow
            icon={{ sf: 'magnifyingglass', md: 'search' }}
            title={`Search “${query.trim()}”`}
            subtitle="See parking near this place"
            onPress={handleSubmit}
          />
        )}
      </ScrollView>
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
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
