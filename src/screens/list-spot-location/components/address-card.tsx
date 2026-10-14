import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function AddressCard({
  name,
  address,
  onEditPress,
}: {
  name: string;
  address: string;
  onEditPress: () => void;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.infoMuted }]}>
      <Icon name={{ sf: 'mappin.circle.fill', md: 'place' }} size={20} color={theme.text} />

      <View style={styles.body}>
        <ThemedText type="default" style={styles.name}>
          {name}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {address}
        </ThemedText>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="Edit address" onPress={onEditPress} hitSlop={Spacing.one}>
        <ThemedText type="small" themeColor="accent" style={styles.editLabel}>
          Edit
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  body: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontWeight: 700,
  },
  editLabel: {
    fontWeight: 600,
  },
});
