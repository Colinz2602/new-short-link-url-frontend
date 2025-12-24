'use client';

import { usePricing } from '../hooks/usePricing';
import Navbar from '../components/Navbar/Navbar';
import PricingHeader from '../components/pricing/PricingHeader';
import PricingCard from '../components/pricing/PricingCard';
import { PLANS } from '../components/pricing/package';

export default function PricingPage() {
    const { user, processingPlanId, handleCheckout } = usePricing();

    return (
        <div className="min-h-screen bg-brand-dark dark:bg-gray-900 font-sans">
            <Navbar />

            <PricingHeader />

            <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-20 pb-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {PLANS.map((plan) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            user={user}
                            processingPlanId={processingPlanId}
                            onCheckout={handleCheckout}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}