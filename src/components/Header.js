import Link from 'next/link';
import styles from './Header.module.css';
import { User } from 'lucide-react';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logoGroup}>
          <div className={styles.logoCircle}>
            <img src="/logo.png" alt="Công ty Yến Thành" />
          </div>
          <span className={styles.logoText}>YẾN SÀO YẾN THÀNH</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Trang chủ</Link>
          <Link href="/san-pham" className={styles.navLink}>Sản phẩm</Link>
          <Link href="/tin-tuc" className={styles.navLink}>Tin tức</Link>
          <Link href="/gioi-thieu" className={styles.navLink}>Giới thiệu</Link>
          <Link href="/lien-he" className={styles.navLink}>Liên hệ</Link>
          <Link href="/admin/login" className={`btn btn-outline ${styles.loginBtn}`}>
            <User size={16} style={{ marginRight: '5px' }} /> Đăng nhập
          </Link>
        </nav>
      </div>
    </header>
  );
}
