import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { FlowHeader } from '@/components/flow-header';
import { FlowStepProgress } from '@/components/flow-step-progress';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { AddressCard } from './components/address-card';
import { PhotoGrid, PhotoSlot } from './components/photo-grid';
import { PinMapPlaceholder } from './components/pin-map-placeholder';

const INITIAL_SLOTS: PhotoSlot[] = [
  { id: 'cover', label: 'Cover photo', uri: null },
  { id: 'gate', label: 'Gate', uri: null },
  { id: 'wide', label: 'Wide', uri: null },
  { id: 'marker', label: 'Marker', uri: null },
];

export function ListSpotLocation() {
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [instructions, setInstructions] = useState('');

  const filledCount = slots.filter((s) => s.uri).length;
  const hasCoverPhoto = slots[0].uri !== null;

  async function handleAddPhoto(slotId: string) {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
    const uri = result.canceled ? undefined : result.assets[0]?.uri;
    if (!uri) return;

    setSlots((prev) => prev.map((s) => (s.id === slotId ? { ...s, uri } : s)));
  }

  function handleRemovePhoto(slotId: string) {
    setSlots((prev) => prev.map((s) => (s.id === slotId ? { ...s, uri: null } : s)));
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

        <FlowStepProgress step={1} totalSteps={3} label="Location & photos" />

        <View style={styles.intro}>
          <ThemedText type="headline">Where is your spot?</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            Drop the pin where drivers should enter.
          </ThemedText>
        </View>

        <PinMapPlaceholder areaLabel="Koramangala 4th Block, Bengaluru" />

        <AddressCard
          name="Prestige Pine Wood"
          address="Block B, P-112 Stilt Parking, 80 Feet Rd, Koramangala, Bengaluru 560034"
        />

        <View style={styles.section}>
          <ThemedText type="label" themeColor="textSecondary">
            Entrance instructions · optional
          </ThemedText>
          <TextInput
            value={instructions}
            onChangeText={setInstructions}
            accessibilityLabel="Entrance instructions"
            placeholder="e.g. Gate 2 next to the bakery. Tell the guard spot P-112."
            placeholderTextColor={theme.textSecondary}
            multiline
            style={[styles.input, { backgroundColor: theme.backgroundElement, color: theme.text }]}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="label" themeColor="textSecondary">
              Photos
            </ThemedText>
            <ThemedText type="smallBold" themeColor="textSecondary">
              {filledCount}/{slots.length}
            </ThemedText>
          </View>
          <PhotoGrid slots={slots} onAddPhoto={handleAddPhoto} onRemovePhoto={handleRemovePhoto} />
          <ThemedText type="small" themeColor="textSecondary">
            Daylight shots with slot markers like P-112 help drivers self-park.
          </ThemedText>
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
        <Button
          title={hasCoverPhoto ? 'Continue' : 'Add a cover photo to continue'}
          disabled={!hasCoverPhoto}
          onPress={() => router.push('/list-spot/details')}
        />
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
  intro: {
    gap: Spacing.one,
  },
  section: {
    gap: Spacing.two,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    padding: Spacing.three,
    fontSize: 16,
    lineHeight: 24,
    minHeight: 96,
    textAlignVertical: 'top',
    outlineWidth: 0,
  },
  footer: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
