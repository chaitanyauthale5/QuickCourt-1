import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { Navigate } from 'react-router-dom';

const BookingOverview = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  if (user.role !== 'facility_owner') return <Navigate to="/" replace />;

  const bookings = [
    { id: 'b1', user: 'Rahul', court: 'Court 1', time: '11 Aug, 6:00 PM', status: 'Booked' },
    { id: 'b2', user: 'Sneha', court: 'Court 2', time: '11 Aug, 7:00 PM', status: 'Booked' },
    { id: 'b3', user: 'Aisha', court: 'Table 1', time: '10 Aug, 7:00 PM', status: 'Completed' },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet><title>Booking Overview | QuickCourt</title></Helmet>
      <h1 className="text-3xl font-bold mb-6">Booking Overview</h1>

      <Card>
        <CardHeader><CardTitle>Upcoming & Past Bookings</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {bookings.map(b => (
            <div key={b.id} className="flex items-center justify-between border border-border/50 rounded-md p-3 bg-card/50">
              <div>
                <div className="font-medium">{b.user} · {b.court}</div>
                <div className="text-xs text-muted-foreground">{b.time}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs">{b.status}</div>
                {b.status === 'Booked' && <Button size="sm" variant="outline">Cancel</Button>}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingOverview;
