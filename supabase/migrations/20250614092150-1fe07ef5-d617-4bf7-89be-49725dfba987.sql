
-- Phase 1: Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view categories" ON public.categories;
DROP POLICY IF EXISTS "Anyone can view suppliers" ON public.suppliers;
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Users can view their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can insert their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can update their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can delete their own cart items" ON public.cart_items;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;

-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- Create function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
  ON public.user_roles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" 
  ON public.user_roles 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage user roles" 
  ON public.user_roles 
  FOR ALL 
  USING (public.has_role(auth.uid(), 'admin'));

-- Phase 2: Fix data integrity issues
ALTER TABLE public.cart_items ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE public.orders ALTER COLUMN user_id SET NOT NULL;

-- Add proper foreign key constraints (only if they don't exist)
DO $$
BEGIN
  -- Add foreign key constraints only if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_cart_items_user') THEN
    ALTER TABLE public.cart_items ADD CONSTRAINT fk_cart_items_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_cart_items_product') THEN
    ALTER TABLE public.cart_items ADD CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_orders_user') THEN
    ALTER TABLE public.orders ADD CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_order_items_order') THEN
    ALTER TABLE public.order_items ADD CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_order_items_product') THEN
    ALTER TABLE public.order_items ADD CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES public.products(id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_products_category') THEN
    ALTER TABLE public.products ADD CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES public.categories(id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_products_supplier') THEN
    ALTER TABLE public.products ADD CONSTRAINT fk_products_supplier FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id);
  END IF;
END
$$;

-- Phase 3: Create comprehensive RLS policies
CREATE POLICY "Admins can manage all products" 
  ON public.products 
  FOR ALL 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view active products" 
  ON public.products 
  FOR SELECT 
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view categories" 
  ON public.categories 
  FOR SELECT 
  USING (true);

CREATE POLICY "Admins can insert categories" 
  ON public.categories 
  FOR INSERT 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update categories" 
  ON public.categories 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete categories" 
  ON public.categories 
  FOR DELETE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage suppliers" 
  ON public.suppliers 
  FOR ALL 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own orders" 
  ON public.orders 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all orders" 
  ON public.orders 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update order status" 
  ON public.orders 
  FOR UPDATE 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own order items" 
  ON public.order_items 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Users can create order items for their orders" 
  ON public.order_items 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.orders 
    WHERE orders.id = order_items.order_id 
    AND orders.user_id = auth.uid()
  ));

CREATE POLICY "Admins can view all order items" 
  ON public.order_items 
  FOR SELECT 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can manage their own cart items" 
  ON public.cart_items 
  FOR ALL 
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);

-- Phase 4: Add validation constraints (only if they don't exist)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.check_constraints WHERE constraint_name = 'check_price_positive') THEN
    ALTER TABLE public.products ADD CONSTRAINT check_price_positive CHECK (price > 0);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.check_constraints WHERE constraint_name = 'check_stock_non_negative') THEN
    ALTER TABLE public.products ADD CONSTRAINT check_stock_non_negative CHECK (stock_quantity >= 0);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.check_constraints WHERE constraint_name = 'check_quantity_positive') THEN
    ALTER TABLE public.cart_items ADD CONSTRAINT check_quantity_positive CHECK (quantity > 0);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.check_constraints WHERE constraint_name = 'check_order_quantity_positive') THEN
    ALTER TABLE public.order_items ADD CONSTRAINT check_order_quantity_positive CHECK (quantity > 0);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.check_constraints WHERE constraint_name = 'check_unit_price_positive') THEN
    ALTER TABLE public.order_items ADD CONSTRAINT check_unit_price_positive CHECK (unit_price > 0);
  END IF;
END
$$;

-- Phase 5: Create atomic inventory management function
CREATE OR REPLACE FUNCTION public.process_checkout(
  cart_items_data JSONB,
  shipping_address_param TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  order_id UUID;
  cart_item JSONB;
  product_record RECORD;
  total_amount DECIMAL(10,2) := 0;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated';
  END IF;

  IF shipping_address_param IS NULL OR trim(shipping_address_param) = '' THEN
    RAISE EXCEPTION 'Shipping address is required';
  END IF;

  INSERT INTO public.orders (user_id, total_amount, shipping_address, status)
  VALUES (auth.uid(), 0, shipping_address_param, 'pending')
  RETURNING id INTO order_id;

  FOR cart_item IN SELECT * FROM jsonb_array_elements(cart_items_data)
  LOOP
    SELECT id, name, price, stock_quantity
    INTO product_record
    FROM public.products 
    WHERE id = (cart_item->>'product_id')::UUID 
      AND is_active = true
    FOR UPDATE;

    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product not found or inactive: %', cart_item->>'product_id';
    END IF;

    IF product_record.stock_quantity < (cart_item->>'quantity')::INTEGER THEN
      RAISE EXCEPTION 'Insufficient stock for product %. Available: %, Requested: %', 
        product_record.name, 
        product_record.stock_quantity, 
        (cart_item->>'quantity')::INTEGER;
    END IF;

    UPDATE public.products 
    SET stock_quantity = stock_quantity - (cart_item->>'quantity')::INTEGER,
        updated_at = NOW()
    WHERE id = product_record.id;

    INSERT INTO public.order_items (order_id, product_id, quantity, unit_price)
    VALUES (
      order_id,
      product_record.id,
      (cart_item->>'quantity')::INTEGER,
      product_record.price
    );

    total_amount := total_amount + (product_record.price * (cart_item->>'quantity')::INTEGER);
  END LOOP;

  UPDATE public.orders 
  SET total_amount = total_amount,
      updated_at = NOW()
  WHERE id = order_id;

  DELETE FROM public.cart_items WHERE user_id = auth.uid();

  RETURN order_id;
END;
$$;

-- Create admin user management function
CREATE OR REPLACE FUNCTION public.make_user_admin(user_email TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_user_id UUID;
BEGIN
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      RAISE EXCEPTION 'Only admins can create new admins';
    END IF;
  END IF;

  SELECT id INTO target_user_id 
  FROM public.profiles 
  WHERE email = user_email;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found with email: %', user_email;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;

-- Add trigger for automatic role assignment
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON public.profiles
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user_role();
