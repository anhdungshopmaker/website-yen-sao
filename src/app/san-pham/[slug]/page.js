import Link from 'next/link';
import { ShoppingCart, PhoneCall, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

// Tạm thời mockup data (Giai đoạn sau sẽ call từ Supabase)
function getProductBySlug(slug) {
  return {
    name: "Yến Sào Tinh Chế Loại 1",
    slug: slug,
    price: 4050000,
    original_price: 4500000,
    discount_percent: 10,
    short_description: "Yến sào tinh chế loại 1 được nhặt lông hoàn toàn thủ công từ những tổ yến già vùng biển Nha Trang. Các sợi yến dài, dai, khi chưng nở nhiều và có hương vị thơm ngon đặc trưng.",
    content: "<h3>Thành phần</h3><p>100% yến sào nguyên chất Nha Trang.</p><h3>Cách dùng</h3><ul><li>Ngâm yến trong nước sạch khoảng 30-40 phút cho nở mềm.</li><li>Chưng cách thủy với đường phèn, hạt sen, táo đỏ khoảng 20 phút.</li><li>Nên ăn lúc bụng đói vào buổi sáng hoặc tối trước khi ngủ.</li></ul><h3>Cách bảo quản</h3><p>Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Hạn dùng 2 năm kể từ ngày đóng gói.</p>",
    images: ['/mock1.jpg', '/mock2.jpg']
  };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return {
    title: `${product.name} | Yến Sào Miền Biển Nguyên Chất`,
    description: product.short_description
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return (
    <main className="container fade-in">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": product.images,
            "description": product.short_description,
            "offers": {
              "@type": "Offer",
              "priceCurrency": "VND",
              "price": product.price,
              "availability": "https://schema.org/InStock"
            }
          })
        }}
      />

      <div className={styles.productDetailGrid}>
        {/* Gallery Trái */}
        <div className={styles.imageGallery}>
          <div className={styles.mainImage}>
             <span style={{color: '#999'}}>Hình ảnh chính (Zoom on hover later)</span>
          </div>
          <div className={styles.thumbnailList}>
            <div className={`${styles.thumbnail} ${styles.active}`}>Hình 1</div>
            <div className={styles.thumbnail}>Hình 2</div>
            <div className={styles.thumbnail}>Hình 3</div>
          </div>
        </div>

        {/* Thông tin Phải */}
        <div className={styles.productInfo}>
          <h1>{product.name}</h1>
          
          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>{product.price.toLocaleString('vi-VN')}đ</span>
            {product.original_price && (
              <span className={styles.originalPrice}>{product.original_price.toLocaleString('vi-VN')}đ</span>
            )}
            {product.discount_percent > 0 && (
              <span className={styles.discountBadge}>-{product.discount_percent}%</span>
            )}
          </div>

          <div className={styles.shortContent}>
             <p>{product.short_description}</p>
             <ul>
               <li><CheckCircle2 size={16} color="var(--color-primary)" style={{marginRight: 8, display: 'inline', verticalAlign: 'text-bottom'}}/> 100% Khai thác tại Nha Trang - Khánh Hòa.</li>
               <li><CheckCircle2 size={16} color="var(--color-primary)" style={{marginRight: 8, display: 'inline', verticalAlign: 'text-bottom'}}/> Không phụ gia, không chất bảo quản.</li>
               <li><CheckCircle2 size={16} color="var(--color-primary)" style={{marginRight: 8, display: 'inline', verticalAlign: 'text-bottom'}}/> Giao hàng nhanh toàn quốc.</li>
             </ul>
          </div>

          <div className={styles.actionButtons}>
            <button className={`btn btn-primary ${styles.btnBuyNow}`}>Mua Ngay</button>
            <button className={`btn ${styles.btnAddToCart}`}>
              <ShoppingCart size={20} style={{marginRight: 8}}/> Thêm Giỏ Hàng
            </button>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
             <Link href="https://zalo.me" target="_blank" className="btn btn-outline" style={{width: '100%'}}>
               <PhoneCall size={20} style={{marginRight: 8}}/> Tư vấn thêm qua Zalo
             </Link>
          </div>
        </div>
      </div>

      {/* Chi tiết nội dung chuẩn SEO */}
      <div className={styles.fullContentSection}>
         <h2>Thông tin chi tiết sản phẩm</h2>
         <div 
           className={styles.contentBody} 
           dangerouslySetInnerHTML={{ __html: product.content }} 
         />
      </div>
      
      {/* Sản phẩm liên quan sẽ được thêm sau */}
    </main>
  );
}
