'use client';

import { useParams } from 'next/navigation';
import { useAnalytics } from '../../hooks/useAnalytics';

import AnalyticsCharts from '../../components/analytics/AnalyticsCharts';
import QRCodeCard from '../../components/analytics/QRCodeCard';
import AnalyticsLoading from '../../components/analytics/AnalyticsLoading';
import AnalyticsError from '../../components/analytics/AnalyticsError';
import AnalyticsHeader from '../../components/analytics/AnalyticsHeader';

export default function LinkAnalyticsPage() {
    const params = useParams();
    const linkId = params?.linkId as string;

    const { data, loading, error, authLoading } = useAnalytics(linkId);

    if (authLoading || loading) {
        return <AnalyticsLoading />;
    }

    if (error) {
        return <AnalyticsError message={error} />;
    }

    if (!data) return null;

    return (
        <main className="min-h-screen bg-brand-dark text-white relative overflow-hidden pb-20">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-8">
                {/* Header Section */}
                <AnalyticsHeader
                    shortUrl={data.link.full_short_url}
                    originalUrl={data.link.original_url}
                />

                {/* Charts Section */}
                <AnalyticsCharts
                    data={data.analytics}
                    aiInsights={data.link.ai_insights}
                    linkId={data.link.id}
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