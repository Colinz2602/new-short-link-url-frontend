import Link from 'next/link';
import { ChevronLeft, Link2, ExternalLink } from 'lucide-react';

interface AnalyticsHeaderProps {
    shortUrl: string;
    originalUrl: string;
}

export default function AnalyticsHeader({ shortUrl, originalUrl }: AnalyticsHeaderProps) {
    return (
        <div className="mb-10">
            <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-6 group px-4 py-2 rounded-lg hover:bg-white/5 w-fit"
            >
                <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span className="font-medium">Back to list</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-teal-400 to-green-400">
                            {shortUrl.replace(/^https?:\/\//, '')}
                        </span>
                    </h1>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition">
                            <Link2 className="w-4 h-4 text-blue-400" />
                            <span className="truncate max-w-[200px] md:max-w-[400px]" title={originalUrl}>
                                {originalUrl}
                            </span>
                            <a
                                href={originalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-blue-300 ml-1 p-1"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}