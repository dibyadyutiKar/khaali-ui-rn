import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { BrandMark } from '@/components/brand-mark';
import { MaxContentWidth, Spacing } from '@/constants/theme';

/**
 * Brand + avatar bar for tab-root screens (nothing to go back to). Sits outside any ScrollView,
 * so it applies the top safe-area inset itself on every platform — there's no native header.
 */
export function TabHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.row, { paddingTop: insets.top + Spacing.three }]}>
      <BrandMark />
      <Avatar />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
  },
});
