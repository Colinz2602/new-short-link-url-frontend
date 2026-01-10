'use client';

import { useState } from 'react';
import { Copy, Check, ExternalLink, AlertCircle, Globe } from 'lucide-react';

interface ResultCardProps {
    error: string | null;
    successResult: string | null;
    geoRulesCount: number;
}

export default function ResultCard({ error, successResult, geoRulesCount }: ResultCardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (successResult) {
            try {
                await navigator.clipboard.writeText(successResult);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy!', err);
            }
        }
    };

    if (error) {
        return (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span>{error}</span>
            </div>
        );
    }

    if (successResult) {
        return (
            <div className="mt-8 relative overflow-hidden bg-linear-to-br from-teal-900/20 to-blue-900/20 border border-teal-500/30 rounded-2xl p-6 md:p-8 text-center animate-in fade-in slide-in-from-bottom-4 shadow-2xl shadow-teal-900/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>

                <div className="flex flex-col items-center gap-4">
                    <div className="bg-teal-500/20 p-3 rounded-full text-teal-300 mb-2">
                        <Check className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-br from-teal-200 to-blue-200">
                        Your link is ready!
                    </h3>

                    {geoRulesCount > 0 && (
                        <div className="flex items-center gap-1 text-xs font-medium text-teal-400/80 bg-teal-500/10 px-3 py-1 rounded-full">
                            <Globe className="w-3 h-3" />
                            {geoRulesCount} geo targeting rule{geoRulesCount > 1 ? 's' : ''} configured
                        </div>
                    )}

                    <div className="w-full max-w-2xl mt-4 flex flex-col md:flex-row items-stretch gap-3">
                        <div className="flex-1 bg-gray-900/60 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between group hover:border-teal-500/50 transition">
                            <a
                                href={successResult}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-300 font-medium text-lg truncate hover:text-blue-200 transition mr-2"
                            >
                                {successResult}
                            </a>
                            <a
                                href={successResult}
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-500 hover:text-white transition opacity-0 group-hover:opacity-100"
                                title="Open link"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>

                        <button
                            onClick={handleCopy}
                            className={`
                                flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all transform active:scale-95
                                ${copied
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                                    : 'bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/20'
                                }
                            `}
                        >
                            {copied ? (
                                <>
                                    <Check className="w-5 h-5" /> Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="w-5 h-5" /> Copy Link
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}