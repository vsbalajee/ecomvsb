
import { useMemo } from 'react';
import { Progress } from '@/components/ui/progress';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

interface PasswordStrength {
  score: number;
  feedback: string[];
  color: string;
  label: string;
}

const PasswordStrengthIndicator = ({ password, className }: PasswordStrengthIndicatorProps) => {
  const strength = useMemo((): PasswordStrength => {
    if (!password) {
      return { score: 0, feedback: [], color: 'bg-gray-300', label: '' };
    }

    let score = 0;
    const feedback: string[] = [];

    // Length check
    if (password.length >= 8) {
      score += 25;
    } else {
      feedback.push('At least 8 characters');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 25;
    } else {
      feedback.push('One uppercase letter');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 25;
    } else {
      feedback.push('One lowercase letter');
    }

    // Number or special character check
    if (/[\d\W]/.test(password)) {
      score += 25;
    } else {
      feedback.push('One number or special character');
    }

    // Bonus points for very strong passwords
    if (password.length >= 12) score += 10;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 10;
    if (/\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 10;

    score = Math.min(100, score);

    let color = 'bg-red-500';
    let label = 'Weak';

    if (score >= 75) {
      color = 'bg-green-500';
      label = 'Strong';
    } else if (score >= 50) {
      color = 'bg-yellow-500';
      label = 'Medium';
    }

    return { score, feedback, color, label };
  }, [password]);

  if (!password) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-2">
        <Progress 
          value={strength.score} 
          className="flex-1 h-2"
        />
        <span className={`text-xs font-medium ${
          strength.score >= 75 ? 'text-green-600' : 
          strength.score >= 50 ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {strength.label}
        </span>
      </div>
      
      {strength.feedback.length > 0 && (
        <div className="text-xs text-gray-600">
          <span>Missing: </span>
          {strength.feedback.join(', ')}
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
