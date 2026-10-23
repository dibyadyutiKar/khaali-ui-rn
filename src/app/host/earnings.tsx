import { ComingSoon } from '@/components/coming-soon';

export default function EarningsScreen() {
  return (
    <ComingSoon
      icon={{ sf: 'banknote', md: 'payments' }}
      title="Earnings"
      message="Payout history and a full earnings breakdown will show up here."
    />
  );
}
