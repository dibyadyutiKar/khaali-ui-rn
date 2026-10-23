import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function AddressCard({ name, address }: { name: string; address: string }) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
      <Icon name={{ sf: 'mappin.circle.fill', md: 'place' }} size={20} color={theme.text} />
      <View style={styles.body}>
        <ThemedText type="defaultBold">{name}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {address}
        </ThemedText>
      </View>
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
    gap: Spacing.half,
  },
});
