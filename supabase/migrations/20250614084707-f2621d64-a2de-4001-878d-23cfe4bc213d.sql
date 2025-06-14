
-- Create suppliers table
CREATE TABLE public.suppliers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  supplier_id UUID REFERENCES public.suppliers(id),
  image_url TEXT,
  sku TEXT UNIQUE,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for suppliers (public read, no write for now)
CREATE POLICY "Anyone can view suppliers" ON public.suppliers FOR SELECT USING (true);

-- Create policies for categories (public read)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);

-- Create policies for products (public read)
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);

-- Create policies for cart items (users can only see/modify their own cart)
CREATE POLICY "Users can view their own cart items" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own cart items" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own cart items" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own cart items" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Create policies for orders (users can only see their own orders)
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for order items (users can only see items from their own orders)
CREATE POLICY "Users can view their own order items" ON public.order_items FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Insert dummy data for suppliers
INSERT INTO public.suppliers (name, email, phone, address) VALUES
('TechCorp Solutions', 'contact@techcorp.com', '+1-555-0101', '123 Tech Street, Silicon Valley, CA'),
('Fashion Forward Inc', 'orders@fashionforward.com', '+1-555-0102', '456 Style Ave, New York, NY'),
('Home & Garden Co', 'sales@homeandgarden.com', '+1-555-0103', '789 Garden Blvd, Portland, OR'),
('Sports Equipment Ltd', 'info@sportsequip.com', '+1-555-0104', '321 Athletic Way, Denver, CO'),
('Book World Publishers', 'publisher@bookworld.com', '+1-555-0105', '654 Library Lane, Boston, MA');

-- Insert dummy data for categories
INSERT INTO public.categories (name, description) VALUES
('Electronics', 'Smartphones, laptops, tablets, and electronic accessories'),
('Clothing', 'Fashion apparel for men, women, and children'),
('Home & Garden', 'Home improvement, furniture, and gardening supplies'),
('Sports & Outdoors', 'Sports equipment, outdoor gear, and fitness products'),
('Books', 'Fiction, non-fiction, educational, and reference books'),
('Health & Beauty', 'Personal care, cosmetics, and health products');

-- Insert dummy data for products
INSERT INTO public.products (name, description, price, category_id, supplier_id, image_url, sku, stock_quantity) VALUES
-- Electronics
('iPhone 15 Pro', 'Latest iPhone with advanced camera system and A17 Pro chip', 999.99, (SELECT id FROM categories WHERE name = 'Electronics'), (SELECT id FROM suppliers WHERE name = 'TechCorp Solutions'), 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 'IPHONE15PRO', 50),
('MacBook Air M2', 'Lightweight laptop with M2 chip and all-day battery life', 1199.99, (SELECT id FROM categories WHERE name = 'Electronics'), (SELECT id FROM suppliers WHERE name = 'TechCorp Solutions'), 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 'MACBOOKAIRM2', 30),
('Samsung Galaxy S24', 'Premium Android smartphone with AI features', 849.99, (SELECT id FROM categories WHERE name = 'Electronics'), (SELECT id FROM suppliers WHERE name = 'TechCorp Solutions'), 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', 'GALAXYS24', 40),
('AirPods Pro', 'Wireless earbuds with active noise cancellation', 249.99, (SELECT id FROM categories WHERE name = 'Electronics'), (SELECT id FROM suppliers WHERE name = 'TechCorp Solutions'), 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400', 'AIRPODSPRO', 100),

-- Clothing
('Classic Denim Jacket', 'Timeless denim jacket perfect for any season', 79.99, (SELECT id FROM categories WHERE name = 'Clothing'), (SELECT id FROM suppliers WHERE name = 'Fashion Forward Inc'), 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', 'DENIMJACKET', 75),
('Cotton T-Shirt Pack', 'Pack of 3 premium cotton t-shirts in various colors', 29.99, (SELECT id FROM categories WHERE name = 'Clothing'), (SELECT id FROM suppliers WHERE name = 'Fashion Forward Inc'), 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', 'TSHIRTPACK3', 200),
('Running Sneakers', 'Comfortable running shoes with advanced cushioning', 129.99, (SELECT id FROM categories WHERE name = 'Clothing'), (SELECT id FROM suppliers WHERE name = 'Fashion Forward Inc'), 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 'RUNSNEAKERS', 60),

-- Home & Garden
('Coffee Maker Deluxe', 'Programmable coffee maker with thermal carafe', 159.99, (SELECT id FROM categories WHERE name = 'Home & Garden'), (SELECT id FROM suppliers WHERE name = 'Home & Garden Co'), 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400', 'COFFEEMAKER', 25),
('Ergonomic Office Chair', 'Comfortable office chair with lumbar support', 299.99, (SELECT id FROM categories WHERE name = 'Home & Garden'), (SELECT id FROM suppliers WHERE name = 'Home & Garden Co'), 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', 'OFFICECHAIR', 15),
('Smart LED Light Bulbs', 'Set of 4 smart LED bulbs with app control', 49.99, (SELECT id FROM categories WHERE name = 'Home & Garden'), (SELECT id FROM suppliers WHERE name = 'Home & Garden Co'), 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400', 'SMARTBULBS4', 80),

-- Sports & Outdoors
('Yoga Mat Premium', 'Non-slip yoga mat with alignment guides', 39.99, (SELECT id FROM categories WHERE name = 'Sports & Outdoors'), (SELECT id FROM suppliers WHERE name = 'Sports Equipment Ltd'), 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', 'YOGAMAT', 90),
('Camping Tent 4-Person', 'Waterproof camping tent for family adventures', 189.99, (SELECT id FROM categories WHERE name = 'Sports & Outdoors'), (SELECT id FROM suppliers WHERE name = 'Sports Equipment Ltd'), 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400', 'TENT4PERSON', 20),
('Fitness Tracker Watch', 'Advanced fitness tracker with heart rate monitoring', 199.99, (SELECT id FROM categories WHERE name = 'Sports & Outdoors'), (SELECT id FROM suppliers WHERE name = 'Sports Equipment Ltd'), 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', 'FITNESSWATCH', 45),

-- Books
('The Complete JavaScript Guide', 'Comprehensive guide to modern JavaScript development', 49.99, (SELECT id FROM categories WHERE name = 'Books'), (SELECT id FROM suppliers WHERE name = 'Book World Publishers'), 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400', 'JSGUIDE', 100),
('Mystery Novel Collection', 'Set of 5 bestselling mystery novels', 79.99, (SELECT id FROM categories WHERE name = 'Books'), (SELECT id FROM suppliers WHERE name = 'Book World Publishers'), 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', 'MYSTERYSET5', 50),
('Cooking Masterclass Book', 'Professional cooking techniques and recipes', 34.99, (SELECT id FROM categories WHERE name = 'Books'), (SELECT id FROM suppliers WHERE name = 'Book World Publishers'), 'https://images.unsplash.com/photo-1544716278-e513176f20c5?w=400', 'COOKINGBOOK', 75);
