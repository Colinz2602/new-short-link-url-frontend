'use client';

import { usePricing } from '../hooks/usePricing';
import Navbar from '../components/Navbar/Navbar';
import PricingHeader from '../components/pricing/PricingHeader';
import PricingCard from '../components/pricing/PricingCard';

export default function PricingPage() {
    // Lấy thêm plans và loading từ hook
    const { user, processingPlanId, handleCheckout, plans, loading } = usePricing();

    return (
        <div className="min-h-screen bg-brand-dark dark:bg-gray-900 font-sans">
            <Navbar />

            <PricingHeader />

            <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-20 pb-20">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.length > 0 ? (
                            plans.map((plan) => (
                                <PricingCard
                                    key={plan.id}
                                    plan={plan}
                                    user={user}
                                    processingPlanId={processingPlanId}
                                    onCheckout={handleCheckout}
                                />
                            ))
                        ) : (
                            <div className="col-span-3 text-center text-gray-400">
                                Hiện chưa có gói dịch vụ nào.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}