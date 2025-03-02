import { useState } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export function SignUp() {
  const { openSignUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Basic validation
      if (!email || !password || !confirmPassword) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({
          title: "Error",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return;
      }

      // Password validation
      if (password !== confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      if (password.length < 6) {
        toast({
          title: "Error",
          description: "Password must be at least 6 characters long",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      await openSignUp(email, password);
      
      // Success toast is now handled in the AuthContext
      
    } catch (error) {
      console.error('SignUp Error:', error);
      // Error toast is now handled in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="w-full max-w-md mx-4">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Sign up to start your personalized diet journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-medium hover:text-primary"
                  onClick={() => navigate('/signin')}
                >
                  Sign In
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 