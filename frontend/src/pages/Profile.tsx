import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth';
import { Navigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Calendar, 
  MapPin, 
  Clock, 
  Edit, 
  Save,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from 'lucide-react';
import { toast } from 'sonner';

export const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      venueName: 'Ace Sports Complex',
      sport: 'Badminton',
      courtName: 'Court 1',
      date: '2024-01-25',
      time: '18:00 - 19:00',
      status: 'confirmed',
      price: 1200,
    },
    {
      id: 2,
      venueName: 'Court Champions',
      sport: 'Tennis',
      courtName: 'Court A',
      date: '2024-01-27',
      time: '16:00 - 17:00',
      status: 'confirmed',
      price: 1800,
    },
    {
      id: 3,
      venueName: 'Elite Badminton Center',
      sport: 'Badminton',
      courtName: 'Court 3',
      date: '2024-01-20',
      time: '19:00 - 20:00',
      status: 'completed',
      price: 1000,
    },
    {
      id: 4,
      venueName: 'Slam Dunk Arena',
      sport: 'Basketball',
      courtName: 'Main Court',
      date: '2024-01-15',
      time: '20:00 - 21:00',
      status: 'cancelled',
      price: 2000,
    },
  ];

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleSaveProfile = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    }, 1000);
  };

  const handleCancelBooking = (bookingId: number) => {
    toast.success('Booking cancelled successfully!');
    // In real app, this would update the state
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-secondary" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-info" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'secondary';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'destructive';
      default:
        return 'warning';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            My <span className="text-gradient-primary">Profile</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your account and view your bookings
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-card/50">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              My Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="card-gradient border-border/50">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-foreground">
                      {user.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {user.role === 'user' ? 'Sports Player' : 
                       user.role === 'facility_owner' ? 'Facility Owner' : 'Admin'}
                    </CardDescription>
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    className={isEditing ? "btn-bounce bg-secondary hover:bg-secondary/90" : ""}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditing}
                        className="pl-10 bg-background/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Account Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Account Type:</span>
                      <Badge variant="secondary">
                        {user.role === 'user' ? 'Sports Player' : 
                         user.role === 'facility_owner' ? 'Facility Owner' : 'Admin'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={user.isVerified ? "secondary" : "warning"}>
                        {user.isVerified ? 'Verified' : 'Pending Verification'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-foreground">
                  My Bookings ({bookings.length})
                </h2>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New Venue
                </Button>
              </div>

              <div className="grid gap-6">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="card-gradient border-border/50">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-foreground">
                              {booking.venueName}
                            </h3>
                            <Badge variant="outline">{booking.sport}</Badge>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(booking.status)}
                              <Badge 
                                variant={getStatusColor(booking.status) as any}
                                className="capitalize"
                              >
                                {booking.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4" />
                              <span>{booking.courtName}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>{booking.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-semibold text-secondary">
                              ₹{booking.price}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Total Amount
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            {booking.status === 'confirmed' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancel
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {bookings.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-muted/50 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No bookings yet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Start exploring venues and make your first booking
                  </p>
                  <Button className="btn-bounce bg-primary hover:bg-primary/90">
                    <Calendar className="h-4 w-4 mr-2" />
                    Browse Venues
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;