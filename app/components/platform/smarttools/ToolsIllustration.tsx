import {
    Bot,
    Wand2,
    Database,
    FileText,
    Cpu,
    Zap,
} from "lucide-react";

export default function ToolsIllustration() {
    return (
        <div className="relative w-full max-w-[520px] aspect-square mx-auto">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[3rem] shadow-2xl overflow-hidden flex items-center justify-center border border-white/10">
                <div className="absolute -top-24 -right-24 w-[320px] h-80 bg-purple-600/30 rounded-full blur-[80px]" />
                <div className="absolute -bottom-24 -left-24 w-[280px] h-[280px] bg-pink-600/20 rounded-full blur-[80px]" />
                {/* Main Card */}
                <div className="relative w-[82%] h-[62%] bg-gray-900/80 border border-white/10 rounded-2xl shadow-2xl z-10 flex flex-col backdrop-blur-md">
                    <div className="h-12 px-4 flex items-center justify-between border-b border-white/5 bg-white/5 rounded-t-2xl">
                        <div className="flex gap-2 shrink-0">
                            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                        </div>
                        <div className="relative z-10 mr-8 text-[10px] md:text-xs font-mono text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                            AI Script Generator
                        </div>
                    </div>

                    <div className="flex-1 p-6 space-y-4">
                        <div className="flex gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center text-purple-400 shrink-0">
                                <Bot className="w-6 h-6" />
                            </div>
                            <div className="space-y-2 w-full">
                                <div className="h-2 bg-white/10 rounded w-3/4 animate-pulse"></div>
                                <div className="h-2 bg-white/10 rounded w-1/2"></div>
                            </div>
                        </div>

                        <div className="bg-black/30 rounded-xl p-4 border border-white/5 space-y-3">
                            <div className="flex items-center gap-2 text-green-400 text-xs font-mono">
                                <Zap className="w-3 h-3" /> Generating content...
                            </div>
                            <div className="space-y-2">
                                <div className="h-1.5 bg-gray-700 rounded w-full"></div>
                                <div className="h-1.5 bg-gray-700 rounded w-[90%]"></div>
                                <div className="h-1.5 bg-gray-700 rounded w-[95%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-[14%] left-[6%] bg-gray-800 p-3 rounded-xl shadow-lg border border-purple-500/30 z-20 animate-float">
                    <Database className="w-6 h-6 text-purple-400" />
                </div>

                <div className="absolute bottom-[18%] left-[8%] bg-gray-800 p-3 rounded-xl shadow-md border border-pink-500/30 z-20 animate-float delay-150">
                    <FileText className="w-6 h-6 text-pink-400" />
                </div>

                <div className="absolute top-[20%] right-[10%] bg-gray-800 p-3 rounded-xl shadow-lg border border-blue-500/30 z-20 animate-float delay-300">
                    <Cpu className="w-6 h-6 text-blue-400" />
                </div>

                <div className="absolute bottom-[14%] right-[6%] bg-linear-to-br from-purple-600 to-pink-600 p-4 rounded-full shadow-2xl border border-white/20 z-30 animate-pulse">
                    <Wand2 className="w-8 h-8 text-white" />
                </div>
            </div>
        </div>
    );
}