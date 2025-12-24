import { Facebook, Loader2, Search } from 'lucide-react';

interface Props {
    url: string;
    setUrl: (url: string) => void;
    handleScrape: (e: React.FormEvent) => void;
    loading: boolean;
}

export default function ScraperForm({ url, setUrl, handleScrape, loading }: Props) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl mb-8">
            <form onSubmit={handleScrape} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">Facebook Post URL</label>
                    <div className="relative">
                        <input
                            type="url"
                            required
                            placeholder="https://www.facebook.com/..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <Facebook className="absolute left-3 top-3.5 text-blue-500 w-5 h-5" />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Search />}
                    {loading ? 'Analyzing...' : 'Scrape Data'}
                </button>
            </form>
        </div>
    );
}