import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { BrandMark } from '@/components/brand-mark';
import { Button } from '@/components/button';
import { FormScreen } from '@/components/form-screen';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

import { MapPreview } from './components/map-preview';

export function Welcome() {
  const router = useRouter();

  function handleGooglePress() {
    // TODO: wire real Google OAuth once the backend exists. Google already verifies email,
    // so this path should skip straight to /phone to collect the other half of the identity.
  }

  return (
    <FormScreen>
      <BrandMark />

      <MapPreview style={styles.map} />

      <View style={styles.copy}>
        <ThemedText type="headline">Parking, wherever you&apos;re going.</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          Book verified private parking by the hour, day or month.
        </ThemedText>
      </View>

      <View style={styles.actions}>
        <Button title="Continue with phone number" onPress={() => router.push('/phone')} />
        <Button title="Continue with Google" variant="secondary" onPress={handleGooglePress} />

        <Pressable
          accessibilityRole="link"
          onPress={() => router.push('/list-spot/location')}
          hitSlop={Spacing.two}
          style={({ pressed }) => [styles.earnLink, { opacity: pressed ? 0.6 : 1 }]}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.earnLabel}>
            Have a parking space? Earn from it
          </ThemedText>
        </Pressable>
      </View>
    </FormScreen>
  );
}

const styles = StyleSheet.create({
  // Fills whatever height the copy and buttons leave, so tall phones get a bigger map
  // instead of an empty gap; the min keeps it a real illustration on small ones.
  map: {
    flex: 1,
    minHeight: 200,
  },
  copy: {
    gap: Spacing.two,
  },
  actions: {
    gap: Spacing.two,
  },
  earnLink: {
    alignSelf: 'center',
    marginTop: Spacing.two,
  },
  earnLabel: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
