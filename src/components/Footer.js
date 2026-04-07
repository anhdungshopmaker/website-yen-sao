import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerCol}>
            <h3>Yến Sào Miền Biển Nguyên Chất</h3>
            <p>Công ty Yến Thành chuyên cung cấp các sản phẩm yến sào Nha Trang - Khánh Hòa cao cấp, cam kết 100% nguyên chất, không tạp chất, mang lại giá trị dinh dưỡng cao nhất cho sức khỏe của bạn.</p>
          </div>
          <div className={styles.footerCol}>
            <h3>Chính sách</h3>
            <ul>
              <li><Link href="/#">Chính sách mua hàng</Link></li>
              <li><Link href="/#">Chính sách đổi trả</Link></li>
              <li><Link href="/#">Chính sách bảo mật</Link></li>
              <li><Link href="/#">Kiểm định chất lượng</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h3>Liên hệ</h3>
            <p><strong>Hotline / Zalo:</strong> 0909 123 456</p>
            <p><strong>Địa chỉ:</strong> Lộc Thọ, TP. Nha Trang, Tỉnh Khánh Hòa</p>
            <p><strong>Email:</strong> info@yenthanh.com.vn</p>
          </div>
        </div>
        <div className={styles.bottom}>
          &copy; {new Date().getFullYear()} Công ty Yến Thành. Tất cả các quyền được bảo lưu. Thiết kế hệ thống quản trị chuyên nghiệp.
        </div>
      </div>
    </footer>
  );
}
