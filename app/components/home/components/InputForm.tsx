import { Link2, Loader2, Globe } from 'lucide-react';

interface UrlInputFormProps {
    url: string;
    setUrl: (val: string) => void;
    domains: any[];
    selectedDomain: string;
    setSelectedDomain: (val: string) => void;
    loading: boolean;
    onSubmit: () => void;
}

export default function InputForm({
    url, setUrl,
    domains, selectedDomain, setSelectedDomain,
    loading, onSubmit
}: UrlInputFormProps) {

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') onSubmit();
    };

    return (
        <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-xl mb-6 relative">
            {/* Domain Selector */}
            <div className="relative border-b md:border-b-0 md:border-r border-gray-200 min-w-[140px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="w-full pl-10 pr-8 py-4 text-gray-700 font-semibold bg-transparent outline-none appearance-none cursor-pointer hover:bg-gray-50 rounded-xl md:rounded-l-xl md:rounded-r-none transition"
                >
                    {domains.map((d) => (
                        <option key={d.id} value={d.id}>
                            {d.domain_name}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                    ▼
                </div>
            </div>

            {/* Input URL */}
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Link2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="url"
                    placeholder="Dán link dài của bạn vào đây..."
                    className="w-full pl-12 pr-4 py-4 text-gray-800 outline-none rounded-xl text-lg placeholder:text-gray-400"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {/* Submit Button */}
            <button
                onClick={onSubmit}
                disabled={loading}
                className={`bg-teal-400 hover:bg-teal-300 text-teal-900 font-bold px-8 py-4 rounded-xl text-lg transition shadow-lg whitespace-nowrap flex items-center gap-2 justify-center
                    ${loading ? 'opacity-70 cursor-not-allowed' : ''}
                `}
            >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? 'Đang xử lý...' : 'Rút gọn'}
            </button>
        </div>
    );
}