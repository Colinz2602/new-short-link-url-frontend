'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import ToolsIntro from '../../components/platform/smarttools/ToolsIntro';
import ToolsIllustration from '../../components/platform/smarttools/ToolsIllustration';
import Navbar from '../../components/Navbar/Navbar';
import { useAuth } from '../../context/AuthContext';

export default function ToolsPlatformPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            const hasReloaded = sessionStorage.getItem('tools_page_reloaded');

            if (!hasReloaded) {
                sessionStorage.setItem('tools_page_reloaded', 'true');
                window.location.reload();
            } else {
                router.push('/tool');
            }
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <main className="min-h-screen bg-brand-dark flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
                    <p className="text-gray-400 text-sm">Synchronizing account...</p>
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
                    <ToolsIntro />
                    <div className="hidden lg:block">
                        <ToolsIllustration />
                    </div>
                </div>
            </div>
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-800/20 rounded-full blur-[120px]"></div>
            </div>
        </main>
    );
}