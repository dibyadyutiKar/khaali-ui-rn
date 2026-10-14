import { Host, Switch } from '@expo/ui';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ScheduleSection({
  dateLabel,
  entryLabel,
  durationHours,
  exitLabel,
  onExtend,
  onReset,
  canReset,
  vehiclePlate,
  vehicleType,
  vehicleModel,
  onChangeVehicle,
  evCharging,
  onToggleEvCharging,
}: {
  dateLabel: string;
  entryLabel: string;
  durationHours: number;
  exitLabel: string;
  onExtend: (hours: number) => void;
  onReset: () => void;
  canReset: boolean;
  vehiclePlate: string;
  vehicleType: string;
  vehicleModel: string;
  onChangeVehicle: () => void;
  evCharging: boolean;
  onToggleEvCharging: (value: boolean) => void;
}) {
  const theme = useTheme();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <ThemedText type="default" style={styles.sectionTitle}>
          1. Schedule &amp; vehicle
        </ThemedText>
        <View style={styles.liveBadge}>
          <Icon name={{ sf: 'bolt.fill', md: 'bolt' }} size={11} color={theme.accent} />
          <ThemedText type="small" themeColor="accent" style={styles.liveLabel}>
            Live slot active
          </ThemedText>
        </View>
      </View>

      <View style={styles.cardRow}>
        <View style={[styles.infoCard, { backgroundColor: theme.infoMuted }]}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.infoLabel}>
            Date
          </ThemedText>
          <ThemedText type="default" style={styles.infoValue}>
            {dateLabel}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Entry: {entryLabel}
          </ThemedText>
        </View>

        <View style={[styles.infoCard, { backgroundColor: theme.infoMuted }]}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.infoLabel}>
            Duration
          </ThemedText>
          <ThemedText type="default" style={styles.infoValue}>
            {durationHours} Hour{durationHours === 1 ? '' : 's'}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Exit: {exitLabel}
          </ThemedText>
        </View>
      </View>

      <View style={styles.extendRow}>
        <ThemedText type="small" themeColor="textSecondary">
          Extend duration:
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Extend by 1 hour"
          onPress={() => onExtend(1)}
          style={[styles.extendChip, { backgroundColor: theme.backgroundElement }]}>
          <ThemedText type="small" style={styles.extendLabel}>
            +1 hr
          </ThemedText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Extend by 2 hours"
          onPress={() => onExtend(2)}
          style={[styles.extendChip, { backgroundColor: theme.backgroundElement }]}>
          <ThemedText type="small" style={styles.extendLabel}>
            +2 hrs
          </ThemedText>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Reset duration"
          disabled={!canReset}
          onPress={onReset}
          hitSlop={Spacing.one}>
          <ThemedText
            type="small"
            themeColor="textSecondary"
            style={[styles.resetLabel, { opacity: canReset ? 1 : 0.4 }]}>
            Reset
          </ThemedText>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Change vehicle"
        onPress={onChangeVehicle}
        style={[styles.vehicleCard, { backgroundColor: theme.backgroundElement }]}>
        <View style={[styles.vehicleIcon, { backgroundColor: theme.text }]}>
          <Icon name={{ sf: 'car.fill', md: 'directions-car' }} size={16} color={theme.background as string} />
        </View>
        <View style={styles.vehicleText}>
          <View style={styles.vehiclePlateRow}>
            <ThemedText type="default" style={styles.vehiclePlate}>
              {vehiclePlate}
            </ThemedText>
            <View style={[styles.vehicleTypeBadge, { backgroundColor: theme.backgroundSelected }]}>
              <ThemedText type="small" style={styles.vehicleTypeLabel}>
                {vehicleType}
              </ThemedText>
            </View>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            {vehicleModel}
          </ThemedText>
        </View>
        <ThemedText type="small" themeColor="accent" style={styles.changeLabel}>
          Change
        </ThemedText>
      </Pressable>

      <View style={[styles.evCard, { backgroundColor: theme.accentMuted }]}>
        <View style={[styles.evIcon, { backgroundColor: theme.background }]}>
          <Icon name={{ sf: 'bolt.car.fill', md: 'ev-station' }} size={16} color={theme.accent} />
        </View>
        <View style={styles.evText}>
          <ThemedText type="default" style={styles.evTitle}>
            7.4 kW AC Wallbox Charging
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Host plug unlocked upon parking (+₹45)
          </ThemedText>
        </View>
        <Host matchContents>
          <Switch value={evCharging} onValueChange={onToggleEvCharging} />
        </Host>
      </View>
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
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.half,
  },
  liveLabel: {
    fontWeight: 700,
  },
  cardRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  infoCard: {
    flex: 1,
    padding: Spacing.two,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
    gap: 2,
  },
  infoLabel: {
    fontWeight: 600,
  },
  infoValue: {
    fontWeight: 700,
  },
  extendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  extendChip: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.full,
  },
  extendLabel: {
    fontWeight: 700,
  },
  resetLabel: {
    fontWeight: 600,
    marginLeft: 'auto',
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.two,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  vehicleIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleText: {
    flex: 1,
    gap: 2,
  },
  vehiclePlateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  vehiclePlate: {
    fontWeight: 700,
  },
  vehicleTypeBadge: {
    paddingHorizontal: Spacing.one,
    borderRadius: Radius.sm,
  },
  vehicleTypeLabel: {
    fontWeight: 700,
  },
  changeLabel: {
    fontWeight: 600,
  },
  evCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.two,
    borderRadius: Radius.lg,
    borderCurve: 'continuous',
  },
  evIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  evText: {
    flex: 1,
    gap: 2,
  },
  evTitle: {
    fontWeight: 700,
  },
});
