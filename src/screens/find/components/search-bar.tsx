import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Icon } from '@/components/icon';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function SearchBar({
  value,
  onChangeText,
  onVoicePress,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onVoicePress: () => void;
}) {
  const theme = useTheme();

  return (
    <View style={[styles.row, { backgroundColor: theme.background }]}>
      <Icon name={{ sf: 'magnifyingglass', md: 'search' }} size={18} color={theme.textSecondary} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Where do you want to park?"
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { color: theme.text, outlineWidth: 0 }]}
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Search by voice"
        onPress={onVoicePress}
        hitSlop={Spacing.one}>
        <Icon name={{ sf: 'mic.fill', md: 'mic' }} size={18} color={theme.textSecondary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Radius.full,
    borderCurve: 'continuous',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
});
