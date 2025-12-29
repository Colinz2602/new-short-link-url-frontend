'use client';

import Navbar from '../components/Navbar/Navbar';
import ToolCard from '../components/tool/toolcard/ToolCard';
import { useTools } from '../hooks/useTools';
import { Loader2, AlertCircle } from 'lucide-react';

export default function ToolsPage() {
    const { tools, loading, error } = useTools();

    return (
        <main className="min-h-screen bg-brand-dark text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
            </div>

            <Navbar />

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
                        Smart Tools Collection
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Explore our suite of AI-powered tools designed to boost your productivity and content creation workflow.
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                        <p className="text-gray-500 animate-pulse">Loading amazing tools...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="max-w-md mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center text-red-300">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-400" />
                        <p>{error}</p>
                    </div>
                )}

                {/* Tools Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {tools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                        {tools.length === 0 && (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                No tools available at the moment. Please come back later!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}