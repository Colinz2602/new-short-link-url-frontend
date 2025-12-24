import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function BulkImportHeader() {
    return (
        <div className="mb-8">
            <Link
                href="/create"
                className="text-blue-400 hover:text-blue-300 transition flex items-center gap-1 text-sm font-bold mb-4 w-fit"
            >
                <ChevronLeft className="w-4 h-4" /> Back to Create Link
            </Link>

            <div className="text-center">
                <h1 className="font-[Inter] text-4xl md:text-5xl font-extrabold mb-4 pb-2 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-green-400 via-teal-400 to-blue-500">
                    Bulk Import
                </h1>
            </div>
        </div>
    );
}