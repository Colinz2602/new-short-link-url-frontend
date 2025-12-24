import Link from 'next/link';
import { Search, ExternalLink } from 'lucide-react';
import { ApiLink } from '../../types';
import LinkItem from './LinkItem';

interface LinkListProps {
    links: ApiLink[];
    loading: boolean;
    copiedId: number | null;
    onCopy: (text: string, id: number) => void;
}

export default function LinkList({ links, loading, copiedId, onCopy }: LinkListProps) {
    if (loading) {
        return (
            <div className="p-20 text-center space-y-4">
                <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                <p className="text-gray-400">Syncing links...</p>
            </div>
        );
    }

    if (links.length === 0) {
        return (
            <div className="p-20 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-10 h-10 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No links yet</h3>
                <p className="text-gray-400 max-w-sm mb-8">
                    Create your first short link to start tracking clicks and performance.
                </p>
                <Link
                    href="/create"
                    className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-2 hover:underline"
                >
                    Create now <ExternalLink className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="hidden md:grid grid-cols-12 gap-4 p-5 border-b border-white/5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                <div className="col-span-5 pl-2">Short Link / Original</div>
                <div className="col-span-2 text-center">Created</div>
                <div className="col-span-2 text-center">Clicks</div>
                <div className="col-span-3 text-right pr-2">Actions</div>
            </div>

            <div className="divide-y divide-white/5">
                {links.map((link) => (
                    <LinkItem
                        key={link.id}
                        link={link}
                        copiedId={copiedId}
                        onCopy={onCopy}
                    />
                ))}
            </div>
        </>
    );
}