import { Host, Switch } from '@expo/ui';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { FlowHeader } from '@/components/flow-header';
import { FlowStepProgress } from '@/components/flow-step-progress';
import { Icon } from '@/components/icon';
import { MultiSelectChips } from '@/components/multi-select-chips';
import { ChipOption } from '@/components/select-chips';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { AvailabilityCard } from './components/availability-card';
import { RateField } from './components/rate-field';
import { SpaceType, SpaceTypeGrid } from './components/space-type-grid';
import { SpotCountCard } from './components/spot-count-card';

const SPACE_TYPES: SpaceType[] = [
  { id: 'open', icon: { sf: 'sun.max.fill', md: 'wb-sunny' }, label: 'Open' },
  { id: 'covered', icon: { sf: 'house.fill', md: 'home' }, label: 'Covered' },
  { id: 'basement', icon: { sf: 'car.fill', md: 'garage' }, label: 'Basement' },
  { id: 'stilt', icon: { sf: 'building.columns.fill', md: 'account-balance' }, label: 'Stilt' },
];

const VEHICLE_TYPES: ChipOption[] = [
  { id: 'two-wheeler', label: '2-Wheeler', icon: { sf: 'scooter', md: 'two-wheeler' } },
  { id: 'hatchback', label: 'Hatchback', icon: { sf: 'car.fill', md: 'directions-car' } },
  { id: 'sedan', label: 'Sedan', icon: { sf: 'car.fill', md: 'directions-car' } },
  { id: 'suv', label: 'SUV', icon: { sf: 'car.fill', md: 'directions-car' } },
];

const AMENITIES: ChipOption[] = [
  { id: 'security-guard', label: 'Security guard', icon: { sf: 'shield.fill', md: 'security' } },
  { id: 'ev-charging', label: 'EV charging', icon: { sf: 'bolt.fill', md: 'bolt' } },
  { id: 'lift-access', label: 'Lift access', icon: { sf: 'arrow.up.arrow.down', md: 'elevator' } },
];

export function ListSpotDetails() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [spaceType, setSpaceType] = useState('covered');
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [spotCount, setSpotCount] = useState(1);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [activeDays, setActiveDays] = useState<string[]>(['mon', 'tue', 'wed', 'thu', 'fri']);
  const [fromTime, setFromTime] = useState('9:00 AM');
  const [toTime, setToTime] = useState('7:00 PM');
  const [alwaysOpen, setAlwaysOpen] = useState(false);
  const [perHour, setPerHour] = useState('40');
  const [perDay, setPerDay] = useState('150');
  const [perMonth, setPerMonth] = useState('2500');
  const [instantBook, setInstantBook] = useState(true);

  const canContinue = vehicleTypes.length > 0 && perHour.length > 0;

  function toggleFromList(list: string[], id: string, setList: (next: string[]) => void) {
    setList(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  }

  function handleContinue() {
    if (!canContinue) return;
    // TODO: step 3 (review/submit) doesn't exist yet — see docs/gaps.md.
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
          { paddingTop: Platform.OS === 'android' ? insets.top + Spacing.three : Spacing.three },
        ]}>
        <FlowHeader title="New Spot Listing Flow" onBack={() => router.back()} />

        <FlowStepProgress step={2} totalSteps={3} label="Space & Pricing" />

        <ThemedText type="headline">Space details &amp; pricing</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          Set spot specifications, working hours, and competitive local rates.
        </ThemedText>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="default" style={styles.sectionTitle}>
              Space type
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Required
            </ThemedText>
          </View>
          <SpaceTypeGrid options={SPACE_TYPES} selected={spaceType} onSelect={setSpaceType} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="default" style={styles.sectionTitle}>
              Fits vehicle types
            </ThemedText>
            <ThemedText type="small" themeColor="accent" style={styles.sectionHint}>
              Multiple selectable
            </ThemedText>
          </View>
          <MultiSelectChips
            options={VEHICLE_TYPES}
            selected={vehicleTypes}
            onToggle={(id) => toggleFromList(vehicleTypes, id, setVehicleTypes)}
          />
        </View>

        <SpotCountCard count={spotCount} onChange={setSpotCount} />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="default" style={styles.sectionTitle}>
              Amenities &amp; security
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Optional
            </ThemedText>
          </View>
          <MultiSelectChips
            options={AMENITIES}
            selected={amenities}
            onToggle={(id) => toggleFromList(amenities, id, setAmenities)}
          />
        </View>

        <AvailabilityCard
          activeDays={activeDays}
          onToggleDay={(id) => toggleFromList(activeDays, id, setActiveDays)}
          fromTime={fromTime}
          onChangeFromTime={setFromTime}
          toTime={toTime}
          onChangeToTime={setToTime}
          alwaysOpen={alwaysOpen}
          onToggleAlwaysOpen={setAlwaysOpen}
        />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="default" style={styles.sectionTitle}>
              Set your rates
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              ₹ INR
            </ThemedText>
          </View>

          <RateField
            label="Per hour"
            value={perHour}
            onChangeText={setPerHour}
            hint="Similar spots nearby earn ₹40/hr"
            hintIcon={{ sf: 'arrow.up.right', md: 'trending-up' }}
          />
          <RateField label="Per day" value={perDay} onChangeText={setPerDay} />
          <View style={styles.neutralHint}>
            <Icon name={{ sf: 'info.circle', md: 'info' }} size={11} color={theme.textSecondary} />
            <ThemedText type="small" themeColor="textSecondary">
              Recommended daily cap
            </ThemedText>
          </View>
          <RateField
            label="Per month"
            value={perMonth}
            onChangeText={setPerMonth}
            hint="Similar spots nearby earn ₹2,500/month"
            hintIcon={{ sf: 'checkmark.circle.fill', md: 'check-circle' }}
          />
        </View>

        <View style={[styles.instantBookCard, { backgroundColor: theme.backgroundElement }]}>
          <View style={styles.instantBookHeader}>
            <Icon name={{ sf: 'bolt.fill', md: 'bolt' }} size={16} color={theme.text} />
            <ThemedText type="default" style={styles.instantBookTitle}>
              Instant book
            </ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.instantBookBody}>
            Verified drivers can reserve instantly without your manual approval.
          </ThemedText>
          <Host matchContents style={styles.instantBookSwitch}>
            <Switch value={instantBook} onValueChange={setInstantBook} />
          </Host>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: theme.background,
            borderTopColor: theme.backgroundSelected,
            paddingBottom: insets.bottom + Spacing.three,
          },
        ]}>
        <Button title="Continue →" disabled={!canContinue} onPress={handleContinue} />
      </View>
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
    paddingBottom: Spacing.four,
    gap: Spacing.three,
  },
  section: {
    gap: Spacing.two,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontWeight: 700,
  },
  sectionHint: {
    fontWeight: 700,
  },
  neutralHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
    marginTop: -Spacing.one,
  },
  instantBookCard: {
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    gap: Spacing.one,
  },
  instantBookHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  instantBookTitle: {
    fontWeight: 700,
  },
  instantBookBody: {
    lineHeight: 18,
  },
  instantBookSwitch: {
    position: 'absolute',
    top: Spacing.three,
    right: Spacing.three,
  },
  footer: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
  },
});
