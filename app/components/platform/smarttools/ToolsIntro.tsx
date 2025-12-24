'use client';

import Link from 'next/link';
import { handleGoogleLogin } from '../../auth/Login';
import { Bot, Sparkles } from 'lucide-react';

export default function ToolsIntro() {
    return (
        <div className="space-y-8 animate-in slide-in-from-left-10 duration-700">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI-Powered
                    </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.15] mb-6">
                    Unleash Creativity with <br />
                    <span className="bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-600">
                        Smart AI Tools
                    </span>
                </h1>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg">
                    Access our suite of intelligent tools designed to automate your workflow. From script generation to data scraping, we verify and optimize everything for you.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <button
                    onClick={handleGoogleLogin}
                    className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-900/40 transition transform hover:-translate-y-1 flex items-center gap-2"
                >
                    <Bot className="w-5 h-5" />
                    Try AI Tools Free
                </button>

                <Link href="/pricing">
                    <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg transition transform hover:-translate-y-1 border border-white/10">
                        View Pricing
                    </button>
                </Link>
            </div>
        </div>
    );
}