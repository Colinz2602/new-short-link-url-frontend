import Link from 'next/link';

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-linear-to-tr from-blue-400 to-teal-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                S
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">ShortenLink</span>
        </Link>
    );
}