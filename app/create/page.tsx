'use client';

import { useCreateLink } from '../hooks/useCreateLink';
import GeoTargetingSection from '../components/create/GeoTargetingSection';
import SchedulingSection from '../components/create/SchedulingSection';
import ResultCard from '../components/create/ResultCard';
import PageHeader from '../components/common/PageHeader';

export default function CreatePage() {
    const {
        isAuthLoading,
        domains,
        selectedDomain, setSelectedDomain,
        originalUrl, setOriginalUrl,
        customSlug, setCustomSlug,
        showAdvanced, setShowAdvanced,
        geoRules, addGeoRule, removeGeoRule, updateGeoRule,
        scheduleAt, setScheduleAt,
        expireAt, setExpireAt,
        loadingMessage, error, successResult,
        handleSubmit
    } = useCreateLink();

    if (isAuthLoading) {
        return (
            <main className="flex items-center justify-center min-h-screen">
                <p>Đang tải...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex justify-center">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl h-fit">

                <PageHeader title="" showBulkImport={true} />
                <h1 className="text-3xl font-bold mb-6 text-center">Tạo Link Rút Gọn Mới</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Đường dẫn gốc</label>
                        <input
                            type="url"
                            required
                            placeholder="https://example.com/very-long-url"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">Domain</label>
                            <select
                                value={selectedDomain}
                                onChange={(e) => setSelectedDomain(e.target.value)}
                                className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 outline-none"
                            >
                                {domains.map((d) => (
                                    <option key={d.id} value={d.id}>{d.domain_name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Đường dẫn tùy chỉnh (Optional)</label>
                            <input
                                type="text"
                                placeholder="my-campaign-2024"
                                value={customSlug}
                                onChange={(e) => setCustomSlug(e.target.value)}
                                className="w-full px-4 py-3 border rounded-xl bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <GeoTargetingSection
                        showAdvanced={showAdvanced}
                        setShowAdvanced={setShowAdvanced}
                        geoRules={geoRules}
                        addGeoRule={addGeoRule}
                        removeGeoRule={removeGeoRule}
                        updateGeoRule={updateGeoRule}
                    />

                    <SchedulingSection
                        scheduleAt={scheduleAt}
                        setScheduleAt={setScheduleAt}
                        expireAt={expireAt}
                        setExpireAt={setExpireAt}
                    />

                    <button
                        type="submit"
                        disabled={!!loadingMessage || !originalUrl}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loadingMessage || 'Tạo Link Ngay'}
                    </button>
                </form>

                <ResultCard
                    error={error}
                    successResult={successResult}
                    geoRulesCount={geoRules.length}
                />
            </div>
        </main>
    );
}