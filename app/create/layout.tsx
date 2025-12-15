'use client';

import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';

export default function CreateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { loading } = useAuth();
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <div className="py-6">
                {children}
            </div>
        </div>
    );
}