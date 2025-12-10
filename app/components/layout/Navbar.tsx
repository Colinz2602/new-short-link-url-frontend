'use client';

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';

export default function Navbar() {
    const { user } = useAuth();

    if (!user) return null;

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-xl font-bold text-blue-600">
                        MyLinkApp
                    </Link>
                    <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Link href="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
                        <Link href="/create" className="hover:text-blue-600 transition">Tạo Link</Link>
                        <Link href="/pricing" className="hover:text-blue-600 transition">Nâng cấp</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-sm font-bold">{user.displayName}</span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                    {user.photoURL && (
                        <img
                            src={user.photoURL}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border border-gray-200"
                        />
                    )}
                    <button
                        onClick={authService.logout}
                        className="text-sm text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition border border-transparent hover:border-red-100"
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </header>
    );
}