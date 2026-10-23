import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

/** "Sent to <recipient> · Edit" — the recipient ellipsizes in the middle so long emails stay on one line. */
export function SentToRow({ recipient, onEdit }: { recipient: string; onEdit: () => void }) {
  return (
    <View style={styles.row}>
      <ThemedText type="default" themeColor="textSecondary">
        Sent to
      </ThemedText>
      <ThemedText type="defaultBold" numberOfLines={1} ellipsizeMode="middle" style={styles.recipient}>
        {recipient}
      </ThemedText>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Edit ${recipient}`}
        onPress={onEdit}
        hitSlop={Spacing.two}
        style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
        <ThemedText type="defaultBold" style={styles.edit}>
          Edit
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  recipient: {
    flexShrink: 1,
  },
  edit: {
    textDecorationLine: 'underline',
    marginLeft: Spacing.one,
  },
});
