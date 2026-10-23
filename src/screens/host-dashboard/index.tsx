import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { TabHeader } from '@/components/tab-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { BookingRequest, BookingRequestCard } from './components/booking-request-card';
import { EarningsCard } from './components/earnings-card';
import { HostListing, HostListingCard } from './components/host-listing-card';
import { DashboardStat, StatTiles } from './components/stat-tiles';

const STATS: DashboardStat[] = [
  { id: 'bookings', label: 'Bookings this week', value: '14', deltaLabel: '+3' },
  { id: 'occupancy', label: 'Avg occupancy', value: '62%' },
];

const WEEKLY_EARNINGS = [3, 5, 4, 7, 6, 9, 8, 11];

const INITIAL_REQUESTS: BookingRequest[] = [
  {
    id: '1',
    renterName: 'Rahul Verma',
    rating: 4.9,
    vehicle: 'Creta · KA 01 MJ 4219',
    earnAmount: 160,
    spotLabel: 'Prestige Pine Wood · Slot B2',
    timeLabel: 'Today, 3–7 PM (4 hrs)',
  },
  {
    id: '2',
    renterName: 'Ananya Sen',
    rating: 5.0,
    vehicle: 'Nexon EV · KA 05 NB 8821',
    earnAmount: 270,
    spotLabel: 'Villa Green Gate · Driveway',
    timeLabel: 'Tomorrow, 9 AM–6 PM (9 hrs)',
  },
];

const INITIAL_LISTINGS: HostListing[] = [
  {
    id: '1',
    title: 'Prestige Stilt Bay 5A',
    address: '5th Block, Koramangala',
    rateLabel: '₹40/hr · ₹2,500/mo',
    live: true,
  },
  {
    id: '2',
    title: 'Villa Green Driveway',
    address: 'Indiranagar 100ft Road',
    rateLabel: '₹30/hr · ₹2,000/mo',
    live: true,
  },
];

export function HostDashboard() {
  const router = useRouter();
  const theme = useTheme();

  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [listings, setListings] = useState(INITIAL_LISTINGS);

  function resolveRequest(id: string) {
    // TODO: confirm/decline against a reservations endpoint once it exists — see docs/gaps.md.
    setRequests((prev) => prev.filter((request) => request.id !== id));
  }

  function handleToggleListingLive(id: string, live: boolean) {
    setListings((prev) => prev.map((listing) => (listing.id === id ? { ...listing, live } : listing)));
  }

  return (
    <ThemedView style={styles.screen}>
      <TabHeader />

      <ScrollView
        style={styles.screen}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.titleRow}>
          <ThemedText type="headline">Dashboard</ThemedText>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.replace('/find')}
            hitSlop={Spacing.two}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
            <ThemedText type="smallBold" style={styles.link}>
              Switch to renting
            </ThemedText>
          </Pressable>
        </View>

        <EarningsCard
          amount="₹8,400"
          deltaLabel="+18% vs last month"
          payoutLabel="Next payout ₹3,120 on Monday"
          weeklyValues={WEEKLY_EARNINGS}
        />

        <StatTiles stats={STATS} />

        <View style={styles.section}>
          <ThemedText type="defaultBold">Booking requests</ThemedText>
          {requests.length > 0 ? (
            requests.map((request) => (
              <BookingRequestCard
                key={request.id}
                request={request}
                onAccept={() => resolveRequest(request.id)}
                onDecline={() => resolveRequest(request.id)}
              />
            ))
          ) : (
            <View style={[styles.empty, { backgroundColor: theme.backgroundElement }]}>
              <ThemedText type="small" themeColor="textSecondary">
                You&apos;re all caught up.
              </ThemedText>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="defaultBold">Your listings</ThemedText>
            <Button
              title="Add"
              variant="secondary"
              size="sm"
              icon={{ sf: 'plus', md: 'add' }}
              onPress={() => router.push('/list-spot/location')}
            />
          </View>
          {listings.map((listing) => (
            <HostListingCard
              key={listing.id}
              listing={listing}
              onToggleLive={(live) => handleToggleListingLive(listing.id, live)}
            />
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
  content: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.five,
    gap: Spacing.four,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  link: {
    textDecorationLine: 'underline',
  },
  section: {
    gap: Spacing.two,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  empty: {
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    alignItems: 'center',
  },
});
