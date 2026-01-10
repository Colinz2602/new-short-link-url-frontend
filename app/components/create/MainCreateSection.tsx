import { Link2, Globe, Plus, Loader2, Check, X } from 'lucide-react';
import { Domain } from '../../types';

interface MainInfoSectionProps {
    originalUrl: string;
    setOriginalUrl: (val: string) => void;
    domains: Domain[];
    selectedDomain: string;
    setSelectedDomain: (val: string) => void;
    showDomainInput: boolean;
    setShowDomainInput: (val: boolean) => void;
    newDomainName: string;
    setNewDomainName: (val: string) => void;
    handleCreateDomain: () => void;
    isCreatingDomain: boolean;
    customSlug: string;
    setCustomSlug: (val: string) => void;
}

export default function MainInfoSection({
    originalUrl, setOriginalUrl,
    domains, selectedDomain, setSelectedDomain,
    showDomainInput, setShowDomainInput,
    newDomainName, setNewDomainName,
    handleCreateDomain, isCreatingDomain,
    customSlug, setCustomSlug
}: MainInfoSectionProps) {
    return (
        <div className="flex flex-col gap-8">
            {/* Main URL */}
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-blue-300 uppercase tracking-wider">
                    <Link2 className="w-4 h-4" /> Destination URL
                </label>
                <input
                    type="text"
                    required
                    placeholder="https://example.com/very-long-url-that-needs-shortening"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-lg"
                />
            </div>

            {/* Domain & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="flex items-center gap-2 text-sm font-bold text-teal-300 uppercase tracking-wider">
                            <Globe className="w-4 h-4" /> Domain
                        </label>

                        <button
                            type="button"
                            onClick={() => setShowDomainInput(true)}
                            className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 bg-teal-500/10 px-2 py-1 rounded transition"
                        >
                            <Plus className="w-3 h-3" /> Custom Domain
                        </button>
                    </div>

                    {showDomainInput ? (
                        <div className="flex gap-2 animate-in fade-in slide-in-from-top-2">
                            <input
                                type="text"
                                placeholder="VD: link.mybrand.com"
                                value={newDomainName}
                                onChange={(e) => setNewDomainName(e.target.value)}
                                className="flex-1 px-4 py-4 rounded-xl bg-gray-900/50 border border-teal-500/50 text-white focus:ring-2 focus:ring-teal-500 outline-none transition"
                            />
                            <button
                                type="button"
                                onClick={handleCreateDomain}
                                disabled={isCreatingDomain || !newDomainName}
                                className="bg-teal-500 hover:bg-teal-600 text-white px-4 rounded-xl font-bold disabled:opacity-50"
                            >
                                {isCreatingDomain ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowDomainInput(false)}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-4 rounded-xl"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <select
                                value={selectedDomain}
                                onChange={(e) => setSelectedDomain(e.target.value)}
                                className="w-full px-5 py-4 appearance-none rounded-xl bg-gray-900/50 border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 outline-none transition cursor-pointer"
                            >
                                {domains.map((d) => (
                                    <option key={d.id} value={d.id} className="bg-gray-900 text-white">
                                        {d.domain_name} {d.type === 'custom' ? '(Custom)' : ''}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                                ▼
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Custom Slug */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-purple-300 uppercase tracking-wider">
                        Custom Slug (Optional)
                    </label>
                    <div className="flex items-center">
                        <span className="bg-gray-800 text-gray-400 border border-r-0 border-gray-700 rounded-l-xl px-4 py-4 select-none">
                            /
                        </span>
                        <input
                            type="text"
                            placeholder="my-campaign"
                            value={customSlug}
                            onChange={(e) => setCustomSlug(e.target.value)}
                            className="w-full px-5 py-4 rounded-r-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}