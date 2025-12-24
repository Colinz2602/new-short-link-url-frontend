import Link from 'next/link';

export default function CreatePageHeader() {
    return (
        <div className="mb-8">
            <div className="flex justify-end mb-4">
                <Link
                    href="/bulk"
                    className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition font-bold text-sm flex items-center gap-2"
                >
                    📂 Bulk Import (CSV)
                </Link>
            </div>
            <div className="text-center mt-4">
                <h1 className="font-[Inter] text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 pb-2 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-cyan-400 to-teal-400">
                    Create Short Link
                </h1>
            </div>
        </div>
    );
}