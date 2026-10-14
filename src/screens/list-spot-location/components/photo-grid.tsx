import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PhotoSlot = {
  id: string;
  label: string;
  icon: IconName;
  recommended?: boolean;
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
      <CoverSlot slot={cover} onAdd={() => onAddPhoto(cover.id)} onRemove={() => onRemovePhoto(cover.id)} />

      <View style={styles.restRow}>
        {rest.map((slot) => (
          <SecondarySlot
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

function CoverSlot({ slot, onAdd, onRemove }: { slot: PhotoSlot; onAdd: () => void; onRemove: () => void }) {
  const theme = useTheme();

  if (slot.uri) {
    return (
      <View style={styles.coverFilled}>
        <Image source={{ uri: slot.uri }} style={StyleSheet.absoluteFill} contentFit="cover" />
        <View style={[styles.coverBadge, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
          <Icon name={{ sf: 'star.fill', md: 'star' }} size={11} color="#ffffff" />
          <ThemedText type="small" style={styles.coverBadgeLabel}>
            {slot.label}
          </ThemedText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${slot.label}`}
          onPress={onRemove}
          style={[styles.removeButton, { backgroundColor: theme.background }]}>
          <Icon name={{ sf: 'xmark', md: 'close' }} size={12} color={theme.text} />
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Add ${slot.label}`}
      onPress={onAdd}
      style={[styles.coverEmpty, { backgroundColor: theme.backgroundElement }]}>
      <View style={[styles.addIcon, { backgroundColor: theme.background }]}>
        <Icon name={{ sf: 'plus', md: 'add' }} size={18} color={theme.text} />
      </View>
      <ThemedText type="small" style={styles.slotLabel}>
        {slot.label}
      </ThemedText>
    </Pressable>
  );
}

function SecondarySlot({ slot, onAdd, onRemove }: { slot: PhotoSlot; onAdd: () => void; onRemove: () => void }) {
  const theme = useTheme();

  if (slot.uri) {
    return (
      <View style={[styles.secondary, styles.secondaryFilled]}>
        <Image source={{ uri: slot.uri }} style={StyleSheet.absoluteFill} contentFit="cover" />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${slot.label}`}
          onPress={onRemove}
          style={[styles.removeButton, { backgroundColor: theme.background }]}>
          <Icon name={{ sf: 'xmark', md: 'close' }} size={12} color={theme.text} />
        </Pressable>
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Add ${slot.label}${slot.recommended ? ', recommended' : ''}`}
      onPress={onAdd}
      style={[styles.secondary, { backgroundColor: theme.backgroundElement }]}>
      <View style={[styles.addIcon, { backgroundColor: theme.background }]}>
        <Icon name={slot.icon} size={16} color={theme.text} />
      </View>
      <ThemedText type="small" style={styles.slotLabel} numberOfLines={1}>
        {slot.label}
      </ThemedText>
      {slot.recommended && (
        <ThemedText type="small" themeColor="textSecondary" style={styles.recommendedLabel}>
          Recommended
        </ThemedText>
      )}
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
  coverFilled: {
    position: 'relative',
    aspectRatio: 2,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  coverEmpty: {
    aspectRatio: 2,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  coverBadge: {
    position: 'absolute',
    top: Spacing.two,
    left: Spacing.two,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.half,
    borderRadius: Radius.full,
  },
  coverBadgeLabel: {
    color: '#ffffff',
    fontWeight: 700,
  },
  secondary: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.half,
  },
  secondaryFilled: {
    position: 'relative',
    overflow: 'hidden',
  },
  addIcon: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotLabel: {
    fontWeight: 600,
    textAlign: 'center',
  },
  recommendedLabel: {
    fontSize: 10,
    lineHeight: 12,
  },
  removeButton: {
    position: 'absolute',
    top: Spacing.one,
    right: Spacing.one,
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
