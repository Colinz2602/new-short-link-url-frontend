'use client';

import Link from 'next/link';
import { ChevronDown, Link2, Share2, Globe, Wrench } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { ReactNode } from 'react';

interface MenuItemProps {
    title: string;
    desc: string;
    icon: ReactNode;
    href?: string;
}

function MenuItem({ title, desc, icon, href = "#" }: MenuItemProps) {
    return (
        <Link href={href} className="flex items-start gap-3 group/item hover:bg-slate-50 p-2 rounded-lg -mx-2 transition-colors">
            <div className="mt-1 shrink-0">{icon}</div>
            <div>
                <div className="text-slate-900 font-semibold group-hover/item:text-blue-600 transition-colors">{title}</div>
                <div className="text-slate-500 text-xs leading-relaxed line-clamp-2">{desc}</div>
            </div>
        </Link>
    );
}

export default function PlatformDropdown() {
    const { user } = useAuth();

    return (
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
                            href={user ? "/create" : "/"}
                        />
                        <MenuItem
                            title="Link Management"
                            desc="Customize links, multiple kind of retargeting"
                            icon={<Share2 className="w-5 h-5 text-blue-600" />}
                            href={user ? "/dashboard" : "/platform/link-management"}
                        />
                        <MenuItem
                            title="Link In Bio"
                            desc="Promote your products, social media"
                            icon={<Globe className="w-5 h-5 text-blue-600" />}
                        />
                        <MenuItem
                            title="Smart Tools & AI"
                            desc="AI Writers, SEO Tools & Downloaders"
                            icon={<Wrench className="w-5 h-5 text-blue-600" />}
                            href="/platform/smarttools"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}