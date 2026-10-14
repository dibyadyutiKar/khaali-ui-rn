import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { FlowHeader } from '@/components/flow-header';
import { FlowStepProgress } from '@/components/flow-step-progress';
import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import { AddressCard } from './components/address-card';
import { PhotoGrid, PhotoSlot } from './components/photo-grid';
import { PinMapPlaceholder } from './components/pin-map-placeholder';

const INITIAL_SLOTS: PhotoSlot[] = [
  { id: 'cover', label: 'Cover Photo', icon: { sf: 'star.fill', md: 'star' }, uri: null },
  {
    id: 'gate-entry',
    label: 'Gate Entry',
    icon: { sf: 'camera.fill', md: 'photo-camera' },
    recommended: true,
    uri: null,
  },
  { id: 'wide-angle', label: 'Wide Angle', icon: { sf: 'camera.fill', md: 'camera-alt' }, uri: null },
  { id: 'pillar-mark', label: 'Pillar / Mark', icon: { sf: 'camera.fill', md: 'camera-alt' }, uri: null },
  { id: 'driveway', label: 'Driveway', icon: { sf: 'camera.fill', md: 'camera-alt' }, uri: null },
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

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    if (!uri) return;

    setSlots((prev) => prev.map((s) => (s.id === slotId ? { ...s, uri } : s)));
  }

  function handleRemovePhoto(slotId: string) {
    setSlots((prev) => prev.map((s) => (s.id === slotId ? { ...s, uri: null } : s)));
  }

  function handleEditAddress() {
    // TODO: real address editing needs reverse geocoding off a real map pin — see docs/gaps.md.
  }

  function handleLocatePress() {
    // TODO: needs expo-location + a real map SDK — see docs/gaps.md.
  }

  function handleZoomIn() {
    // TODO: no-op until there's a real map to zoom.
  }

  function handleZoomOut() {
    // TODO: no-op until there's a real map to zoom.
  }

  function handleContinue() {
    if (!hasCoverPhoto) return;
    // TODO: steps 2 (Pricing) and 3 don't exist yet — this flow stops here. See docs/gaps.md.
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

        <FlowStepProgress step={1} totalSteps={3} label="Location & Spot" />

        <ThemedText type="headline">Where is your parking space?</ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          Set exact pin location so drivers can navigate directly to the boom barrier.
        </ThemedText>

        <PinMapPlaceholder
          areaLabel="Koramangala 4th Block, Bengaluru"
          onLocatePress={handleLocatePress}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />

        <View style={styles.section}>
          <ThemedText type="label" themeColor="textSecondary">
            Exact address
          </ThemedText>
          <AddressCard
            name="Prestige Pine Wood"
            address="Block B, P-112 Stilt Parking, 80 Feet Rd, Koramangala, Bengaluru, Karnataka 560034"
            onEditPress={handleEditAddress}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.instructionsHeader}>
            <ThemedText type="label" themeColor="textSecondary">
              Entrance instructions (optional)
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Gate code, landmark
            </ThemedText>
          </View>
          <TextInput
            value={instructions}
            onChangeText={setInstructions}
            placeholder={
              'e.g. Gate 2 next to the bakery, enter through left security boom barrier. Tell guard spot P-112.'
            }
            placeholderTextColor={theme.textSecondary}
            multiline
            numberOfLines={3}
            style={[
              styles.instructionsInput,
              { backgroundColor: theme.backgroundElement, color: theme.text, outlineWidth: 0 },
            ]}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.photosHeader}>
            <View style={styles.photosHeaderText}>
              <ThemedText type="default" style={styles.photosTitle}>
                Photos of the space
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Listings with clear pillars and ground markers earn 3x more.
              </ThemedText>
            </View>
            <View style={[styles.counter, { backgroundColor: theme.backgroundElement }]}>
              <ThemedText type="small" style={styles.counterLabel}>
                {filledCount}/5
              </ThemedText>
            </View>
          </View>

          <PhotoGrid slots={slots} onAddPhoto={handleAddPhoto} onRemovePhoto={handleRemovePhoto} />

          <View style={[styles.tip, { backgroundColor: theme.infoMuted }]}>
            <Icon name={{ sf: 'lightbulb.fill', md: 'lightbulb' }} size={16} color={theme.text} />
            <ThemedText type="small" style={styles.tipText}>
              Tip: Take photos during daylight. Include slot markers like{' '}
              <ThemedText type="smallBold">&quot;P-112&quot;</ThemedText> to help drivers self-park
              without calling you.
            </ThemedText>
          </View>
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
        <View>
          <ThemedText type="statValue">₹3,200</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Estimated earnings /mo
          </ThemedText>
        </View>
        <Button
          title="Continue to Pricing →"
          disabled={!hasCoverPhoto}
          onPress={handleContinue}
          style={styles.footerButton}
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
  section: {
    gap: Spacing.two,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  instructionsInput: {
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    padding: Spacing.three,
    fontSize: 14,
    lineHeight: 20,
    minHeight: 72,
    textAlignVertical: 'top',
  },
  photosHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  photosHeaderText: {
    flex: 1,
    gap: 2,
  },
  photosTitle: {
    fontWeight: 700,
  },
  counter: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.full,
  },
  counterLabel: {
    fontWeight: 700,
  },
  tip: {
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  tipText: {
    flex: 1,
    lineHeight: 18,
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
  footerButton: {
    flex: 1,
  },
});
