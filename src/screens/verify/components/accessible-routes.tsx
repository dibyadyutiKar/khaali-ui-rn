import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

function RouteOption({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        { backgroundColor: theme.backgroundElement, opacity: pressed ? 0.7 : 1 },
      ]}>
      <Icon name={icon} size={16} color={theme.text} />
      <ThemedText type="small" style={styles.optionLabel}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

export function AccessibleRoutes({
  onWhatsApp,
  onCall,
}: {
  onWhatsApp: () => void;
  onCall: () => void;
}) {
  return (
    <View style={styles.row}>
      <RouteOption
        icon={{ sf: 'message.fill', md: 'chat' }}
        label="Via WhatsApp"
        onPress={onWhatsApp}
      />
      <RouteOption
        icon={{ sf: 'phone.fill', md: 'call' }}
        label="Call me instead"
        onPress={onCall}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    paddingVertical: Spacing.two,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  optionLabel: {
    fontWeight: 600,
  },
});
