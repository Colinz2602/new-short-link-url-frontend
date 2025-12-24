import { Loader2, Video, Wand2 } from 'lucide-react';
import { ScriptGeneratorPayload } from '../../../services/aiService';

interface GeneratorFormProps {
    url: string;
    setUrl: (url: string) => void;
    platform: ScriptGeneratorPayload['platform'];
    setPlatform: (platform: ScriptGeneratorPayload['platform']) => void;
    tone: ScriptGeneratorPayload['tone'];
    setTone: (tone: ScriptGeneratorPayload['tone']) => void;
    loading: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

export default function GeneratorForm({
    url, setUrl,
    platform, setPlatform,
    tone, setTone,
    loading, onSubmit
}: GeneratorFormProps) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl mb-8">
            <form onSubmit={onSubmit} className="space-y-6">
                {/* URL Input */}
                <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Original Video/Article URL</label>
                    <div className="relative">
                        <input
                            type="url"
                            required
                            placeholder="https://youtube.com/..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        <Video className="absolute right-4 top-3.5 text-gray-500 w-5 h-5" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Platform Select */}
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Platform</label>
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value as any)}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none cursor-pointer"
                        >
                            <option value="tiktok">TikTok</option>
                            <option value="instagram">Instagram Reels</option>
                            <option value="youtube">YouTube Shorts</option>
                        </select>
                    </div>

                    {/* Tone Select */}
                    <div>
                        <label className="block text-sm font-bold text-gray-300 mb-2">Tone & Style</label>
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value as any)}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none cursor-pointer"
                        >
                            <option value="professional">Professional</option>
                            <option value="funny">Funny & Witty</option>
                            <option value="inspirational">Inspirational</option>
                            <option value="casual">Casual & Friendly</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                    {loading ? 'Generating Content...' : 'Generate Script'}
                </button>
            </form>
        </div>
    );
}