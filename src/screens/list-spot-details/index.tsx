import { Host, Switch } from '@expo/ui';
import { useRouter } from 'expo-router';
import { ReactNode, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { FlowHeader } from '@/components/flow-header';
import { FlowStepProgress } from '@/components/flow-step-progress';
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
  { id: 'hatchback', label: 'Hatchback' },
  { id: 'sedan', label: 'Sedan' },
  { id: 'suv', label: 'SUV' },
];

const AMENITIES: ChipOption[] = [
  { id: 'security-guard', label: 'Security guard' },
  { id: 'cctv', label: 'CCTV' },
  { id: 'ev-charging', label: 'EV charging' },
  { id: 'lift-access', label: 'Lift access' },
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <ThemedText type="label" themeColor="textSecondary">
        {title}
      </ThemedText>
      {children}
    </View>
  );
}

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
    // TODO: step 3 (review/submit) doesn't exist yet — see docs/gaps.md.
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
          { paddingTop: Platform.OS === 'android' ? insets.top + Spacing.three : Spacing.three },
        ]}>
        <FlowHeader title="List your spot" onBack={() => router.back()} />

        <FlowStepProgress step={2} totalSteps={3} label="Details & pricing" />

        <ThemedText type="headline">Details &amp; pricing</ThemedText>

        <Section title="Space type">
          <SpaceTypeGrid options={SPACE_TYPES} selected={spaceType} onSelect={setSpaceType} />
        </Section>

        <Section title="Fits">
          <MultiSelectChips
            options={VEHICLE_TYPES}
            selected={vehicleTypes}
            onToggle={(id) => toggleFromList(vehicleTypes, id, setVehicleTypes)}
          />
        </Section>

        <SpotCountCard count={spotCount} onChange={setSpotCount} />

        <Section title="Amenities · optional">
          <MultiSelectChips
            options={AMENITIES}
            selected={amenities}
            onToggle={(id) => toggleFromList(amenities, id, setAmenities)}
          />
        </Section>

        <Section title="Availability">
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
        </Section>

        <Section title="Rates">
          <RateField label="Per hour" value={perHour} onChangeText={setPerHour} hint="Nearby: ₹40" />
          <RateField label="Per day" value={perDay} onChangeText={setPerDay} />
          <RateField label="Per month" value={perMonth} onChangeText={setPerMonth} hint="Nearby: ₹2,500" />
        </Section>

        <View style={[styles.toggleCard, { backgroundColor: theme.backgroundElement }]}>
          <View style={styles.toggleText}>
            <ThemedText type="defaultBold">Instant book</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Verified drivers can book without your approval.
            </ThemedText>
          </View>
          <Host matchContents>
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
        <Button title="Continue" disabled={!canContinue} onPress={handleContinue} />
      </View>
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
    paddingBottom: Spacing.four,
    gap: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  toggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  toggleText: {
    flex: 1,
    gap: Spacing.half,
  },
  footer: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
