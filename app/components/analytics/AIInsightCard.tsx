'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { aiService } from '../../services/aiService';

interface AIInsightCardProps {
    insight?: string;
    linkId?: number;
}

const AIInsightCard = ({ insight, linkId }: AIInsightCardProps) => {
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!linkId) {
            return;
        }

        setLoading(true);
        try {
            await aiService.generateInsights(linkId);
            window.location.reload();
        } catch (error: any) {
            alert("Error: " + (error.message || "Cannot parse AI insights."));
        } finally {
            setLoading(false);
        }
    };

    let parsedData = null;
    try {
        if (insight) {
            parsedData = JSON.parse(insight);
        }
    } catch (e) {
        console.error("Error parsing JSON insight", e);
    }

    return (
        <div className="bg-linear-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5 relative z-10">
                <div className="bg-linear-to-b from-indigo-500 to-purple-600 p-3 rounded-xl shadow-inner shrink-0">
                    <span className="text-2xl">🧠</span>
                </div>
                <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                        <h3 className="text-transparent bg-clip-text bg-linear-to-r from-indigo-200 to-purple-200 font-bold text-lg mb-1 flex items-center gap-2">
                            AI Insights
                        </h3>
                        {/* Nút bấm kích hoạt AI */}
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="text-xs flex items-center gap-1 bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                            {loading ? "Analyzing..." : "Analyze Now"}
                        </button>
                    </div>
                    <div className="text-indigo-100/80 leading-relaxed text-sm md:text-base mt-2">
                        {parsedData ? (
                            <div className="space-y-2 mt-3">
                                <p><span className="font-bold text-yellow-400">Golden Hour:</span> {parsedData.goldenHour}</p>
                                <p><span className="font-bold text-blue-400">Strategy:</span> {parsedData.adScheduleStrategy}</p>
                                <p><span className="font-bold text-green-400">Insight:</span> {parsedData.insight}</p>
                            </div>
                        ) : (
                            <p>{insight || "No analysis data yet. Click 'Analyze Now' to get AI recommendations."}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIInsightCard;