import { Host, Switch } from '@expo/ui';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ChipOption, SelectChips } from '@/components/select-chips';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PaymentMethod = 'upi' | 'card' | 'cash' | 'netbanking';
export type UpiApp = 'gpay' | 'phonepe' | 'paytm' | 'upi-id';

const UPI_APPS: ChipOption<UpiApp>[] = [
  { id: 'gpay', label: 'GPay' },
  { id: 'phonepe', label: 'PhonePe' },
  { id: 'paytm', label: 'Paytm' },
  { id: 'upi-id', label: 'UPI ID' },
];

const PRIMARY_METHODS: { id: PaymentMethod; title: string; subtitle: string }[] = [
  { id: 'upi', title: 'UPI', subtitle: 'GPay, PhonePe, Paytm or UPI ID' },
  { id: 'card', title: 'Card', subtitle: 'HDFC Millennia ···· 4921' },
];

const MORE_METHODS: typeof PRIMARY_METHODS = [
  { id: 'cash', title: 'Cash on arrival', subtitle: 'Pay the gate guard at check-in' },
  { id: 'netbanking', title: 'Net banking', subtitle: 'HDFC, ICICI, SBI, Axis' },
];

function MethodOption({
  title,
  subtitle,
  selected,
  onPress,
}: {
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={title}
      accessibilityHint={subtitle}
      onPress={onPress}
      style={({ pressed }) => [styles.option, { opacity: pressed ? 0.7 : 1 }]}>
      <View style={styles.optionText}>
        <ThemedText type="defaultBold">{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
          {subtitle}
        </ThemedText>
      </View>
      <View
        style={[
          styles.radio,
          { borderColor: selected ? theme.text : theme.textSecondary, borderWidth: selected ? 7 : 2 },
        ]}
      />
    </Pressable>
  );
}

export function PaymentSection({
  method,
  onSelectMethod,
  upiApp,
  onSelectUpiApp,
  upiId,
  onChangeUpiId,
  useCredits,
  onToggleCredits,
  creditsBalance,
  creditsMaxApply,
}: {
  method: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
  upiApp: UpiApp;
  onSelectUpiApp: (app: UpiApp) => void;
  upiId: string;
  onChangeUpiId: (value: string) => void;
  useCredits: boolean;
  onToggleCredits: (value: boolean) => void;
  creditsBalance: number;
  creditsMaxApply: number;
}) {
  const theme = useTheme();
  const [showMore, setShowMore] = useState(MORE_METHODS.some((m) => m.id === method));
  const methods = showMore ? [...PRIMARY_METHODS, ...MORE_METHODS] : PRIMARY_METHODS;
  const divider = <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />;

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: theme.backgroundElement }]} accessibilityRole="radiogroup">
        {methods.map((option, index) => (
          <View key={option.id}>
            {index > 0 && divider}
            <MethodOption
              title={option.title}
              subtitle={option.subtitle}
              selected={method === option.id}
              onPress={() => onSelectMethod(option.id)}
            />
            {option.id === 'upi' && method === 'upi' && (
              <View style={styles.upiPanel}>
                <SelectChips options={UPI_APPS} selected={upiApp} onSelect={onSelectUpiApp} onCard />
                {upiApp === 'upi-id' && (
                  <TextInput
                    value={upiId}
                    onChangeText={onChangeUpiId}
                    accessibilityLabel="UPI ID"
                    placeholder="name@bank"
                    placeholderTextColor={theme.textSecondary}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    style={[styles.upiInput, { backgroundColor: theme.background, color: theme.text }]}
                  />
                )}
              </View>
            )}
          </View>
        ))}

        {!showMore && (
          <>
            {divider}
            <Pressable
              accessibilityRole="button"
              onPress={() => setShowMore(true)}
              style={({ pressed }) => [styles.option, { opacity: pressed ? 0.6 : 1 }]}>
              <ThemedText type="smallBold" themeColor="textSecondary">
                More payment options
              </ThemedText>
            </Pressable>
          </>
        )}
      </View>

      <View style={[styles.card, styles.creditsRow, { backgroundColor: theme.backgroundElement }]}>
        <View style={styles.optionText}>
          <ThemedText type="default">Use Khaali credits</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            ₹{creditsBalance} balance · up to ₹{creditsMaxApply} off
          </ThemedText>
        </View>
        <Host matchContents>
          <Switch value={useCredits} onValueChange={onToggleCredits} />
        </Host>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
  },
  card: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  optionText: {
    flex: 1,
    gap: Spacing.half,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: Radius.full,
  },
  upiPanel: {
    gap: Spacing.two,
    paddingBottom: Spacing.three,
  },
  upiInput: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    fontSize: 16,
    lineHeight: 22,
    outlineWidth: 0,
  },
  creditsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
});
