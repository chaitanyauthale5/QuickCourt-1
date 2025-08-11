import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth';
import { Navigate } from 'react-router-dom';

const FacilityApproval = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;

  const pending = [
    { id: 'f1', name: 'Skyline Sports Hub', owner: 'Arjun', photos: 3, details: 'Koramangala · Badminton, TT · Parking, Showers' },
    { id: 'f2', name: 'Green Valley Turf', owner: 'Priya', photos: 5, details: 'HSR · Football · Parking, Cafe' },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet><title>Facility Approval | QuickCourt</title></Helmet>
      <h1 className="text-3xl font-bold mb-6">Facility Approval</h1>

      <Card>
        <CardHeader><CardTitle>Pending Submissions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {pending.map(p => (
            <div key={p.id} className="flex items-center justify-between border border-border/50 rounded-md p-3 bg-card/50">
              <div>
                <div className="font-medium">{p.name} · Owner: {p.owner}</div>
                <div className="text-xs text-muted-foreground">{p.details} · {p.photos} photos</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">View</Button>
                <Button size="sm" className="bg-secondary hover:bg-secondary/90">Approve</Button>
                <Button size="sm" variant="destructive">Reject</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FacilityApproval;
