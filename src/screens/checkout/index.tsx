import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { FlowHeader } from '@/components/flow-header';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { FareLine, FareSummary } from './components/fare-summary';
import { PaymentMethod, PaymentSection } from './components/payment-section';
import { ScheduleSection } from './components/schedule-section';
import { SpotSummaryCard } from './components/spot-summary-card';
import { TrustNotes } from './components/trust-notes';

const ENTRY_HOUR_24 = 14; // 2:00 PM
const BASE_DURATION = 3;
const EV_CHARGE_FEE = 45;
const PROTECTION_COVER = 15;
const CREDITS_MAX_APPLY = 50;
const CREDITS_AVAILABLE = 150;

function formatHour12(hour24: number) {
  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = ((hour24 + 11) % 12) + 1;
  return `${hour12}:00 ${period}`;
}

export function Checkout() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { spotTitle, pricePerHour } = useLocalSearchParams<{
    spotTitle?: string;
    pricePerHour?: string;
  }>();

  const title = spotTitle || 'Prestige Stilt Bay 5A';
  const hourlyRate = Number(pricePerHour) || 40;

  const [duration, setDuration] = useState(BASE_DURATION);
  const [evCharging, setEvCharging] = useState(true);
  const [useCredits, setUseCredits] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState<string | null>(null);

  const exitLabel = formatHour12(ENTRY_HOUR_24 + duration);

  const baseParking = hourlyRate * duration;
  const evFee = evCharging ? EV_CHARGE_FEE : 0;
  const subtotal = baseParking + PROTECTION_COVER + evFee;
  const creditsApplied = useCredits ? Math.min(CREDITS_MAX_APPLY, CREDITS_AVAILABLE, subtotal) : 0;
  const total = subtotal - creditsApplied;

  const fareLines: FareLine[] = [
    { label: `Base parking (₹${hourlyRate}/hr × ${duration} hrs)`, amount: baseParking },
    { label: 'Khaali Space Protection Cover', amount: PROTECTION_COVER },
  ];
  if (evCharging) {
    fareLines.push({ label: 'EV Wallbox Fast Charger', amount: EV_CHARGE_FEE });
  }
  if (creditsApplied > 0) {
    fareLines.push({ label: 'Khaali Credits applied', amount: -creditsApplied });
  }

  function handleExtend(hours: number) {
    setDuration((prev) => Math.min(prev + hours, 12));
  }

  function handleResetDuration() {
    setDuration(BASE_DURATION);
  }

  function handleChangeVehicle() {
    // TODO: no vehicle-management screen yet to change to.
  }

  function handleVerifyUpi() {
    // TODO: no backend to verify a UPI ID against yet.
  }

  function handlePayAndReserve() {
    // TODO: no payment backend yet — see docs/gaps.md.
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
        <FlowHeader title="Checkout Flow" onBack={() => router.back()} right={<Avatar size={36} />} />

        <SpotSummaryCard
          title={title}
          bay="Bay 5A"
          typeLabel="Stilt Covered"
          address="5th Block, Koramangala (Opposite Blue Tokai)"
        />

        <ScheduleSection
          dateLabel="Today (Wed, 24 Oct)"
          entryLabel={formatHour12(ENTRY_HOUR_24)}
          durationHours={duration}
          exitLabel={exitLabel}
          onExtend={handleExtend}
          onReset={handleResetDuration}
          canReset={duration !== BASE_DURATION}
          vehiclePlate="KA 01 MJ 8821"
          vehicleType="SUV"
          vehicleModel="Tata Nexon EV • Glacier White"
          onChangeVehicle={handleChangeVehicle}
          evCharging={evCharging}
          onToggleEvCharging={setEvCharging}
        />

        <PaymentSection
          useCredits={useCredits}
          onToggleCredits={setUseCredits}
          creditsAvailable={CREDITS_AVAILABLE}
          creditsApplied={creditsApplied}
          method={method}
          onSelectMethod={setMethod}
          upiId={upiId}
          onChangeUpiId={setUpiId}
          onVerifyUpi={handleVerifyUpi}
          selectedUpiApp={selectedUpiApp}
          onSelectUpiApp={setSelectedUpiApp}
        />

        <FareSummary lines={fareLines} total={total} />

        <TrustNotes cancelByLabel="01:45 PM" />
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
        <View>
          <ThemedText type="statValue">
            ₹{total}
            <ThemedText type="small" themeColor="textSecondary">
              {' '}
              / {duration} hrs
            </ThemedText>
          </ThemedText>
          <View style={styles.guaranteedRow}>
            <Icon name={{ sf: 'mappin.circle.fill', md: 'place' }} size={12} color={theme.accent} />
            <ThemedText type="small" themeColor="accent">
              Guaranteed Bay 5A
            </ThemedText>
          </View>
        </View>

        <Button
          title={`Pay & Reserve • ₹${total}`}
          onPress={handlePayAndReserve}
          style={styles.payButton}
        />
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: 1,
  },
  guaranteedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  payButton: {
    flexShrink: 1,
  },
});
