'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Navbar from '../../components/Navbar/Navbar';
import LinkManagementIllustration from '../../components/platform/linkmanagement/LinkManagementIllustration';
import LinkManagementIntro from '../../components/platform/linkmanagement/LinkManagementIntro';
import { useAuth } from '../../context/AuthContext';

export default function LinkManagementPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push('/dashboard');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <main className="min-h-screen bg-brand-dark flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                    <p className="text-gray-400 text-sm">Đang kiểm tra trạng thái...</p>
                </div>
            </main>
        );
    }
    if (user) return null;

    return (
        <main className="min-h-screen bg-brand-dark text-white overflow-hidden flex flex-col relative">
            <Navbar />

            <div className="flex-1 flex items-center justify-center relative z-10 px-4 md:px-8 py-10">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <LinkManagementIntro />

                    <div className="hidden lg:block animate-in slide-in-from-right-10 duration-700 delay-200">
                        <LinkManagementIllustration />
                    </div>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-800/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px]"></div>
            </div>
        </main>
    );
}