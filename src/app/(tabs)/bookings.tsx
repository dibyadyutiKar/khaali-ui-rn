import { ComingSoon } from '@/components/coming-soon';

export default function BookingsScreen() {
  return (
    <ComingSoon
      icon={{ sf: 'calendar', md: 'event' }}
      title="Bookings"
      message="Your upcoming and past bookings will show up here once reservations are live."
    />
  );
}
