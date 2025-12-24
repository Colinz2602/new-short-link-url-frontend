'use client';

import Link from 'next/link';
import { handleGoogleLogin } from '../../auth/Login'; // Điều chỉnh đường dẫn import cho đúng với dự án của bạn

export default function LinkManagementIntro() {
    return (
        <div className="space-y-8 animate-in slide-in-from-left-10 duration-700">
            <div>
                <h3 className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-4">
                    Link Management
                </h3>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.15] mb-6">
                    Revolutionize Your <br />
                    Link Management
                </h1>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg">
                    Boost your online presence, enhance user experience, and drive conversions with our easy-to-use platform. Get started today and unlock the full potential of your links!
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                <button
                    onClick={handleGoogleLogin}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/40 transition transform hover:-translate-y-1"
                >
                    Start For Free
                </button>

                <Link href="/pricing">
                    <button className="bg-gray-200 hover:bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition transform hover:-translate-y-1 border border-transparent hover:border-gray-300">
                        Pricing
                    </button>
                </Link>
            </div>
        </div>
    );
}