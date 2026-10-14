import { ReactNode } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { EncryptedBadge } from '@/components/encrypted-badge';
import { Icon, IconName } from '@/components/icon';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PaymentMethod = 'upi' | 'card' | 'cash' | 'netbanking';

const UPI_APPS = ['GPay', 'PhonePe', 'Paytm', 'Other ID'] as const;

export function PaymentSection({
  useCredits,
  onToggleCredits,
  creditsAvailable,
  creditsApplied,
  method,
  onSelectMethod,
  upiId,
  onChangeUpiId,
  onVerifyUpi,
  selectedUpiApp,
  onSelectUpiApp,
}: {
  useCredits: boolean;
  onToggleCredits: (value: boolean) => void;
  creditsAvailable: number;
  creditsApplied: number;
  method: PaymentMethod;
  onSelectMethod: (method: PaymentMethod) => void;
  upiId: string;
  onChangeUpiId: (value: string) => void;
  onVerifyUpi: () => void;
  selectedUpiApp: string | null;
  onSelectUpiApp: (app: string) => void;
}) {
  const theme = useTheme();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="default" style={styles.sectionTitle}>
          2. Payment method
        </ThemedText>
        <EncryptedBadge />
      </View>

      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: useCredits }}
        accessibilityLabel="Use Khaali Credits"
        onPress={() => onToggleCredits(!useCredits)}
        style={[styles.creditsRow, { backgroundColor: theme.backgroundElement }]}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: useCredits ? theme.text : 'transparent',
              borderColor: useCredits ? theme.text : theme.backgroundSelected,
            },
          ]}>
          {useCredits && <Icon name={{ sf: 'checkmark', md: 'check' }} size={12} color={theme.background as string} />}
        </View>

        <View style={styles.creditsText}>
          <View style={styles.creditsTitleRow}>
            <ThemedText type="default" style={styles.creditsTitle}>
              Use Khaali Credits
            </ThemedText>
            <Pill tone="accentMuted">
              <ThemedText type="small" themeColor="accent" style={styles.availableLabel}>
                Available
              </ThemedText>
            </Pill>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            Available balance: ₹{creditsAvailable}.00 (Max apply: ₹50)
          </ThemedText>
        </View>

        <ThemedText type="smallBold">−₹{creditsApplied}</ThemedText>
      </Pressable>

      <PaymentOptionRow
        active={method === 'upi'}
        onPress={() => onSelectMethod('upi')}
        icon={{ sf: 'bolt.fill', md: 'bolt' }}
        title="UPI • Instant Authorization"
        badge="Fastest"
        subtitle="Google Pay, PhonePe, Paytm, or UPI ID">
        {method === 'upi' && (
          <View style={styles.upiPanel}>
            <View style={styles.upiAppRow}>
              {UPI_APPS.map((app) => {
                const active = selectedUpiApp === app;
                return (
                  <Pressable
                    key={app}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: active }}
                    accessibilityLabel={app}
                    onPress={() => onSelectUpiApp(app)}
                    style={[
                      styles.upiAppButton,
                      { backgroundColor: active ? theme.text : theme.background, borderColor: theme.backgroundSelected },
                    ]}>
                    <Icon
                      name={{ sf: 'qrcode', md: 'qr-code' }}
                      size={16}
                      color={(active ? theme.background : theme.text) as string}
                    />
                    <ThemedText type="small" style={{ color: active ? theme.background : theme.text, fontWeight: '600' }}>
                      {app}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>

            <View style={[styles.upiIdRow, { backgroundColor: theme.background }]}>
              <TextInput
                value={upiId}
                onChangeText={onChangeUpiId}
                placeholder="Enter UPI ID (e.g. yourname@okhdfc)"
                placeholderTextColor={theme.textSecondary}
                autoCapitalize="none"
                style={[styles.upiIdInput, { color: theme.text, outlineWidth: 0 }]}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Verify UPI ID"
                disabled={upiId.length === 0}
                onPress={onVerifyUpi}
                style={[styles.verifyButton, { backgroundColor: theme.text, opacity: upiId.length === 0 ? 0.4 : 1 }]}>
                <ThemedText type="small" style={{ color: theme.background, fontWeight: '700' }}>
                  Verify
                </ThemedText>
              </Pressable>
            </View>
          </View>
        )}
      </PaymentOptionRow>

      <PaymentOptionRow
        active={method === 'card'}
        onPress={() => onSelectMethod('card')}
        icon={{ sf: 'creditcard.fill', md: 'credit-card' }}
        title="Credit / Debit Card"
        subtitle="HDFC Millennia ending 4921"
      />

      <PaymentOptionRow
        active={method === 'cash'}
        onPress={() => onSelectMethod('cash')}
        icon={{ sf: 'banknote', md: 'payments' }}
        title="Pay on Arrival • Cash"
        badge="Host pass"
        subtitle="Handover cash to gate guard upon check-in"
      />

      <PaymentOptionRow
        active={method === 'netbanking'}
        onPress={() => onSelectMethod('netbanking')}
        icon={{ sf: 'building.columns.fill', md: 'account-balance' }}
        title="Net Banking & Wallets"
        subtitle="HDFC, ICICI, SBI, Axis, Amazon Pay"
      />
    </View>
  );
}

function PaymentOptionRow({
  active,
  onPress,
  icon,
  title,
  badge,
  subtitle,
  children,
}: {
  active: boolean;
  onPress: () => void;
  icon: IconName;
  title: string;
  badge?: string;
  subtitle: string;
  children?: ReactNode;
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.optionCard,
        { backgroundColor: theme.background, borderColor: active ? theme.text : theme.backgroundSelected },
      ]}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ checked: active }}
        accessibilityLabel={title}
        onPress={onPress}
        style={styles.optionRow}>
        <View style={[styles.radio, { borderColor: active ? theme.text : theme.backgroundSelected }]}>
          {active && <View style={[styles.radioDot, { backgroundColor: theme.text }]} />}
        </View>

        <View style={styles.optionText}>
          <View style={styles.optionTitleRow}>
            <ThemedText type="default" style={styles.optionTitle}>
              {title}
            </ThemedText>
            {badge && (
              <Pill tone="backgroundSelected">
                <ThemedText type="small" style={styles.optionBadgeLabel}>
                  {badge}
                </ThemedText>
              </Pill>
            )}
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {subtitle}
          </ThemedText>
        </View>

        <Icon name={icon} size={18} color={theme.textSecondary} />
      </Pressable>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.two,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontWeight: 700,
  },
  creditsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: Radius.sm,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  creditsText: {
    flex: 1,
    gap: 2,
  },
  creditsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  creditsTitle: {
    fontWeight: 700,
  },
  availableLabel: {
    fontWeight: 700,
  },
  optionCard: {
    borderWidth: 2,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: Radius.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: Radius.full,
  },
  optionText: {
    flex: 1,
    gap: 2,
  },
  optionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  optionTitle: {
    fontWeight: 700,
  },
  optionBadgeLabel: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  upiPanel: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    gap: Spacing.two,
  },
  upiAppRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  upiAppButton: {
    flexBasis: '22%',
    flexGrow: 1,
    alignItems: 'center',
    gap: Spacing.half,
    paddingVertical: Spacing.two,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
    borderWidth: 1,
  },
  upiIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.one,
    paddingLeft: Spacing.two,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
  upiIdInput: {
    flex: 1,
    fontSize: 14,
    padding: 0,
  },
  verifyButton: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.md,
    borderCurve: 'continuous',
  },
});
