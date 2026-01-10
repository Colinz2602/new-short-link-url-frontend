import Link from 'next/link';
import { ApiLink } from '../../types';
import { ExternalLink, Copy, Check, Calendar, BarChart2, MoreHorizontal } from 'lucide-react';

interface LinkItemProps {
    link: ApiLink;
    copiedId: number | null;
    onCopy: (text: string, id: number) => void;
}

export default function LinkItem({ link, copiedId, onCopy }: LinkItemProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit', month: '2-digit', year: 'numeric',
        });
    };

    return (
        <div className="group p-4 hover:bg-white/5 transition-colors grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Link Information */}
            <div className="col-span-1 md:col-span-5 flex flex-col gap-1 overflow-hidden">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                        <ExternalLink className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-2 min-w-0">
                        <a
                            href={link.full_short_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-400 font-bold text-lg hover:text-blue-300 truncate transition"
                        >
                            {link.full_short_url.replace(/^https?:\/\//, '')}
                        </a>
                        <button
                            onClick={() => onCopy(link.full_short_url, link.id)}
                            className="p-1.5 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition"
                            title="Copy link"
                        >
                            {copiedId === link.id
                                ? <Check className="w-4 h-4 text-green-400" />
                                : <Copy className="w-4 h-4" />
                            }
                        </button>
                    </div>
                </div>
                <p className="text-sm text-gray-500 truncate pl-11" title={link.original_url}>
                    {link.original_url}
                </p>
            </div>

            {/* Creation date */}
            <div className="col-span-1 md:col-span-2 flex items-center md:justify-center gap-2 text-sm text-gray-400 pl-11 md:pl-0">
                <Calendar className="w-4 h-4 md:hidden" />
                {formatDate(link.createdAt)}
            </div>

            {/* Click count */}
            <div className="col-span-1 md:col-span-2 flex items-center md:justify-center pl-11 md:pl-0">
                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-lg border border-white/5">
                    <BarChart2 className="w-4 h-4 text-teal-400" />
                    <span className="font-bold text-white">
                        {link.click_count}
                    </span>
                    <span className="text-xs text-gray-500 hidden md:inline">
                        clicks
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="col-span-1 md:col-span-3 flex items-center justify-end gap-3">
                <Link
                    href={`/dashboard/${link.id}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 hover:text-teal-300 border border-teal-500/20 transition text-sm font-bold"
                >
                    <BarChart2 className="w-4 h-4" />
                    Analytics
                </Link>
                <button className="p-2 rounded-xl hover:bg-white/10 text-gray-500 hover:text-white transition">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}