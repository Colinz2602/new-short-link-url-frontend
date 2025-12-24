import Link from 'next/link';
import { Plan } from './package';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
);

interface PricingCardProps {
    plan: Plan;
    user: any;
    processingPlanId: string | null;
    onCheckout: (planId: string, type: string) => void;
}

const PricingCard = ({ plan, user, processingPlanId, onCheckout }: PricingCardProps) => {
    return (
        <div
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

            {/* Button */}
            <div className="mt-auto">
                {plan.type === 'free' ? (
                    <Link href={user ? "/dashboard" : "/auth/login"} className="block w-full">
                        <button className="w-full py-3.5 rounded-xl font-bold border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-400 hover:text-gray-800 transition">
                            Miễn phí
                        </button>
                    </Link>
                ) : (
                    <button
                        onClick={() => onCheckout(plan.id, plan.type)}
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
    );
};

export default PricingCard;