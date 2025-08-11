import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import { Navigate } from 'react-router-dom';

const FacilityManagement = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  if (user.role !== 'facility_owner') return <Navigate to="/" replace />;
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Facility Management</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Facility Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Name" defaultValue="Ace Sports Complex" />
            <Input placeholder="Location" defaultValue="Koramangala, Bengaluru" />
            <Textarea placeholder="Description" defaultValue="Premium indoor courts with pro-grade flooring and lighting." />
            <div className="flex gap-2 flex-wrap">
              {['Badminton','Table Tennis'].map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
            </div>
            <div className="flex gap-2">
              <Button>Save Changes</Button>
              <Button variant="outline">Upload Photos</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amenities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm text-muted-foreground">Select amenities offered</div>
            <div className="flex gap-2 flex-wrap">
              {['Parking','Locker Rooms','Drinking Water','Coaching','Showers'].map(a => (
                <Badge key={a} variant="outline" className="cursor-pointer">{a}</Badge>
              ))}
            </div>
            <Button className="mt-2">Update Amenities</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacilityManagement;
