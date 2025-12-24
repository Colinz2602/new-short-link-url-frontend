'use client';

import { useState } from 'react';
import {
    CheckCircle2,
    XCircle,
    Copy,
    FileOutput,
    Filter,
    Check,
} from 'lucide-react';

interface ResultDetail {
    originalUrl: string;
    shortUrl?: string;
    error?: string;
    status: 'success' | 'failed';
}

interface BulkImportResultProps {
    result: {
        total: number;
        success: number;
        failed: number;
        details: ResultDetail[];
    };
}

export default function BulkImportResult({ result }: BulkImportResultProps) {
    const [filter, setFilter] = useState<'all' | 'success' | 'failed'>('all');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    // Lọc danh sách dựa trên tab đang chọn
    const filteredDetails = result.details.filter(item => {
        if (filter === 'success') return item.status === 'success';
        if (filter === 'failed') return item.status === 'failed';
        return true;
    });

    // Hàm copy link
    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-6">

            {/* Header & Stats Cards*/}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Card */}
                <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm font-medium">Total Rows</p>
                        <p className="text-3xl font-bold text-white mt-1">{result.total}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <FileOutput className="w-5 h-5" />
                    </div>
                </div>

                {/* Success Card */}
                <div className="bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                        <p className="text-emerald-400 text-sm font-medium">Successful</p>
                        <p className="text-3xl font-bold text-emerald-300 mt-1">{result.success}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                </div>

                {/* Failed Card */}
                <div className={`
            border p-4 rounded-2xl flex items-center justify-between transition-colors
            ${result.failed > 0
                        ? 'bg-red-900/20 border-red-500/30'
                        : 'bg-gray-800/30 border-gray-700 opacity-50'}
        `}>
                    <div>
                        <p className={`${result.failed > 0 ? 'text-red-400' : 'text-gray-400'} text-sm font-medium`}>
                            Failed
                        </p>
                        <p className={`${result.failed > 0 ? 'text-red-300' : 'text-gray-300'} text-3xl font-bold mt-1`}>
                            {result.failed}
                        </p>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${result.failed > 0
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-gray-700 text-gray-500'
                        }`}>
                        <XCircle className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Action Bar (Filter)*/}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-xl">
                {/* Filters */}
                <div className="flex bg-black/20 p-1 rounded-lg w-full md:w-auto">
                    {(['all', 'success', 'failed'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`
                        flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-all capitalize
                        ${filter === type
                                    ? 'bg-gray-700 text-white shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                    `}
                        >
                            {type === 'all'
                                ? 'All'
                                : type === 'success'
                                    ? 'Successful'
                                    : 'Failed'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Details List*/}
            <div className="bg-black/20 border border-white/5 rounded-2xl overflow-hidden max-h-[500px] overflow-y-auto custom-scrollbar">
                {filteredDetails.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No results found for this filter.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {filteredDetails.map((item, idx) => (
                            <div key={idx} className="p-4 hover:bg-white/5 transition-colors group">
                                <div className="flex items-start gap-4">
                                    {/* Status Icon */}
                                    <div className="mt-1 shrink-0">
                                        {item.status === 'success' ? (
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-500" />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 grid gap-1">
                                        {/* Original URL */}
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <span
                                                className="truncate max-w-[300px] md:max-w-md"
                                                title={item.originalUrl}
                                            >
                                                {item.originalUrl}
                                            </span>
                                        </div>

                                        {/* Result Row */}
                                        {item.status === 'success' ? (
                                            <div className="flex items-center gap-3">
                                                <a
                                                    href={item.shortUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-emerald-400 font-mono text-sm hover:underline truncate"
                                                >
                                                    {item.shortUrl}
                                                </a>

                                                {/* Copy Button */}
                                                <button
                                                    onClick={() => handleCopy(item.shortUrl!, idx)}
                                                    className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                    title="Copy link"
                                                >
                                                    {copiedIndex === idx ? (
                                                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                                                    ) : (
                                                        <Copy className="w-3.5 h-3.5" />
                                                    )}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-red-400 text-sm bg-red-500/10 px-2 py-1 rounded w-fit">
                                                Error: {item.error || 'Unknown error'}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="text-center text-xs text-gray-500 pt-2">
                Showing {filteredDetails.length} of {result.details.length} results
            </div>
        </div>
    );
}