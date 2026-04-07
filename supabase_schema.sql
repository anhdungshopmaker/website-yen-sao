-- ==========================================
-- SUPABASE SCHEMA CHO YẾN SÀO WEBSITE
-- ==========================================

-- 1. Bảng Products (Sản phẩm)
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  content TEXT,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  discount_percent INTEGER GENERATED ALWAYS AS (
    CASE 
      WHEN original_price > 0 AND price < original_price THEN 
        ROUND(((original_price - price) / original_price) * 100)
      ELSE 0 
    END
  ) STORED,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Bảng Orders (Đơn hàng)
CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bảng Order_Items (Chi tiết đơn hàng - Bổ sung thêm để quản lý các sản phẩm trong đơn)
CREATE TABLE order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL,
  price_at_time DECIMAL(10, 2) NOT NULL
);

-- 3. Bảng Blog Posts (Bài viết)
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Bảng Admin Users (Người quản trị)
-- (Khuyến nghị sử dụng Supabase Auth tích hợp sẵn thay vì tự lưu mật khẩu)
-- Bảng này có thể dùng để phân quyền tài khoản Auth nào là Admin
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Row Level Security (RLS) Policies
-- Cho phép bất kỳ ai đọc Products và Blog Posts (để hiển thị trên Web)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cho phép đọc sản phẩm công khai" ON products FOR SELECT USING (true);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cho phép đọc blog công khai" ON blog_posts FOR SELECT USING (true);

-- Khách hàng chỉ có thể tạo đơn hàng, không được xem đơn hàng người khác
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Khách hàng có thể tạo đơn" ON orders FOR INSERT WITH CHECK (true);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Khách hàng có thể tạo chi tiết đơn" ON order_items FOR INSERT WITH CHECK (true);

-- CHÚ Ý: Bạn cần tạo Policies riêng cho Admin để thêm/sửa/xoá (INSERT/UPDATE/DELETE).
