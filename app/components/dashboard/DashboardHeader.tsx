'use client';

import Link from 'next/link';
import { Plus, Sparkles } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

export default function DashboardHeader() {
    return (
        <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400 text-sm">Overview of your links and performance</p>
                </div>

                <div className="flex gap-3">
                    <Link
                        href="/tool/script-generator"
                        className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-900/20 group"
                    >
                        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        <span>AI Generator</span>
                    </Link>

                    <Link
                        href="/create"
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors border border-white/10"
                    >
                        <Plus className="w-4 h-4" />
                        <span>New Link</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}