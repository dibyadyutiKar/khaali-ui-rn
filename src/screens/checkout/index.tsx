import { useLocalSearchParams, useRouter } from 'expo-router';
import { ReactNode, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { FlowHeader } from '@/components/flow-header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { FareLine, FareSummary } from './components/fare-summary';
import { PaymentMethod, PaymentSection, UpiApp } from './components/payment-section';
import { ScheduleSection } from './components/schedule-section';
import { SpotSummaryCard } from './components/spot-summary-card';

const ENTRY_HOUR_24 = 14; // 2:00 PM
const BASE_DURATION = 3;
const MIN_DURATION = 1;
const MAX_DURATION = 8;
const EV_CHARGE_FEE = 45;
const PROTECTION_COVER = 15;
const CREDITS_MAX_APPLY = 50;
const CREDITS_AVAILABLE = 150;

function formatHour12(hour24: number) {
  const period = hour24 % 24 >= 12 ? 'PM' : 'AM';
  const hour12 = ((hour24 + 11) % 12) + 1;
  return `${hour12}:00 ${period}`;
}

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
  const [evCharging, setEvCharging] = useState(false);
  const [useCredits, setUseCredits] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>('upi');
  const [upiApp, setUpiApp] = useState<UpiApp>('gpay');
  const [upiId, setUpiId] = useState('');

  const baseParking = hourlyRate * duration;
  const subtotal = baseParking + PROTECTION_COVER + (evCharging ? EV_CHARGE_FEE : 0);
  const creditsApplied = useCredits ? Math.min(CREDITS_MAX_APPLY, CREDITS_AVAILABLE, subtotal) : 0;
  const total = subtotal - creditsApplied;

  const fareLines: FareLine[] = [
    { label: `Parking (₹${hourlyRate} × ${duration} hrs)`, amount: baseParking },
    { label: 'Protection cover', amount: PROTECTION_COVER },
  ];
  if (evCharging) fareLines.push({ label: 'EV charging', amount: EV_CHARGE_FEE });
  if (creditsApplied > 0) fareLines.push({ label: 'Khaali credits', amount: -creditsApplied });

  const canPay = method !== 'upi' || upiApp !== 'upi-id' || upiId.includes('@');

  function handlePay() {
    // TODO: no payment backend yet — see docs/gaps.md.
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
        <FlowHeader title="Checkout" onBack={() => router.back()} />

        <SpotSummaryCard
          title={title}
          detail="Bay 5A · Covered stilt"
          address="5th Block, Koramangala"
        />

        <Section title="When">
          <ScheduleSection
            dateLabel="Today, 24 Oct"
            timeRangeLabel={`${formatHour12(ENTRY_HOUR_24)} – ${formatHour12(ENTRY_HOUR_24 + duration)}`}
            durationHours={duration}
            minHours={MIN_DURATION}
            maxHours={MAX_DURATION}
            onChangeDuration={setDuration}
            vehicleLabel="KA 01 MJ 8821 · Tata Nexon EV"
            evCharging={evCharging}
            evFee={EV_CHARGE_FEE}
            onToggleEvCharging={setEvCharging}
          />
        </Section>

        <Section title="Pay with">
          <PaymentSection
            method={method}
            onSelectMethod={setMethod}
            upiApp={upiApp}
            onSelectUpiApp={setUpiApp}
            upiId={upiId}
            onChangeUpiId={setUpiId}
            useCredits={useCredits}
            onToggleCredits={setUseCredits}
            creditsBalance={CREDITS_AVAILABLE}
            creditsMaxApply={CREDITS_MAX_APPLY}
          />
        </Section>

        <Section title="Summary">
          <FareSummary
            lines={fareLines}
            total={total}
            cancelNote={`Free cancellation until ${formatHour12(ENTRY_HOUR_24 - 1)}.`}
          />
        </Section>
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
        <View style={styles.footerTotal}>
          <ThemedText type="statValue">₹{total}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {duration} hrs
          </ThemedText>
        </View>
        <Button title="Pay & reserve" disabled={!canPay} onPress={handlePay} style={styles.payButton} />
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerTotal: {
    flex: 1,
    minWidth: 0,
  },
  payButton: {
    flexShrink: 0,
  },
});
