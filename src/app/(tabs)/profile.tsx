import { ComingSoon } from '@/components/coming-soon';

export default function ProfileScreen() {
  return (
    <ComingSoon
      icon={{ sf: 'person.fill', md: 'person' }}
      title="Profile"
      message="Account details, saved vehicles, and settings will live here."
    />
  );
}
