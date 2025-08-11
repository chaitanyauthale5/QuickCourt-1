import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export type UserRole = 'user' | 'facility_owner' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
  isLoading: boolean;
  pendingVerification: boolean;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users data
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'user@quickcourt.com',
    name: 'John Doe',
    role: 'user',
    isVerified: true,
  },
  {
    id: '2',
    email: 'owner@quickcourt.com',
    name: 'Sarah Johnson',
    role: 'facility_owner',
    isVerified: true,
  },
  {
    id: '3',
    email: 'admin@quickcourt.com',
    name: 'Mike Admin',
    role: 'admin',
    isVerified: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('quickcourt_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = DEMO_USERS.find(u => u.email === email);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('quickcourt_user', JSON.stringify(foundUser));
      toast.success('Login successful!');
      setIsLoading(false);
      return true;
    } else {
      toast.error('Invalid credentials. Try password123');
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = DEMO_USERS.find(u => u.email === data.email);
    if (existingUser) {
      toast.error('User already exists');
      setIsLoading(false);
      return false;
    }

    // Create new user (unverified)
    const newUser: User = {
      id: Date.now().toString(),
      ...data,
      isVerified: false,
    };

    setPendingUser(newUser);
    setPendingVerification(true);
    setIsLoading(false);
    toast.success('Please verify your email with OTP');
    return true;
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otp === '123456' && pendingUser) {
      const verifiedUser = { ...pendingUser, isVerified: true };
      setUser(verifiedUser);
      localStorage.setItem('quickcourt_user', JSON.stringify(verifiedUser));
      setPendingVerification(false);
      setPendingUser(null);
      toast.success('Account verified successfully!');
      setIsLoading(false);
      return true;
    } else {
      toast.error('Invalid OTP. Use 123456');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quickcourt_user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      verifyOTP,
      isLoading,
      pendingVerification,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};