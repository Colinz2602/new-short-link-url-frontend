import { Check } from 'lucide-react';

export default function Illustration() {
    return (
        <div className="relative z-10 hidden justify-center lg:justify-end animate-in slide-in-from-right-10 duration-700 delay-100 md:flex">
            <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl"></div>

                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-4xl shadow-2xl mt-10 w-full h-full flex flex-col justify-between">
                    <div className="flex gap-3 mb-6">
                        <div className="w-4 h-4 rounded-full bg-red-400/80"></div>
                        <div className="w-4 h-4 rounded-full bg-yellow-400/80"></div>
                        <div className="w-4 h-4 rounded-full bg-green-400/80"></div>
                    </div>

                    <div className="flex-1 flex items-end gap-4 pb-8 px-4">
                        <div className="w-1/4 h-[40%] bg-blue-500/50 rounded-t-lg animate-pulse"></div>
                        <div className="w-1/4 h-[70%] bg-teal-400/50 rounded-t-lg"></div>
                        <div className="w-1/4 h-[50%] bg-indigo-500/50 rounded-t-lg animate-pulse delay-75"></div>
                        <div className="w-1/4 h-[90%] bg-pink-500/50 rounded-t-lg"></div>
                    </div>

                    <div className="bg-white/90 rounded-2xl p-4 shadow-lg flex items-center gap-4 transform -translate-x-5 translate-y-5">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <Check className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-gray-900 font-bold">Link Ready!</div>
                            <div className="text-gray-500 text-xs">short.link/xyz123</div>
                        </div>
                    </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-blue-600 p-4 rounded-2xl shadow-lg transform rotate-12 animate-bounce duration-3000">
                    🔗
                </div>
                <div className="absolute bottom-10 -left-8 bg-teal-400 p-4 rounded-2xl shadow-lg transform -rotate-12 animate-pulse">
                    📊
                </div>
            </div>
        </div>
    );
}