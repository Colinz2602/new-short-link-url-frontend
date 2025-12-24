'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar/Navbar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen bg-brand-dark text-white">Đang tải...</div>;
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-brand-dark text-white">
            <Navbar />
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}