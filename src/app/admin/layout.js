'use client';
import Link from 'next/link';
import { Package, ShoppingBag, FileText, LayoutDashboard, LogOut } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './admin.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (!session && !isLoginPage) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized) return null; // Avoid flicker

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    router.push('/admin/login');
  };

  // Nếu đang ở trang login, render mộc cho full màn hình không có sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

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
           <button onClick={handleLogout} className={styles.menuItem} style={{ borderLeft: 'none', color: '#E74C3C', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none' }}>
             <LogOut size={20} /> Đăng xuất
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  );
}
