'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import { useSubscription } from './hooks/useSubscription';
import { authService } from './services/authService';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginPage from './components/auth/Login';

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();
  const { plan } = useSubscription();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('payment') === 'success') {
      setShowSuccessMsg(true);
      router.replace('/');
    }
  }, [searchParams, router]);

  if (authLoading) return <main className="flex items-center justify-center min-h-screen"><p>Đang tải...</p></main>;

  if (!user) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <LoginPage />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-6 relative bg-gray-50 dark:bg-gray-900">
      {showSuccessMsg && (
        <div className="absolute top-10 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-lg animate-bounce">
          <p className="font-bold text-lg">✅ Thanh toán thành công!</p>
          <button onClick={() => setShowSuccessMsg(false)} className="text-sm underline mt-2">Đóng</button>
        </div>
      )}



      <div className="flex flex-col items-center text-center">
        {user.photoURL && (
          <img src={user.photoURL} alt="Avatar" className="w-24 h-24 rounded-full shadow-lg mb-4" />
        )}
        <h1 className="text-3xl font-bold">Chào mừng, {user.displayName}!</h1>
        <p className="text-gray-500">{user.email}</p>

        <div className="mt-3 px-4 py-1 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-full text-sm font-semibold shadow-sm">
          👑 Gói hiện tại: {plan}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4 items-center justify-center">
        <Link
          href="/dashboard"
          className="w-40 text-center bg-blue-500 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-600 transition font-semibold"
        >
          Xem Dashboard
        </Link>

        <Link
          href="/create"
          className="w-40 text-center bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 transition font-semibold"
        >
          Tạo Link Mới
        </Link>

        <Link
          href="/pricing"
          className="w-40 text-center bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition font-semibold"
        >
          Nâng cấp
        </Link>
      </div>
      <button
        onClick={authService.logout}
        className="mt-8 bg-gray-300 dark:bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        Đăng xuất
      </button>
    </main>
  );
}