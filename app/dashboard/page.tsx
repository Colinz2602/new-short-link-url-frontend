'use client';

import { useState } from 'react';
import { useMyLinks } from '../hooks/useMyLinks';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import LinkList from '../components/dashboard/LinkList';
import Pagination from '../components/dashboard/Pagination';

export default function DashboardPage() {
    const {
        links, loading, error,
        page, setPage, pageCount, authLoading
    } = useMyLinks();

    const [copiedId, setCopiedId] = useState<number | null>(null);

    const handleCopy = (text: string, id: number) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] text-blue-400">
                <div className="animate-pulse flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-medium">Loading data...</span>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen w-full bg-brand-dark text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 space-y-8 pb-20">
                <DashboardHeader />


                {/* Error Display */}
                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        {error}
                    </div>
                )}

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    <LinkList
                        links={links}
                        loading={loading}
                        copiedId={copiedId}
                        onCopy={handleCopy}
                    />
                </div>

                <Pagination
                    page={page}
                    pageCount={pageCount}
                    setPage={setPage}
                />
            </div>
        </main>
    );
}