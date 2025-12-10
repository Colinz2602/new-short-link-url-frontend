'use client';

import { useState } from "react";
import { authService } from "../../services/authService";
import Link from "next/link";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            await authService.signInWithGoogle();
        } catch (err: any) {
            setError('Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full mx-auto">
            <h1 className="text-2xl font-bold text-center">Đăng nhập</h1>
            {error && (
                <div className="text-red-600 bg-red-100 px-4 py-2 rounded-lg text-sm w-full text-center">
                    {error}
                </div>
            )}

            <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-70"
            >
                {loading ? 'Đang xử lý...' : (
                    <>
                        <span>Đăng nhập với Google</span>
                    </>
                )}
            </button>

            <Link
                href="/pricing"
                className="mt-2 text-sm text-gray-500 hover:text-blue-600 hover:underline transition"
            >
                Xem bảng giá dịch vụ
            </Link>
        </div>
    );
}