
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, Shield } from 'lucide-react';
import PasswordStrengthIndicator from '@/components/PasswordStrengthIndicator';
import { useRateLimit } from '@/hooks/useRateLimit';
import { validateEmail, validatePassword, sanitizeInput } from '@/utils/security';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const rateLimit = useRateLimit('auth');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rateLimit.isLocked) {
      const remainingTime = Math.ceil(rateLimit.getRemainingTime() / 1000 / 60);
      toast({
        title: "Account Temporarily Locked",
        description: `Too many failed attempts. Try again in ${remainingTime} minutes.`,
        variant: "destructive"
      });
      return;
    }
    
    if (!validateEmail(loginData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (!loginData.password) {
      toast({
        title: "Password Required",
        description: "Please enter your password.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        rateLimit.recordAttempt(false);
        
        // Enhanced error handling
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Login Failed",
            description: `Invalid email or password. ${rateLimit.remainingAttempts} attempts remaining.`,
            variant: "destructive"
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Verified",
            description: "Please check your email and click the verification link before signing in.",
            variant: "destructive"
          });
        } else if (error.message.includes('Too many requests')) {
          toast({
            title: "Too Many Attempts",
            description: "Too many login attempts. Please wait a few minutes before trying again.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Login Error",
            description: error.message || "An unexpected error occurred during login.",
            variant: "destructive"
          });
        }
      } else {
        rateLimit.recordAttempt(true);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in."
        });
        navigate('/');
      }
    } catch (error) {
      rateLimit.recordAttempt(false);
      toast({
        title: "Network Error",
        description: "Please check your internet connection and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(signupData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    const sanitizedName = sanitizeInput(signupData.fullName);
    if (!sanitizedName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive"
      });
      return;
    }

    if (!validatePassword(signupData.password)) {
      toast({
        title: "Password Too Weak",
        description: "Password must meet all security requirements shown below.",
        variant: "destructive"
      });
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure both passwords are identical.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(signupData.email, signupData.password, sanitizedName);
      
      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Try signing in instead.",
            variant: "destructive"
          });
        } else if (error.message.includes('Password should be')) {
          toast({
            title: "Password Requirements",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Signup Error",
            description: error.message || "An unexpected error occurred during signup.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account before signing in."
        });
        // Clear form
        setSignupData({
          email: '',
          password: '',
          confirmPassword: '',
          fullName: ''
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Please check your internet connection and try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600">Krish's Amazon</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
          {rateLimit.isLocked && (
            <div className="flex items-center justify-center text-red-600 text-sm mt-2">
              <Shield className="h-4 w-4 mr-1" />
              Account temporarily locked due to multiple failed attempts
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    value={loginData.email} 
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} 
                    required 
                    autoComplete="email"
                    disabled={rateLimit.isLocked}
                  />
                </div>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    value={loginData.password} 
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} 
                    required 
                    autoComplete="current-password"
                    disabled={rateLimit.isLocked}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={rateLimit.isLocked}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {!rateLimit.isLocked && rateLimit.remainingAttempts < 5 && (
                  <div className="text-sm text-yellow-600">
                    {rateLimit.remainingAttempts} attempts remaining before account lockout
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-orange-500 hover:bg-orange-600" 
                  disabled={loading || rateLimit.isLocked}
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign In
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Input 
                    type="text" 
                    placeholder="Full Name" 
                    value={signupData.fullName} 
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })} 
                    required 
                    autoComplete="name"
                    maxLength={100}
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    value={signupData.email} 
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} 
                    required 
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Password" 
                      value={signupData.password} 
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} 
                      required 
                      autoComplete="new-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <PasswordStrengthIndicator password={signupData.password} />
                </div>
                <div className="relative">
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="Confirm Password" 
                    value={signupData.confirmPassword} 
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })} 
                    required 
                    autoComplete="new-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
