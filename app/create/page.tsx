'use client';

import { useCreateLink } from '../hooks/useCreateLink';
import GeoTargetingSection from '../components/create/GeoTargetingSection';
import SchedulingSection from '../components/create/SchedulingSection';
import ResultCard from '../components/create/ResultCard';
import CreatePageHeader from '../components/create/CreatePageHeader';
import MainInfoSection from '../components/create/MainCreateSection';
import { Loader2, Calendar } from 'lucide-react';

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
        handleSubmit,
        // user, // Nếu không dùng user thì có thể bỏ
        showDomainInput, setShowDomainInput,
        newDomainName, setNewDomainName,
        handleCreateDomain, isCreatingDomain
    } = useCreateLink();

    if (isAuthLoading) {
        return (
            <main className="flex items-center justify-center min-h-screen bg-brand-dark text-white">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-brand-dark text-white relative overflow-hidden py-10 px-4">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto">
                <CreatePageHeader />
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        <MainInfoSection
                            originalUrl={originalUrl}
                            setOriginalUrl={setOriginalUrl}
                            domains={domains}
                            selectedDomain={selectedDomain}
                            setSelectedDomain={setSelectedDomain}
                            showDomainInput={showDomainInput}
                            setShowDomainInput={setShowDomainInput}
                            newDomainName={newDomainName}
                            setNewDomainName={setNewDomainName}
                            handleCreateDomain={handleCreateDomain}
                            isCreatingDomain={isCreatingDomain}
                            customSlug={customSlug}
                            setCustomSlug={setCustomSlug}
                        />

                        {/* Advanced Settings */}
                        <div className="bg-gray-900/30 rounded-2xl p-6 border border-gray-700/50 space-y-6">
                            {/* Geo Targeting */}
                            <div>
                                <GeoTargetingSection
                                    showAdvanced={showAdvanced}
                                    setShowAdvanced={setShowAdvanced}
                                    geoRules={geoRules}
                                    addGeoRule={addGeoRule}
                                    removeGeoRule={removeGeoRule}
                                    updateGeoRule={updateGeoRule}
                                />
                            </div>

                            <div className="w-full h-px bg-gray-700/50"></div>

                            {/* Scheduling */}
                            <div>
                                <div className="flex items-center gap-2 text-sm font-bold text-orange-300 uppercase tracking-wider mb-4">
                                    <Calendar className="w-4 h-4" /> Scheduling & Expiration
                                </div>
                                <SchedulingSection
                                    scheduleAt={scheduleAt}
                                    setScheduleAt={setScheduleAt}
                                    expireAt={expireAt}
                                    setExpireAt={setExpireAt}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!!loadingMessage || !originalUrl}
                            className={`
                                w-full py-4 rounded-xl font-bold text-xl text-white shadow-lg transition-all transform hover:-translate-y-1
                                flex items-center justify-center gap-3
                                ${loadingMessage || !originalUrl
                                    ? 'bg-gray-700 cursor-not-allowed opacity-50'
                                    : 'bg-linear-to-r from-blue-600 via-teal-500 to-emerald-500 hover:shadow-teal-500/30'
                                }
                            `}
                        >
                            {loadingMessage ? (
                                <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    {loadingMessage}
                                </>
                            ) : (
                                'Create Link'
                            )}
                        </button>
                    </form>

                    {/* Result Section */}
                    <div className="mt-8">
                        <ResultCard
                            error={error}
                            successResult={successResult}
                            geoRulesCount={geoRules.length}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}