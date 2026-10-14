import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Header } from '@/components/header';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';

import { Role, RoleCard } from './components/role-card';
import { StepProgress } from './components/step-progress';

const ROLES: Role[] = [
  {
    id: 'find-parking',
    icon: { sf: 'parkingsign', md: 'local-parking' },
    title: 'Find parking',
    subtitle: 'Book a spot near your destination',
    tag: 'Hourly • Daily • Monthly',
    highlight: { icon: { sf: 'bolt.fill', md: 'bolt' }, label: 'Instant booking' },
  },
  {
    id: 'find-storage',
    icon: { sf: 'shippingbox.fill', md: 'inventory-2' },
    title: 'Find storage & warehouse',
    subtitle: 'Reserve secure space for goods or boxes',
    tag: 'Flexible tenure',
    highlight: { icon: { sf: 'checkmark.shield.fill', md: 'verified' }, label: 'Gated & Verified' },
  },
  {
    id: 'rent-out',
    icon: { sf: 'house.fill', md: 'home' },
    title: 'Rent out my parking',
    subtitle: 'Earn ₹2,000–5,000/mo from an empty spot',
    tag: 'Zero listing fees',
    highlight: { icon: { sf: 'calendar', md: 'event' }, label: 'Payouts every Monday' },
  },
];

export function ProfileSetup() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  function handleContinue() {
    if (!selectedRole) return;
    // TODO: persist the chosen role once the backend exists, then land in the main app —
    // this is currently the end of the onboarding chain.
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
            paddingBottom: Platform.OS === 'ios' ? Spacing.four : insets.bottom + Spacing.four,
          },
        ]}>
        <Header onBack={() => router.back()} />

        <StepProgress current={2} total={2} />

        <ThemedText type="headline">What brings you here?</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          Select how you want to use Khaali. You can switch roles at any time.
        </ThemedText>

        <View style={styles.cards}>
          {ROLES.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              selected={selectedRole === role.id}
              onPress={() => setSelectedRole(role.id)}
            />
          ))}
        </View>

        <Button title="Continue →" disabled={!selectedRole} onPress={handleContinue} />
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
    gap: Spacing.three,
  },
  cards: {
    gap: Spacing.three,
  },
});
