'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Tool, toolService } from '../../../services/toolService';
import { Wrench, ArrowRight, ShoppingCart, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useSubscription } from '../../../hooks/useSubscription';

interface ToolCardProps {
    tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
    const [isBuying, setIsBuying] = useState(false);
    const { user } = useAuth();

    const { plan } = useSubscription();
    const router = useRouter();

    const hasAccess = tool.price === 0 || tool.is_active_for_user;
    const isLifetime = tool.interval === 0;

    const isBundleUser = plan !== 'Free Member';

    const showSubscriptionInfo = hasAccess && tool.price !== 0 && (
        isLifetime || (tool.current_user_subscription && !isBundleUser)
    );

    const renderPeriod = () => {
        if (tool.interval > 1) {
            return `every ${tool.interval} ${tool.period}s`;
        }
        return `/${tool.period}`;
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';

        return new Date(dateString).toLocaleString('en-EN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleBuy = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (!tool.stripe_price_id) {
            alert('Payment configuration for this tool is incomplete (Price ID is missing).');
            return;
        }

        try {
            setIsBuying(true);
            const res: any = await toolService.buyTool(tool.stripe_price_id, tool.id);

            if (res.data?.url) {
                window.location.href = res.data.url;
            } else {
                alert('Unable to obtain the payment link. Please try again later.');
            }
        } catch (error: any) {
            console.error('Lỗi thanh toán:', error);
            alert(error.response?.data?.error?.message || 'An error occurred while creating the payment.');
        } finally {
            setIsBuying(false);
        }
    };

    const getProgressWidth = (start: string, end: string) => {
        const startTime = new Date(start).getTime();
        const endTime = new Date(end).getTime();
        const now = Date.now();

        if (now <= startTime) return '0%';
        if (now >= endTime) return '100%';

        const progress = ((now - startTime) / (endTime - startTime)) * 100;
        return `${progress}%`;
    };


    return (
        <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300 flex flex-col h-full">

            <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Wrench className="w-6 h-6" />
                </div>
                {tool.price === 0 ? (
                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full border border-green-500/30">
                        FREE
                    </span>
                ) : hasAccess ? (
                    <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30">
                        OWNED
                    </span>
                ) : (
                    <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30">
                        ${tool.price} {renderPeriod()}
                    </span>
                )}
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {tool.name}
            </h3>

            {showSubscriptionInfo && (
                <div className="mb-4 text-xs space-y-2 bg-white/5 p-3 rounded-lg border border-white/5">
                    {isLifetime ? (
                        <div className="text-green-400 font-medium">
                            ♾️ Lifetime Access
                        </div>
                    ) : (
                        tool.current_user_subscription && (
                            <>
                                <div className="text-gray-400">
                                    {formatDate(tool.current_user_subscription.start_date)}
                                    {' '}–{' '}
                                    {formatDate(tool.current_user_subscription.end_date || '')}
                                </div>

                                <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-500"
                                        style={{
                                            width: getProgressWidth(
                                                tool.current_user_subscription.start_date,
                                                tool.current_user_subscription.end_date || ''
                                            ),
                                        }}
                                    />
                                </div>
                            </>
                        )
                    )}
                </div>
            )}

            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                {tool.description}
            </p>

            {hasAccess ? (
                <Link
                    href={`/tool/${tool.slug}`}
                    className="mt-auto w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-900/20"
                >
                    <span>Try it now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
            ) : (
                <button
                    onClick={handleBuy}
                    disabled={isBuying}
                    className="mt-auto w-full py-3 rounded-xl bg-gray-800 hover:bg-purple-600 hover:text-white text-gray-200 font-medium transition-all flex items-center justify-center gap-2 group/btn border border-white/5 hover:border-purple-500/50"
                >
                    {isBuying ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <span>Buy ${tool.price}{renderPeriod()}</span>
                            <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}