import styles from './admin.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className={styles.headerTitle}>Tổng quan (Dashboard)</h1>
      
      <div className="grid grid-cols-3">
        <div className={styles.adminCard}>
          <h3 style={{ color: '#7f8c8d' }}>Tổng Sản Phẩm</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>12</p>
        </div>
        <div className={styles.adminCard}>
          <h3 style={{ color: '#7f8c8d' }}>Đơn Hàng Mới</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#27ae60' }}>5</p>
        </div>
        <div className={styles.adminCard}>
          <h3 style={{ color: '#7f8c8d' }}>Bài Viết Blog</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2980b9' }}>8</p>
        </div>
      </div>

      <div className={styles.adminCard}>
         <h2 style={{ marginBottom: 15 }}>Hướng dẫn sử dụng Admin</h2>
         <p>Chào mừng bạn đến với hệ thống quản trị website Yến Sào Miền Biển. Tại đây bạn có thể:</p>
         <ul style={{ marginLeft: 20, marginTop: 10, lineHeight: 1.8 }}>
            <li><strong>Quản lý sản phẩm:</strong> Thêm, sửa giá sản phẩm, điền mô tả chuẩn SEO.</li>
            <li><strong>Quản lý blog:</strong> Đăng bài viết tin tức để tăng thứ hạng tìm kiếm.</li>
            <li><strong>Đơn hàng:</strong> Theo dõi các yêu cầu mua hàng từ khách.</li>
         </ul>
      </div>
    </div>
  );
}
