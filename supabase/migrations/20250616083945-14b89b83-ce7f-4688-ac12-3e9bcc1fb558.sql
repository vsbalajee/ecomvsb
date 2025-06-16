
-- Create admin user profile and assign admin role
-- First, we need to insert the user into profiles (this assumes the user will sign up with this email)
-- Then assign admin role using the make_user_admin function

-- The make_user_admin function will handle creating the admin role
-- This will work once the user signs up with the specified email
SELECT public.make_user_admin('vsbalaajee@gmail.com');
