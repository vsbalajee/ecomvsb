
export const SECURITY_CONFIG = {
  // Password requirements
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REQUIRE_UPPERCASE: true,
  PASSWORD_REQUIRE_LOWERCASE: true,
  PASSWORD_REQUIRE_NUMBER: true,
  PASSWORD_REQUIRE_SPECIAL: true,
  
  // Rate limiting
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
  
  // File upload limits
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  
  // Content validation
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_TITLE_LENGTH: 100,
  
  // Security headers
  CONTENT_SECURITY_POLICY: {
    'default-src': ["'self'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'style-src': ["'self'", "'unsafe-inline'"],
    'script-src': ["'self'"],
    'connect-src': ["'self'", 'https://*.supabase.co'],
  }
};

export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .substring(0, SECURITY_CONFIG.MAX_DESCRIPTION_LENGTH);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validatePassword = (password: string): boolean => {
  if (password.length < SECURITY_CONFIG.PASSWORD_MIN_LENGTH) return false;
  
  if (SECURITY_CONFIG.PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) return false;
  if (SECURITY_CONFIG.PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(password)) return false;
  if (SECURITY_CONFIG.PASSWORD_REQUIRE_NUMBER && !/\d/.test(password)) return false;
  if (SECURITY_CONFIG.PASSWORD_REQUIRE_SPECIAL && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;
  
  return true;
};

export const isValidImageFile = (file: File): boolean => {
  return SECURITY_CONFIG.ALLOWED_IMAGE_TYPES.includes(file.type) && 
         file.size <= SECURITY_CONFIG.MAX_FILE_SIZE;
};
