import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { ShieldCheck, MapPin, Feather, PhoneCall } from 'lucide-react';

export default function Home() {
  return (
    <main className="fade-in">
      {/* Banner Khởi Đầu */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Yến Sào Miền Biển <br/>
            Nguyên Chất
          </h1>
          <div style={{ marginTop: '20px' }}>
             <p className={styles.heroSubtitle}>Thu hoạch từ những nhà yến lâu năm tại Nha Trang - Khánh Hoà.<br/> Chắt lọc tinh hoa từ tự nhiên, mang đến sức khỏe vàng cho bạn và gia đình.</p>
          </div>
        </div>
      </section>

      {/* Unique Selling Proposition (USP) */}
      <section className={`container ${styles.section}`}>
        <div style={{ textAlign: 'center' }}>
           <div className={styles.titleGlassPill}>
             <h2 className={styles.sectionTitle}>Tại sao chọn Yến Thành?</h2>
           </div>
        </div>
        <div className={styles.uspGrid}>
          <div className={styles.uspCard}>
            <ShieldCheck size={48} className={styles.uspIcon} />
            <h3 style={{ color: '#1A365D', fontWeight: 700 }}>100% Nguyên Chất</h3>
            <p>Cam kết tổ yến thật, không sử dụng chất độn hay hóa chất bảo quản.</p>
          </div>
          <div className={styles.uspCard}>
            <Award size={48} className={styles.uspIcon} />
            <h3 style={{ color: '#1A365D', fontWeight: 700 }}>Đạt Chuẩn An Toàn</h3>
            <p>Quy trình tinh chế khép kín, đảm bảo giữ nguyên dinh dưỡng trong yến.</p>
          </div>
          <div className={styles.uspCard}>
            <Truck size={48} className={styles.uspIcon} />
            <h3 style={{ color: '#1A365D', fontWeight: 700 }}>Giao Hàng Tận Nơi</h3>
            <p>Đóng gói sang trọng, bảo quản tiêu chuẩn, giao hàng siêu tốc toàn quốc.</p>
          </div>
        </div>
      </section>

      {/* Sản Phẩm Nổi Bật */}
      <section className={`container ${styles.section}`}>
        <div style={{ textAlign: 'center' }}>
           <div className={styles.titleGlassPill}>
             <h2 className={styles.sectionTitle}>Sản Phẩm Nổi Bật</h2>
           </div>
        </div>
        <div className={styles.productGrid}>
          {/* Mockup Product 1 */}
          <Link href="/san-pham/yen-tinh-che-loai-1" className={styles.productCard}>
            <div className={styles.productImgBox}>
              <div className={styles.discountBadge}>-10%</div>
               {/* Thay bằng Image component sau khi có URL hình */}
               <span style={{color: '#999'}}>Hình Ảnh Yến</span>
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>Yến Sào Tinh Chế Loại 1 (100g)</h3>
              <div>
                <span className={styles.originalPrice}>4.500.000đ</span>
                <span className={styles.productPrice}>4.050.000đ</span>
              </div>
            </div>
          </Link>

          {/* Mockup Product 2 */}
          <Link href="/san-pham/yen-tho-nguyen-to" className={styles.productCard}>
            <div className={styles.productImgBox}>
               <span style={{color: '#999'}}>Hình Ảnh Yến</span>
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>Yến Thô Nguyên Tổ (100g)</h3>
              <div>
                <span className={styles.productPrice}>3.800.000đ</span>
              </div>
            </div>
          </Link>

          {/* Mockup Product 3 */}
          <Link href="/san-pham/yen-huyet-cao-cap" className={styles.productCard}>
            <div className={styles.productImgBox}>
              <div className={styles.discountBadge}>-5%</div>
               <span style={{color: '#999'}}>Hình Ảnh Yến Thượng Hạng</span>
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>Huyết Yến Cao Cấp (50g)</h3>
              <div>
                <span className={styles.originalPrice}>6.000.000đ</span>
                <span className={styles.productPrice}>5.700.000đ</span>
              </div>
            </div>
          </Link>

          {/* Mockup Product 4 */}
          <Link href="/san-pham/chan-yen-tinh-che" className={styles.productCard}>
            <div className={styles.productImgBox}>
               <span style={{color: '#999'}}>Hình Ảnh Chân Yến</span>
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productTitle}>Chân Yến Tinh Chế (100g)</h3>
              <div>
                <span className={styles.productPrice}>3.500.000đ</span>
              </div>
            </div>
          </Link>
        </div>
        <div className={styles.ctaWrapper}>
          <Link href="/san-pham" className="btn btn-outline">Xem tất cả sản phẩm</Link>
        </div>
      </section>

      {/* Đánh Giá Khách Hàng */}
      <section className={`container ${styles.section}`}>
        <div style={{ textAlign: 'center' }}>
           <div className={styles.titleGlassPill}>
             <h2 className={styles.sectionTitle}>Khách Hàng Nói Gì Về Chúng Tôi</h2>
           </div>
        </div>
        <div className={styles.reviewGrid}>
          <div className={styles.reviewCard}>
            <p>"Yến sào ở đây rất sạch, khi chưng lên nở rất nhiều và thơm ngon. Mình mua cho ba mẹ bồi bổ, cả nhà đều khen."</p>
            <div className={styles.reviewer}>- Chị Mai Trang, Hà Nội</div>
          </div>
          <div className={styles.reviewCard}>
            <p>"Tôi đã tin dùng Yến Thành hơn 2 năm nay. Chất lượng luôn ổn định, đặc biệt là yến tinh chế rất tiện lợi, không mất thời gian nhặt lông."</p>
            <div className={styles.reviewer}>- Anh Hoàng Nam, TP.HCM</div>
          </div>
          <div className={styles.reviewCard}>
            <p>"Giao hàng nhanh chóng và đóng gói cực kỳ cẩn thận. Giá cả cũng rất hợp lý so với chất lượng nguyên chất nhận được."</p>
            <div className={styles.reviewer}>- Cô Linh Chi, Đà Nẵng</div>
          </div>
        </div>
      </section>
    </main>
  );
}
