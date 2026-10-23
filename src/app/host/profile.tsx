import { ComingSoon } from '@/components/coming-soon';

export default function HostProfileScreen() {
  return (
    <ComingSoon
      icon={{ sf: 'person.fill', md: 'person' }}
      title="Profile"
      message="Your host profile, verification status, and payout details will show up here."
    />
  );
}
