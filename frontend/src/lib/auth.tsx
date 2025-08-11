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

// Base API URL
const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('quickcourt_user');
    const storedToken = localStorage.getItem('quickcourt_token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Optionally, we could validate token by calling /me here.
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err?.error || 'Login failed');
        return false;
      }
      const data = await res.json();
      const mapped: User = {
        id: data.user._id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        isVerified: !!data.user.isVerified,
        avatar: data.user.avatar,
      };
      setUser(mapped);
      localStorage.setItem('quickcourt_user', JSON.stringify(mapped));
      if (data.token) localStorage.setItem('quickcourt_token', data.token);
      toast.success('Login successful!');
      return true;
    } catch (e) {
      console.error(e);
      toast.error('Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/signup/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
        })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        let msg = typeof err?.error === 'string' ? err.error : 'Signup failed';
        // Try to surface Zod issues, if present
        const issues = (err as any)?.issues;
        if (issues && typeof issues === 'object') {
          const fieldErrors = (issues as any).fieldErrors || {};
          const formErrors = (issues as any).formErrors || [];
          const firstField = Object.keys(fieldErrors)[0];
          const firstFieldMsg = firstField && Array.isArray(fieldErrors[firstField]) ? fieldErrors[firstField][0] : undefined;
          const firstFormMsg = Array.isArray(formErrors) ? formErrors[0] : undefined;
          msg = firstFieldMsg || firstFormMsg || msg;
        }
        toast.error(msg);
        return false;
      }
      // Expect { message: 'OTP sent...' }
      setPendingVerification(true);
      setPendingEmail(data.email);
      toast.success('OTP sent to your email');
      return true;
    } catch (e) {
      console.error(e);
      toast.error('Signup failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    if (!pendingEmail) {
      toast.error('No signup in progress');
      return false;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/signup/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail, otp })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = typeof err?.error === 'string' ? err.error : 'OTP verification failed';
        toast.error(msg);
        return false;
      }
      const data = await res.json();
      const mapped: User = {
        id: data.user._id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
        isVerified: !!data.user.isVerified,
        avatar: data.user.avatar,
      };
      setUser(mapped);
      localStorage.setItem('quickcourt_user', JSON.stringify(mapped));
      if (data.token) localStorage.setItem('quickcourt_token', data.token);
      setPendingVerification(false);
      setPendingEmail(null);
      toast.success('Signup verified!');
      return true;
    } catch (e) {
      console.error(e);
      toast.error('OTP verification failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quickcourt_user');
    localStorage.removeItem('quickcourt_token');
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