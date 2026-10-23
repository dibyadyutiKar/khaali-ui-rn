import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { FormScreen } from '@/components/form-screen';
import { Header } from '@/components/header';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import { Role, RoleCard } from './components/role-card';
import { StepProgress } from './components/step-progress';

const ROLES: Role[] = [
  {
    id: 'find-parking',
    icon: { sf: 'parkingsign', md: 'local-parking' },
    title: 'Find parking',
    subtitle: 'Book a spot near where you’re going',
  },
  {
    id: 'find-storage',
    icon: { sf: 'shippingbox.fill', md: 'inventory-2' },
    title: 'Find storage',
    subtitle: 'Reserve secure space for goods',
  },
  {
    id: 'rent-out',
    icon: { sf: 'house.fill', md: 'home' },
    title: 'Rent out my parking',
    subtitle: 'List an empty spot and earn from it',
  },
];

export function ProfileSetup() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  function handleContinue() {
    if (!selectedRole) return;
    // TODO: persist the chosen role once the backend exists.
    router.push('/find');
  }

  return (
    <FormScreen footer={<Button title="Continue" disabled={!selectedRole} onPress={handleContinue} />}>
      <Header onBack={() => router.back()} />

      <StepProgress current={2} total={2} />

      <View style={styles.intro}>
        <ThemedText type="headline">What brings you here?</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          You can switch anytime.
        </ThemedText>
      </View>

      <View style={styles.cards} accessibilityRole="radiogroup">
        {ROLES.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            selected={selectedRole === role.id}
            onPress={() => setSelectedRole(role.id)}
          />
        ))}
      </View>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  intro: {
    gap: Spacing.one,
  },
  cards: {
    gap: Spacing.two,
  },
});
