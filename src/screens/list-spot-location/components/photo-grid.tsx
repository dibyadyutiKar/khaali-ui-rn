import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PhotoSlot = {
  id: string;
  label: string;
  uri: string | null;
};

export function PhotoGrid({
  slots,
  onAddPhoto,
  onRemovePhoto,
}: {
  slots: PhotoSlot[];
  onAddPhoto: (slotId: string) => void;
  onRemovePhoto: (slotId: string) => void;
}) {
  const [cover, ...rest] = slots;

  return (
    <View style={styles.grid}>
      <Slot slot={cover} large onAdd={() => onAddPhoto(cover.id)} onRemove={() => onRemovePhoto(cover.id)} />
      <View style={styles.restRow}>
        {rest.map((slot) => (
          <Slot
            key={slot.id}
            slot={slot}
            onAdd={() => onAddPhoto(slot.id)}
            onRemove={() => onRemovePhoto(slot.id)}
          />
        ))}
      </View>
    </View>
  );
}

function Slot({
  slot,
  large,
  onAdd,
  onRemove,
}: {
  slot: PhotoSlot;
  large?: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const theme = useTheme();
  const shape = large ? styles.large : styles.small;

  if (slot.uri) {
    return (
      <View style={[shape, styles.filled]}>
        <Image source={{ uri: slot.uri }} style={StyleSheet.absoluteFill} contentFit="cover" />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${slot.label} photo`}
          onPress={onRemove}
          hitSlop={Spacing.two}
          style={({ pressed }) => [
            styles.removeButton,
            { backgroundColor: theme.background, opacity: pressed ? 0.7 : 1 },
          ]}>
          <Icon name={{ sf: 'xmark', md: 'close' }} size={12} color={theme.text} />
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Add ${slot.label} photo`}
      onPress={onAdd}
      style={({ pressed }) => [
        shape,
        styles.empty,
        { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.7 : 1 },
      ]}>
      <Icon name={{ sf: 'plus', md: 'add' }} size={large ? 20 : 16} color={theme.textSecondary} />
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
        {slot.label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: Spacing.two,
  },
  restRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  large: {
    aspectRatio: 2,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  small: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  filled: {
    overflow: 'hidden',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.half,
    padding: Spacing.one,
  },
  label: {
    textAlign: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: Spacing.one,
    right: Spacing.one,
    width: 28,
    height: 28,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
