import { useState } from 'react';
import { FileText, MessageSquare, Hash, Check, Copy } from 'lucide-react';
import { ScriptResponse } from '../../../services/aiService';
import ResultCard from './ResultCard';

interface ResultSectionProps {
    result: ScriptResponse;
}

export default function ResultSection({ result }: ResultSectionProps) {
    const [copiedSection, setCopiedSection] = useState<string | null>(null);

    const handleCopy = (text: string, section: string) => {
        navigator.clipboard.writeText(text);
        setCopiedSection(section);
        setTimeout(() => setCopiedSection(null), 2000);
    };

    return (
        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultCard
                icon={<FileText className="w-5 h-5 text-blue-400" />}
                title="📜 Video Script"
                content={result.script}
                onCopy={() => handleCopy(result.script, 'script')}
                isCopied={copiedSection === 'script'}
            />

            <ResultCard
                icon={<MessageSquare className="w-5 h-5 text-green-400" />}
                title="💬 Caption"
                content={result.caption}
                onCopy={() => handleCopy(result.caption, 'caption')}
                isCopied={copiedSection === 'caption'}
            />

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group hover:border-purple-500/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-purple-400 font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                        <Hash className="w-5 h-5" /> Keywords & Hashtags
                    </h3>
                    <button
                        onClick={() => handleCopy(result.keywords.join(' '), 'keywords')}
                        className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                        title="Copy all"
                    >
                        {copiedSection === 'keywords' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {result.keywords.map((tag, idx) => (
                        <span key={idx} className="bg-purple-500/20 text-purple-200 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                            #{tag.replace(/^#/, '')}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}