import Link from 'next/link';

interface PageHeaderProps {
    title: string;
    showBulkImport?: boolean;
}

export default function PageHeader({ title, showBulkImport = false }: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard"
                    className="text-gray-500 hover:text-blue-600 transition flex items-center gap-1"
                >
                    &larr; Quay lại Dashboard
                </Link>
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>

            {showBulkImport && (
                <Link
                    href="/dashboard/bulk"
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition font-bold text-sm flex items-center gap-2"
                >
                    📂 Bulk Import (CSV)
                </Link>
            )}
        </div>
    );
}