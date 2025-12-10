'use client';

import Link from 'next/link';
import { usePricing } from '../hooks/usePricing';

// Cấu hình Price ID (Lấy từ Stripe Dashboard)
const PLANS = [
    {
        id: "free_no_signup",
        name: 'Free (No signup)',
        price: '0đ',
        features: ['Shorten 50 links/month'],
        limitation: 'No dashboard',
        type: 'free',
    },
    {
        id: 'free_signup',
        name: 'Free (Signup)',
        price: '0đ',
        features: ['Basic analytics'],
        limitation: '200 links/month',
        type: 'free',
    },
    {
        id: 'price_1SWCLWACee5Wzv9G5p1NMQLB',
        name: '$5 / tool',
        price: '5$',
        features: ['Full features of the tool'],
        limitation: 'Unlock 1 tool',
        type: 'single',
    },
    {
        id: 'price_1SWCPtACee5Wzv9GqH1gCeLF',
        name: '$9.99-$11.99 / month',
        price: '$9.99-$11.99',
        features: ['Unlock all tools'],
        limitation: 'No limit',
        type: 'bundle',
    },
    {
        id: 'price_1SWCU4ACee5Wzv9GhJaOQygR',
        name: '$99.9 / year',
        price: '$99.9',
        features: ['Unlock all tools', '+2 months free'],
        limitation: 'Annual',
        type: 'annual',
    },
    {
        id: 'price_1SWCVAACee5Wzv9GujYTLHxK',
        name: '$24.99 / quarter',
        price: '$24.99',
        features: ['Unlock all tools'],
        limitation: 'No limit',
        type: 'quarterly',
    },
];

export default function PricingPage() {
    // Logic đã được đóng gói trong hook
    const { user, processingPlanId, handleCheckout } = usePricing();

    return (
        <main className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Bảng giá & Gói dịch vụ</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border ${plan.type === 'bundle' ? 'border-2 border-blue-500 scale-105 transform relative' : 'border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {plan.type === 'bundle' && (
                                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
                            )}
                            <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                            <p className="text-3xl font-bold mb-6">{plan.price}</p>

                            <ul className="text-left space-y-2 mb-6 text-gray-600 dark:text-gray-300">
                                {plan.features.map((f, idx) => <li key={idx}>✅ {f}</li>)}
                            </ul>

                            <p className="text-gray-500 mb-4 font-medium">Limit: {plan.limitation}</p>

                            {plan.type === 'free' ? (
                                <button
                                    className="w-full py-3 bg-gray-200 text-gray-500 rounded-xl font-bold cursor-not-allowed"
                                    disabled
                                >
                                    {plan.id === 'free_no_signup' && !user ? 'Đang sử dụng' : 'Free'}
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleCheckout(plan.id, plan.type)}
                                    disabled={processingPlanId !== null}
                                    className={`w-full py-3 rounded-xl font-bold ${plan.type === 'bundle'
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-800 dark:bg-gray-600 text-white hover:bg-gray-900'
                                        } transition disabled:opacity-50`}
                                >
                                    {processingPlanId === plan.id ? 'Đang xử lý...' : 'Chọn gói'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <Link href="/" className="text-blue-600 hover:underline">&larr; Về trang chủ</Link>
                </div>
            </div>
        </main>
    );
}