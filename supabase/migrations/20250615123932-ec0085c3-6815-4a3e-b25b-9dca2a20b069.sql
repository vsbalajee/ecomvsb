
-- First, let's check what categories we have and clean up any orphaned products
-- Delete products that reference non-existent categories
DELETE FROM public.products 
WHERE category_id IS NOT NULL 
AND category_id NOT IN (SELECT id FROM public.categories);

-- Delete products that reference non-existent suppliers
DELETE FROM public.products 
WHERE supplier_id IS NOT NULL 
AND supplier_id NOT IN (SELECT id FROM public.suppliers);

-- Now add the foreign key constraints safely
DO $$ 
BEGIN
    -- Add category foreign key constraint if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'products_category_id_fkey'
    ) THEN
        ALTER TABLE public.products 
        ADD CONSTRAINT products_category_id_fkey 
        FOREIGN KEY (category_id) REFERENCES public.categories(id);
    END IF;
    
    -- Add supplier foreign key constraint if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'products_supplier_id_fkey'
    ) THEN
        ALTER TABLE public.products 
        ADD CONSTRAINT products_supplier_id_fkey 
        FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id);
    END IF;
END $$;

-- Now safely insert additional dummy products
INSERT INTO public.products (name, description, price, category_id, supplier_id, image_url, sku, stock_quantity) 
SELECT * FROM (VALUES
    -- Electronics
    ('iPad Pro 12.9"', 'Professional tablet with M2 chip and Liquid Retina display', 1099.99, (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'TechCorp Solutions' LIMIT 1), 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', 'IPADPRO129', 25),
    ('Sony WH-1000XM5', 'Industry-leading noise canceling wireless headphones', 399.99, (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'TechCorp Solutions' LIMIT 1), 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400', 'SONYWH1000XM5', 35),
    ('Nintendo Switch OLED', 'Gaming console with vibrant OLED screen', 349.99, (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'TechCorp Solutions' LIMIT 1), 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 'SWITCHOLED', 45),
    
    -- Clothing
    ('Leather Wallet', 'Premium genuine leather bifold wallet', 49.99, (SELECT id FROM categories WHERE name = 'Clothing' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Fashion Forward Inc' LIMIT 1), 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400', 'LEATHERWALLET', 150),
    ('Wool Sweater', 'Comfortable merino wool sweater for all seasons', 89.99, (SELECT id FROM categories WHERE name = 'Clothing' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Fashion Forward Inc' LIMIT 1), 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400', 'WOOLSWEATER', 80),
    ('Designer Jeans', 'Premium denim jeans with perfect fit', 119.99, (SELECT id FROM categories WHERE name = 'Clothing' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Fashion Forward Inc' LIMIT 1), 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400', 'DESIGNERJEANS', 65),
    
    -- Home & Garden
    ('Robot Vacuum', 'Smart robot vacuum with app control and mapping', 299.99, (SELECT id FROM categories WHERE name = 'Home & Garden' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Home & Garden Co' LIMIT 1), 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', 'ROBOTVACUUM', 30),
    ('Air Purifier', 'HEPA air purifier for clean and fresh air', 199.99, (SELECT id FROM categories WHERE name = 'Home & Garden' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Home & Garden Co' LIMIT 1), 'https://images.unsplash.com/photo-1585338447937-7082f8fc763d?w=400', 'AIRPURIFIER', 40),
    ('Standing Desk', 'Adjustable height standing desk for better health', 449.99, (SELECT id FROM categories WHERE name = 'Home & Garden' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Home & Garden Co' LIMIT 1), 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', 'STANDINGDESK', 20),
    
    -- Sports & Outdoors
    ('Mountain Bike', 'Professional mountain bike for trail adventures', 899.99, (SELECT id FROM categories WHERE name = 'Sports & Outdoors' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Sports Equipment Ltd' LIMIT 1), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 'MOUNTAINBIKE', 15),
    ('Swimming Goggles', 'Professional swimming goggles with anti-fog coating', 29.99, (SELECT id FROM categories WHERE name = 'Sports & Outdoors' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Sports Equipment Ltd' LIMIT 1), 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400', 'SWIMGOGGLES', 100),
    ('Hiking Backpack', 'Durable hiking backpack with multiple compartments', 149.99, (SELECT id FROM categories WHERE name = 'Sports & Outdoors' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Sports Equipment Ltd' LIMIT 1), 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 'HIKINGBACKPACK', 55),
    
    -- Health & Beauty
    ('Electric Toothbrush', 'Smart electric toothbrush with multiple modes', 79.99, (SELECT id FROM categories WHERE name = 'Health & Beauty' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Fashion Forward Inc' LIMIT 1), 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400', 'ELECTRICTOOTHBRUSH', 70),
    ('Skincare Set', 'Complete skincare routine set for all skin types', 129.99, (SELECT id FROM categories WHERE name = 'Health & Beauty' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Fashion Forward Inc' LIMIT 1), 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400', 'SKINCARESET', 85),
    ('Hair Dryer Pro', 'Professional ionic hair dryer with multiple attachments', 159.99, (SELECT id FROM categories WHERE name = 'Health & Beauty' LIMIT 1), (SELECT id FROM suppliers WHERE name = 'Fashion Forward Inc' LIMIT 1), 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400', 'HAIRDRYERPRO', 40)
) AS new_products(name, description, price, category_id, supplier_id, image_url, sku, stock_quantity)
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE sku = new_products.sku);
