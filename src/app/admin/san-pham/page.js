'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from '../admin.module.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for Form
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    price: '',
    original_price: '',
    short_description: '',
    content: ''
  });

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Tự động tạo slug nếu đang nhập name
      ...(name === 'name' ? { slug: convertToSlug(value) } : {})
    }));
  };

  const convertToSlug = (text) => {
    return text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Cấu trúc data gửi lên db, ép kiểu number cho price
    const newProduct = {
      name: formData.name,
      slug: formData.slug,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      short_description: formData.short_description,
      content: formData.content
    };

    const { error } = await supabase.from('products').insert([newProduct]);

    if (error) {
      alert("Lỗi khi thêm sản phẩm: " + error.message);
    } else {
      alert("Đã thêm sản phẩm thành công!");
      fetchProducts(); // Refresh danh sách
      // Reset form
      setFormData({ name: '', slug: '', price: '', original_price: '', short_description: '', content: '' });
    }
  };

  return (
    <div>
      <h1 className={styles.headerTitle}>Quản lý Sản Phẩm</h1>

      {/* Form Thêm Sản Phẩm */}
      <div className={styles.adminCard}>
        <h2 style={{marginBottom: 20}}>Thêm Sản Phẩm Mới</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2" style={{gap: '1rem'}}>
          <div className={styles.formGroup}>
            <label>Tên Sản Phẩm (*)</label>
            <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className={styles.formInput} placeholder="VD: Yến Sào Tinh Chế" />
          </div>
          <div className={styles.formGroup}>
            <label>Đường dẫn (Slug) tự động</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className={styles.formInput} />
          </div>
          <div className={styles.formGroup}>
            <label>Giá bán (VNĐ) (*)</label>
            <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className={styles.formInput} placeholder="4050000" />
          </div>
          <div className={styles.formGroup}>
            <label>Giá gốc (VNĐ) - Dùng để tính % giảm giá</label>
            <input type="number" name="original_price" value={formData.original_price} onChange={handleInputChange} className={styles.formInput} placeholder="4500000" />
          </div>
          <div className={styles.formGroup} style={{gridColumn: 'span 2'}}>
            <label>Mô tả ngắn gọn (SEO)</label>
            <textarea rows="2" name="short_description" value={formData.short_description} onChange={handleInputChange} className={styles.formInput} placeholder="Nhập tóm tắt..." />
          </div>
          <div className={styles.formGroup} style={{gridColumn: 'span 2'}}>
            <label>Nội dung chi tiết sản phẩm (Hỗ trợ HTML)</label>
            <textarea rows="5" name="content" value={formData.content} onChange={handleInputChange} className={styles.formInput} placeholder="<h3>Thành phần</h3><p>...</p>" />
          </div>
          <div style={{gridColumn: 'span 2'}}>
            <button type="submit" className="btn btn-primary">Lưu Sản Phẩm</button>
          </div>
        </form>
      </div>

      {/* Danh sách Sản Phẩm */}
      <div className={styles.adminCard}>
        <h2 style={{marginBottom: 20}}>Danh sách hiện có</h2>
        {loading ? <p>Đang tải dữ liệu từ Supabase...</p> : (
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Giá bán</th>
                <th>% Giảm</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong><br/><small style={{color: '#7f8c8d'}}>{p.slug}</small></td>
                  <td>{p.price.toLocaleString('vi-VN')}đ</td>
                  <td>{p.discount_percent}%</td>
                  <td>
                    <button className={styles.actionBtn}>Sửa</button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>Chưa có sản phẩm nào. Hãy thêm ở trên.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
