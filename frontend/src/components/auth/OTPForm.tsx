import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from '@/lib/auth';
import { Shield, ArrowLeft } from 'lucide-react';

interface OTPFormProps {
  onBack: () => void;
}

export const OTPForm = ({ onBack }: OTPFormProps) => {
  const [otp, setOtp] = useState('');
  const { verifyOTP, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      await verifyOTP(otp);
    }
  };

  return (
    <Card className="w-full max-w-md card-gradient border-border/50">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center mb-2">
          <Shield className="h-6 w-6 text-warning" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Verify Your Email
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter the 6-digit code sent to your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <InputOTP 
              maxLength={6} 
              value={otp} 
              onChange={setOtp}
              className="gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="border-border bg-input/50 focus:border-warning" />
                <InputOTPSlot index={1} className="border-border bg-input/50 focus:border-warning" />
                <InputOTPSlot index={2} className="border-border bg-input/50 focus:border-warning" />
                <InputOTPSlot index={3} className="border-border bg-input/50 focus:border-warning" />
                <InputOTPSlot index={4} className="border-border bg-input/50 focus:border-warning" />
                <InputOTPSlot index={5} className="border-border bg-input/50 focus:border-warning" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            type="submit"
            className="w-full btn-bounce bg-warning hover:bg-warning/90 text-warning-foreground font-semibold"
            disabled={isLoading || otp.length !== 6}
          >
            {isLoading ? 'Verifying...' : 'Verify & Continue'}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Demo OTP: 123456
            </p>
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to signup
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};