'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Tool, toolService } from '../../../services/toolService';
import { Wrench, ArrowRight, ShoppingCart, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface ToolCardProps {
    tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
    const [isBuying, setIsBuying] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const hasAccess = tool.price === 0 || tool.is_active_for_user;

    const renderPeriod = () => {
        if (tool.interval > 1) {
            return `every ${tool.interval} ${tool.period}s`;
        }
        return `/${tool.period}`;
    };

    const handleBuy = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (!tool.stripe_price_id) {
            alert('Cấu hình thanh toán cho tool này chưa hoàn tất (thiếu Price ID).');
            return;
        }

        try {
            setIsBuying(true);
            const res: any = await toolService.buyTool(tool.stripe_price_id, tool.id);

            if (res.data?.url) {
                window.location.href = res.data.url;
            } else {
                alert('Không lấy được link thanh toán.');
            }
        } catch (error: any) {
            console.error('Lỗi thanh toán:', error);
            alert(error.response?.data?.error?.message || 'Có lỗi xảy ra khi tạo thanh toán.');
        } finally {
            setIsBuying(false);
        }
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