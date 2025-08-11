import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CourtManagement = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Court Management</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Court</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Court Name" />
            <Select>
              <SelectTrigger className="bg-background/50"><SelectValue placeholder="Sport Type" /></SelectTrigger>
              <SelectContent>
                {['Badminton','Table Tennis','Tennis','Basketball','Football','Squash'].map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Pricing per hour (₹)" />
            <Input placeholder="Operating hours (e.g. 06:00-22:00)" />
            <Button>Add Court</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Courts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Court 1', sport: 'Badminton', price: 1200, hours: '06:00-22:00' },
              { name: 'Court 2', sport: 'Badminton', price: 1200, hours: '06:00-22:00' },
              { name: 'Table 1', sport: 'Table Tennis', price: 600, hours: '07:00-21:00' },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between border border-border/50 rounded-md p-3">
                <div>
                  <div className="font-medium">{c.name} · {c.sport}</div>
                  <div className="text-xs text-muted-foreground">₹{c.price}/hr · {c.hours}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="destructive">Delete</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourtManagement;
