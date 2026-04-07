import Link from 'next/link';
import { Package, ShoppingBag, FileText, LayoutDashboard, LogOut } from 'lucide-react';
import styles from './admin.module.css';

export const metadata = {
  title: "Admin Dashboard - Yến Thành",
};

export default function AdminLayout({ children }) {
  // Demo layout không cần public Header/Footer của frontend
  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          Admin Yến Thành
        </div>
        <nav className={styles.navMenu}>
          <Link href="/admin" className={styles.menuItem}>
            <LayoutDashboard size={20} /> Tổng quan
          </Link>
          <Link href="/admin/san-pham" className={styles.menuItem}>
            <Package size={20} /> Quản lý sản phẩm
          </Link>
          <Link href="/admin/don-hang" className={styles.menuItem}>
            <ShoppingBag size={20} /> Quản lý đơn hàng
          </Link>
          <Link href="/admin/tin-tuc" className={styles.menuItem}>
            <FileText size={20} /> Quản lý Blog
          </Link>
        </nav>
        <div style={{ padding: '20px', marginTop: 'auto' }}>
           <Link href="/" className={styles.menuItem} style={{ borderLeft: 'none', color: '#E74C3C' }}>
             <LogOut size={20} /> Đăng xuất
           </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
}
