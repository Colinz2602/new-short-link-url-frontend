// app/components/home/input-section/LinkHistoryList.tsx
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

function LinkResultCard({ link }: { link: any }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(link.full_short_url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-teal-400 animate-in slide-in-from-bottom-2 fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="overflow-hidden w-full md:w-auto">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                        <span className="truncate max-w-[200px] md:max-w-[300px]" title={link.original_url}>
                            {link.original_url}
                        </span>
                    </div>
                    <a
                        href={link.full_short_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xl font-bold text-teal-600 hover:text-teal-700 hover:underline break-all"
                    >
                        {link.full_short_url.replace(/^https?:\/\//, '')}
                    </a>
                </div>

                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition shadow-sm w-full md:w-auto justify-center ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
        </div>
    );
}

export default function LinkHistoryList({ links }: { links: any[] }) {
    if (!links || links.length === 0) return null;

    return (
        <div className="max-w-xl space-y-4">
            {links.map((link) => (
                <LinkResultCard key={link.id || link.short_code} link={link} />
            ))}
            <p className="mt-4 text-sm text-gray-500">
                * Đăng nhập để rút gọn nhiều link và quản lý link dễ dàng hơn.
            </p>
        </div>
    );
}