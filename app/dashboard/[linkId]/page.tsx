'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAnalytics } from '../../hooks/useAnalytics';
import AnalyticsCharts from '../../components/dashboard/AnalyticsCharts';
import QRCodeCard from '../../components/dashboard/QRCodeCard';

export default function LinkAnalyticsPage() {
    const params = useParams();
    const linkId = params?.linkId as string;

    const { data, loading, error, authLoading } = useAnalytics(linkId);

    if (authLoading || loading) {
        return <main className="flex items-center justify-center min-h-screen"><p>Đang tải dữ liệu...</p></main>;
    }

    if (error) {
        return (
            <main className="max-w-4xl mx-auto p-8 text-center">
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-4">{error}</div>
                <Link href="/dashboard" className="text-blue-600 hover:underline">&larr; Quay lại Dashboard</Link>
            </main>
        );
    }

    if (!data) return null;

    return (
        <main className="max-w-6xl mx-auto p-8">
            <div className="mb-6">
                <Link href="/dashboard" className="text-blue-600 hover:underline">
                    &larr; Quay lại Dashboard
                </Link>
                <h1 className="text-3xl font-bold mt-2 break-all">
                    Analytics cho: {data.link.full_short_url.replace('https://', '')}
                </h1>
                <a href={data.link.original_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 break-all hover:text-gray-700">
                    {data.link.original_url}
                </a>
            </div>

            {/* Truyền QRCodeCard vào bên trong AnalyticsCharts */}
            <div className="mb-6">
                <AnalyticsCharts
                    data={data.analytics}
                    rightSideContent={
                        <QRCodeCard
                            linkId={data.link.id}
                            fullShortUrl={data.link.full_short_url}
                            existingQrUrl={data.link.qr_image?.url}
                        />
                    }
                />
            </div>
        </main>
    );
}