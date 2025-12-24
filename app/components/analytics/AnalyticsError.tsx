import Link from 'next/link';
import { AlertCircle, ChevronLeft } from 'lucide-react';

interface AnalyticsErrorProps {
    message: string;
}

export default function AnalyticsError({ message }: AnalyticsErrorProps) {
    return (
        <main className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
            <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-xl p-8 rounded-3xl max-w-lg w-full text-center shadow-2xl">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-200 mb-2">Failed to load analytics</h2>
                <p className="text-red-300/80 mb-8">{message}</p>
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 px-6 py-3 rounded-xl transition"
                >
                    <ChevronLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
            </div>
        </main>
    );
}