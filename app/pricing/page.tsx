'use client';

import Link from 'next/link';
import { usePricing } from '../hooks/usePricing';
import Navbar from '../components/layout/Navbar';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

const PLANS = [
    {
        id: "free_no_signup",
        name: 'Free (No signup)',
        price: '0đ',
        period: '/ month',
        features: ['Shorten 50 links/month'],
        limitation: 'No dashboard',
        type: 'free',
        highlight: false
    },
    {
        id: 'free_signup',
        name: 'Free (Signup)',
        price: '0đ',
        period: '/ month',
        features: ['Basic analytics'],
        limitation: '200 links/month',
        type: 'free',
        highlight: false
    },
    {
        id: 'price_1SWCLWACee5Wzv9G5p1NMQLB',
        name: 'Single Tool',
        price: '5$',
        period: '/ tool / month',
        features: ['Full features of the tool'],
        limitation: 'Unlock 1 tool',
        type: 'single',
        highlight: false
    },
    {
        id: 'price_1SWCPtACee5Wzv9GqH1gCeLF',
        name: 'Pro Bundle',
        price: '$9.99',
        period: '/ month',
        features: ['Unlock all tools'],
        limitation: 'No Limit',
        type: 'bundle',
        highlight: true
    },
    {
        id: 'price_1SWCVAACee5Wzv9GujYTLHxK',
        name: 'Quarterly Pro',
        price: '$24.99',
        period: '/ 3 month',
        features: ['Unlock all tools'],
        limitation: 'No limit',
        type: 'quarterly',
        highlight: false
    },
    {
        id: 'price_1SWCU4ACee5Wzv9GhJaOQygR',
        name: 'Annual VIP',
        price: '$99.9',
        period: '/ year',
        features: ['Unlock all tools', '+2 months free'],
        limitation: 'Annual',
        type: 'annual',
        highlight: true
    },
];

export default function PricingPage() {
    const { user, processingPlanId, handleCheckout } = usePricing();
    return (
        <div className="min-h-screen bg-brand-dark dark:bg-gray-900 font-sans">
            <Navbar />
            <div className="bg-brand-dark text-white pt-24 pb-32 px-4 text-center rounded-b-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
                    <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/40 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-teal-500/30 rounded-full blur-[80px]"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-3">Features and Pricing</h2>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Choose the appropriate solution for your development
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        Start for free. Upgrade to unlock advanced analytics features and unlimited link management.
                    </p>
                </div>
            </div>
            {/* PRICING CARDS */}
            <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-20 pb-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {PLANS.map((plan) => (
                        <div
                            key={plan.id}
                            className={`
                                relative flex flex-col p-8 rounded-3xl bg-white dark:bg-gray-800 transition-all duration-300
                                ${plan.highlight
                                    ? 'shadow-2xl ring-4 ring-blue-500/20 scale-105 z-10 border-t-8 border-blue-600'
                                    : 'shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1'
                                }
                            `}
                        >
                            {plan.highlight && (
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}

                            {/* Name */}
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{plan.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{plan.limitation}</p>
                            </div>

                            {/* Price */}
                            <div className="text-center mb-8">
                                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">{plan.period}</span>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-600 dark:text-gray-300 text-sm">
                                        <CheckIcon />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Action Button */}
                            <div className="mt-auto">
                                {plan.type === 'free' ? (
                                    <Link href={user ? "/dashboard" : "/auth/login"} className="block w-full">
                                        <button className="w-full py-3.5 rounded-xl font-bold border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400 hover:text-gray-800 transition">
                                            Miễn phí
                                        </button>
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => handleCheckout(plan.id, plan.type)}
                                        disabled={processingPlanId !== null}
                                        className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition transform active:scale-95 disabled:opacity-70
                                            ${plan.highlight
                                                ? 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30'
                                                : 'bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600'
                                            }
                                        `}
                                    >
                                        {processingPlanId === plan.id ? 'Đang xử lý...' : 'Chọn gói này'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Link */}
                <div className="mt-16 text-center">
                    <p className="text-gray-500 mb-4">Bạn có câu hỏi?</p>
                </div>
            </div>
        </div>
    );
}