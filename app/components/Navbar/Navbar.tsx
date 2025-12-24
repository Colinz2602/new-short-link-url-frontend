'use client';

import Link from 'next/link';
// Đảm bảo đường dẫn import đúng với cấu trúc thư mục của bạn
import Logo from './components/Logo';
import PlatformDropdown from './components/PlatformDropdown';
import UserActions from './components/UserActions';

export default function Navbar() {
    return (
        <header className="w-full py-6 px-4 md:px-8 relative z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Logo />

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
                    <Link href="/pricing" className="hover:text-white transition">Pricing</Link>

                    <PlatformDropdown />
                </nav>

                <div className="flex items-center gap-4">
                    <UserActions />
                </div>
            </div>
        </header>
    );
}