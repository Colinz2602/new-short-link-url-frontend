import {
    LineChart,
    BarChart3,
    PieChart,
    MousePointer2,
    TrendingUp,
    Target,
} from "lucide-react";

export default function LinkAnalyticsIllustration() {
    return (
        <div className="relative w-full max-w-[520px] aspect-square mx-auto">
            <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl overflow-hidden flex items-center justify-center">
                <div className="absolute -top-24 -right-24 w-[320px] h-80 bg-blue-100 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-[280px] h-[280px] bg-indigo-100 rounded-full blur-3xl" />

                <div className="relative w-[82%] h-[62%] bg-white border border-blue-100 rounded-2xl shadow-xl z-10 flex flex-col">
                    <div className="h-10 px-4 flex items-center justify-between border-b border-blue-50 bg-gray-50/60 rounded-t-2xl">
                        <div className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                            Lin Analytics
                        </div>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>

                    <div className="flex-1 p-5 space-y-5">
                        <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold border border-blue-100 truncate">
                            yourbrand.co/abc123
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <StatCard label="Clicks" value="12.4K" />
                            <StatCard label="CTR" value="8.2%" />
                            <StatCard label="Active" value="Realtime" />
                        </div>

                        <div className="relative mt-4 h-24 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl flex items-end justify-around px-4">
                            {[40, 65, 50, 80, 70, 95].map((h, i) => (
                                <div
                                    key={i}
                                    className="w-2 rounded-full bg-blue-400"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="absolute top-[14%] left-[6%] bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-20 animate-float">
                    <PieChart className="w-8 h-8 text-indigo-500" />
                </div>

                <div className="absolute bottom-[18%] left-[8%] bg-blue-50 p-3 rounded-xl shadow-md border border-blue-100 z-20 animate-float delay-150">
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>

                <div className="absolute top-[20%] right-[10%] bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-20 animate-float delay-300">
                    <LineChart className="w-8 h-8 text-green-500" />
                </div>

                <div className="absolute bottom-[14%] right-[6%] bg-white p-4 rounded-full shadow-2xl border border-blue-50 z-30">
                    <div className="relative">
                        <Target className="w-12 h-12 text-blue-600" />
                        <MousePointer2 className="w-5 h-5 text-gray-900 absolute -bottom-2 -right-2 fill-black stroke-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Mini stat card */
function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-center">
            <div className="text-xs text-gray-500">{label}</div>
            <div className="text-sm font-bold text-gray-800">{value}</div>
        </div>
    );
}