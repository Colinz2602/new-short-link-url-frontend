'use client';

import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar/Navbar';

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
        <div className="min-h-screen bg-brand-dark text-white">
            <Navbar />
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}