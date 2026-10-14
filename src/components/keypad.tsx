import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const ROWS: (string | 'delete' | 'ghost')[][] = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['ghost', '0', 'delete'],
];

export function Keypad({
  onDigit,
  onDelete,
}: {
  onDigit: (digit: string) => void;
  onDelete: () => void;
}) {
  const theme = useTheme();

  return (
    <View style={styles.grid}>
      {ROWS.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => {
            if (key === 'ghost') {
              return (
                <View key="ghost" style={styles.key}>
                  <ThemedText type="small" themeColor="textSecondary" style={styles.ghostLabel}>
                    ABC
                  </ThemedText>
                </View>
              );
            }

            if (key === 'delete') {
              return (
                <Pressable
                  key="delete"
                  accessibilityRole="button"
                  accessibilityLabel="Delete digit"
                  onPress={onDelete}
                  style={({ pressed }) => [
                    styles.key,
                    { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.7 : 1 },
                  ]}>
                  <Icon
                    name={{ sf: 'delete.left', md: 'backspace' }}
                    size={20}
                    color={theme.text}
                  />
                </Pressable>
              );
            }

            return (
              <Pressable
                key={key}
                accessibilityRole="button"
                accessibilityLabel={key}
                onPress={() => onDigit(key)}
                style={({ pressed }) => [
                  styles.key,
                  { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.7 : 1 },
                ]}>
                <ThemedText type="statValue">{key}</ThemedText>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  key: {
    flex: 1,
    aspectRatio: 1.6,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostLabel: {
    opacity: 0.5,
    letterSpacing: 0.5,
  },
});
