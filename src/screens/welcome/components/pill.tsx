import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Radius, Spacing, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Pill({
  tone = 'accentMuted',
  style,
  children,
}: {
  tone?: ThemeColor;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.base, { backgroundColor: theme[tone] }, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.one,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.full,
  },
});
