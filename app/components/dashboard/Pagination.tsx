import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    page: number;
    pageCount: number;
    setPage: (page: number | ((p: number) => number)) => void;
}

export default function Pagination({ page, pageCount, setPage }: PaginationProps) {
    if (pageCount <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 pt-4">
            <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 border border-gray-700 hover:border-gray-600 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-gray-400">
                Page <span className="text-white font-bold">{page}</span> / {pageCount}
            </span>

            <button
                disabled={page === pageCount}
                onClick={() => setPage(p => p + 1)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 border border-gray-700 hover:border-gray-600 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}