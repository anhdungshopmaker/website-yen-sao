'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import styles from '../admin.module.css';

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for Form
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: ''
  });

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const convertToSlug = (text) => {
    return text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' ? { slug: convertToSlug(value) } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newPost = {
      title: formData.title,
      slug: formData.slug,
      content: formData.content
      // image: Cần tích hợp Supabase Storage để quản trị upload ảnh sau
    };

    const { error } = await supabase.from('blog_posts').insert([newPost]);

    if (error) {
      alert("Lỗi khi đăng bài viết: " + error.message);
    } else {
      alert("Đăng bài viết mới thành công!");
      fetchPosts();
      setFormData({ title: '', slug: '', content: '' });
    }
  };

  return (
    <div>
      <h1 className={styles.headerTitle}>Quản lý Tin tức / Blog</h1>
      
      <div className={styles.adminCard}>
        <h2 style={{marginBottom: 20}}>Viết Bài Mới (Chuẩn SEO)</h2>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div className={styles.formGroup}>
            <label>Tiêu đề bài viết (*)</label>
            <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className={styles.formInput} placeholder="VD: Tác dụng của Yến Sào đối với trẻ em" />
          </div>
          <div className={styles.formGroup}>
            <label>Đường dẫn URL tự động tĩnh (Slug)</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleInputChange} className={styles.formInput} />
          </div>
          <div className={styles.formGroup}>
            <label>Nội dung bài viết (HTML) (*)</label>
            <textarea required rows="10" name="content" value={formData.content} onChange={handleInputChange} className={styles.formInput} placeholder="<h1>...</h1>" />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{alignSelf: 'flex-start'}}>Xuất bản bài viết</button>
        </form>
      </div>

      <div className={styles.adminCard}>
        <h2 style={{marginBottom: 20}}>Danh sách bài viết</h2>
        {loading ? <p>Đang tải dữ liệu...</p> : (
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th style={{width: '40%'}}>Tiêu đề</th>
                <th>Đường dẫn</th>
                <th>Ngày đăng</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td><strong>{post.title}</strong></td>
                  <td>/{post.slug}</td>
                  <td>{new Date(post.created_at).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <button className={styles.actionBtn}>Sửa</button>
                    <button className={`${styles.actionBtn} ${styles.delete}`}>Xoá</button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>Chưa có bài viết nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
