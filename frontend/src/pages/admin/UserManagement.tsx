import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/lib/auth';
import { Navigate } from 'react-router-dom';

const UserManagement = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;

  const users = [
    { id: 'u1', name: 'Rahul', email: 'user@quickcourt.com', role: 'user', status: 'active' },
    { id: 'u2', name: 'Sneha', email: 'owner@quickcourt.com', role: 'facility_owner', status: 'active' },
    { id: 'u3', name: 'Aisha', email: 'aisha@example.com', role: 'user', status: 'banned' },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet><title>User Management | QuickCourt</title></Helmet>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Input placeholder="Search by name or email" className="md:col-span-2" />
        <Select>
          <SelectTrigger className="bg-background/50"><SelectValue placeholder="Filter by role" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="facility_owner">Facility Owner</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader><CardTitle>Users</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {users.map(u => (
            <div key={u.id} className="flex items-center justify-between border border-border/50 rounded-md p-3 bg-card/50">
              <div>
                <div className="font-medium">{u.name} · {u.role}</div>
                <div className="text-xs text-muted-foreground">{u.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`text-xs ${u.status === 'banned' ? 'text-destructive' : 'text-muted-foreground'}`}>{u.status}</div>
                {u.status === 'banned' ? (
                  <Button size="sm" className="bg-secondary hover:bg-secondary/90">Unban</Button>
                ) : (
                  <Button size="sm" variant="destructive">Ban</Button>
                )}
                <Button size="sm" variant="outline">History</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
