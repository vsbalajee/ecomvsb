
-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS on reviews table
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for reviews
CREATE POLICY "Anyone can view reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can create their own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

-- Create content management table for admin
CREATE TABLE public.content_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on content pages
ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;

-- Create policies for content pages (public read, admin write)
CREATE POLICY "Anyone can view published pages" ON public.content_pages FOR SELECT USING (is_published = true);

-- Add admin policies (will work once admin role system is in place)
CREATE POLICY "Admins can manage content pages" ON public.content_pages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Create site settings table for admin configuration
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on site settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for site settings (admin only)
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

-- Insert dummy reviews for existing products
INSERT INTO public.reviews (user_id, product_id, rating, title, comment, is_verified_purchase) 
SELECT 
  (SELECT id FROM auth.users LIMIT 1),
  p.id,
  (FLOOR(RANDOM() * 5) + 1)::INTEGER,
  CASE 
    WHEN RANDOM() < 0.3 THEN 'Great product!'
    WHEN RANDOM() < 0.6 THEN 'Excellent quality'
    ELSE 'Love it!'
  END,
  CASE 
    WHEN RANDOM() < 0.2 THEN 'This product exceeded my expectations. Highly recommend!'
    WHEN RANDOM() < 0.4 THEN 'Good value for money. Fast delivery and great quality.'
    WHEN RANDOM() < 0.6 THEN 'Perfect for my needs. Would buy again.'
    WHEN RANDOM() < 0.8 THEN 'Amazing product! Great build quality and works as expected.'
    ELSE 'Fantastic purchase. The quality is outstanding and delivery was quick.'
  END,
  true
FROM public.products p
WHERE p.is_active = true;

-- Insert default site settings
INSERT INTO public.site_settings (key, value, description) VALUES
('site_name', 'ECOM', 'Website name'),
('site_description', 'Your one-stop shop for everything', 'Website description'),
('contact_email', 'support@ecom.com', 'Contact email'),
('phone_number', '+1-800-ECOM-SHOP', 'Phone number'),
('address', '123 Commerce St, Business City, BC 12345', 'Business address'),
('social_facebook', 'https://facebook.com/ecom', 'Facebook URL'),
('social_twitter', 'https://twitter.com/ecom', 'Twitter URL'),
('social_instagram', 'https://instagram.com/ecom', 'Instagram URL');

-- Add triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_content_pages_updated_at BEFORE UPDATE ON public.content_pages FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
