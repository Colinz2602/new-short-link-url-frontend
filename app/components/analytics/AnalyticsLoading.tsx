import React from 'react';

export default function AnalyticsLoading() {
    return (
        <main className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-white relative overflow-hidden">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400 font-medium text-lg animate-pulse">Loading analytics...</p>
        </main>
    );
}