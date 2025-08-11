import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth" replace />;
  if (user.role !== "admin") {
    const target =
      user.role === "facility_owner" ? "/dashboard/facility" : "/dashboard/user";
    return <Navigate to={target} replace />;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Helmet>
        <title>Admin Dashboard | QuickCourt</title>
        <meta name="description" content="Admin dashboard for managing users, facilities, and bookings on QuickCourt." />
        <link rel="canonical" href="/dashboard/admin" />
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of platform metrics and moderation actions.</p>
      </header>

      <main className="space-y-6">
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12,486</p>
              <p className="text-xs text-muted-foreground mt-1">+327 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Facility Owners</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">214</p>
              <p className="text-xs text-muted-foreground mt-1">+6 new approvals</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Active Courts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1,032</p>
              <p className="text-xs text-muted-foreground mt-1">Across 68 facilities</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">89,745</p>
              <p className="text-xs text-muted-foreground mt-1">1,245 in the last 24h</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Booking Activity (7d)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 text-center">
                {[
                  { d: 'Mon', v: 1650 },
                  { d: 'Tue', v: 1720 },
                  { d: 'Wed', v: 1685 },
                  { d: 'Thu', v: 1792 },
                  { d: 'Fri', v: 1940 },
                  { d: 'Sat', v: 2105 },
                  { d: 'Sun', v: 1953 },
                ].map((x) => (
                  <div key={x.d} className="space-y-2">
                    <div className="h-28 w-full bg-primary/15 rounded-md relative overflow-hidden">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-primary"
                        style={{ height: `${(x.v / 2200) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">{x.d}</div>
                    <div className="text-xs font-medium">{x.v.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Registrations (7d)</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                {[
                  { d: 'Mon', v: 42 },
                  { d: 'Tue', v: 57 },
                  { d: 'Wed', v: 51 },
                  { d: 'Thu', v: 63 },
                  { d: 'Fri', v: 78 },
                  { d: 'Sat', v: 95 },
                  { d: 'Sun', v: 69 },
                ].map((x) => (
                  <li key={x.d} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{x.d}</span>
                    <span className="px-2 py-0.5 rounded bg-secondary/20 text-secondary-foreground text-xs">
                      {x.v} new users
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="secondary" size="sm">
                  <Link to="/admin/facility-approval">Facility Approval</Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link to="/admin/users">User Management</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Moderation Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>• 2 facility approvals pending</li>
                <li>• 1 reported review awaiting action</li>
                <li>• 3 user verifications to review</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
