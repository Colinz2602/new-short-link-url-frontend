'use client';

import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { Link2, Share2, QrCode, Globe, ChevronDown } from 'lucide-react';
import { handleGoogleLogin } from '../../components/auth/Login';

export default function Navbar() {
    const { user } = useAuth();

    return (
        <header className="w-full py-6 px-4 md:px-8 relative z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 bg-linear-to-tr from-blue-400 to-teal-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        S
                    </div>
                    <span className="text-2xl font-bold text-white tracking-tight">ShortenLink</span>
                </Link>

                {/* Menu Desktop */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <Link href="/pricing" className="hover:text-white transition">Bảng giá</Link>

                    {/* PLATFORM DROPDOWN */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 hover:text-white transition outline-none py-2">
                            Platform
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        </button>

                        {/* Dropdown Content */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px]
                                        bg-white rounded-xl shadow-2xl
                                        opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                        transition-all duration-200 overflow-hidden origin-top">

                            <div className="p-6 flex flex-col gap-6">
                                <h3 className="text-blue-500 font-bold uppercase text-xs tracking-wider">
                                    Platform
                                </h3>

                                <div className="space-y-5">
                                    <MenuItem
                                        title="URL Shortener"
                                        desc="Best URL shortener & bulk"
                                        icon={<Link2 className="w-5 h-5 text-blue-600" />}
                                    />
                                    <MenuItem
                                        title="Link Management"
                                        desc="Customize links, multiple kind of retargeting"
                                        icon={<Share2 className="w-5 h-5 text-blue-600" />}
                                    />
                                    <MenuItem
                                        title="Link In Bio"
                                        desc="Promote your products, social media"
                                        icon={<Globe className="w-5 h-5 text-blue-600" />}
                                    />
                                    <MenuItem
                                        title="QR Code Generator"
                                        desc="Generate free QR Code for Link, Wifi..."
                                        icon={<QrCode className="w-5 h-5 text-blue-600" />}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </nav>

                {/* User Actions */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="hidden md:flex flex-col items-end">
                                <span className="text-sm font-bold text-white">{user.displayName}</span>
                            </div>
                            {user.photoURL && (
                                <img src={user.photoURL} alt="Avatar" className="w-9 h-9 rounded-full border-2 border-blue-500" />
                            )}
                            <button onClick={authService.logout} className="text-gray-300 hover:text-white text-sm">
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleGoogleLogin}
                                className="text-white font-semibold hover:text-blue-300 transition"
                            >
                                Log in
                            </button>

                            <button
                                onClick={handleGoogleLogin}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-blue-900/50 hover:shadow-blue-600/50 transition transform hover:-translate-y-0.5"
                            >
                                Sign up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

function MenuItem({ title, desc, icon }: { title: string, desc: string, icon: any }) {
    return (
        <Link href="#" className="flex items-start gap-3 group/item hover:bg-slate-50 p-2 rounded-lg -mx-2 transition-colors">
            <div className="mt-1 shrink-0">{icon}</div>
            <div>
                <div className="text-slate-900 font-semibold group-hover/item:text-blue-600 transition-colors">{title}</div>
                <div className="text-slate-500 text-xs leading-relaxed line-clamp-2">{desc}</div>
            </div>
        </Link>
    );
}

// Component con hiển thị mục bên phải
function ResourceItem({ title, desc, icon }: { title: string, desc: string, icon: any }) {
    return (
        <Link href="#" className="block group/res">
            <div className="flex items-center gap-2 mb-1 text-slate-800 font-semibold group-hover/res:text-blue-600 transition-colors">
                {icon}
                <span>{title}</span>
            </div>
            <div className="text-slate-500 text-xs ml-6">{desc}</div>
        </Link>
    );
}