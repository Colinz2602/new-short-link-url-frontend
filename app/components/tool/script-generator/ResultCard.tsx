import { Check, Copy } from 'lucide-react';
import React from 'react';

interface ResultCardProps {
    icon: React.ReactNode;
    title: string;
    content: string;
    onCopy: () => void;
    isCopied: boolean;
}

export default function ResultCard({ icon, title, content, onCopy, isCopied }: ResultCardProps) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group hover:border-purple-500/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-200 font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                    {icon} {title}
                </h3>
                <button
                    onClick={onCopy}
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                    title="Copy text"
                >
                    {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>
            <div className="bg-black/20 rounded-xl p-4 border border-white/5">
                <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-sm">{content}</p>
            </div>
        </div>
    );
}