'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './login.module.css';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError("Email hoặc Mật khẩu không đúng! Hãy kiểm tra lại tài khoản trên Supabase.");
      setLoading(false);
    } else {
      localStorage.setItem('admin_session', 'true');
      router.push('/admin');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h1>Trang Quản Trị</h1>
        <p>Hệ thống nội bộ Yến Thành</p>
        
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <div>
            <label>Tài khoản (Email / Username)</label>
            <input 
              type="text" 
              className={styles.loginInput} 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@yenthanh.com"
              required 
            />
          </div>
          
          <div>
            <label>Mật khẩu</label>
            <input 
              type="password" 
              className={styles.loginInput} 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>

          <button type="submit" className={`btn btn-primary ${styles.loginBtn}`} disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng Nhập"}
          </button>

          {error && <div className={styles.errorMsg}>{error}</div>}
        </form>
      </div>
    </div>
  );
}
