import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/lib/auth';
import { Eye, EyeOff, Mail, Lock, User, UserCheck } from 'lucide-react';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export const SignupForm = ({ onSwitchToLogin }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user' as UserRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <Card className="w-full max-w-md card-gradient border-border/50">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-gradient-secondary">
          Join QuickCourt
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Create your account to start booking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground font-medium">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-10 bg-input/50 border-border focus:border-secondary"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10 bg-input/50 border-border focus:border-secondary"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10 bg-input/50 border-border focus:border-secondary"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-foreground font-medium">
              Account Type
            </Label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
              <Select
                value={formData.role}
                onValueChange={(value: UserRole) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="pl-10 bg-input/50 border-border focus:border-secondary">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Sports Player</SelectItem>
                  <SelectItem value="facility_owner">Facility Owner</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full btn-bounce bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-secondary hover:text-secondary/90 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};