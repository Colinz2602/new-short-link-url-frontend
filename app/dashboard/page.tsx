'use client';

import Link from 'next/link';
import { useMyLinks } from '../hooks/useMyLinks';
import { ApiLink } from '../types'; // Import type chuẩn
import PageHeader from '../components/common/PageHeader';

export default function DashboardPage() {
    const {
        links, loading, error,
        page, setPage, pageCount, authLoading
    } = useMyLinks();

    if (authLoading) return <div className="p-12 text-center">Đang kiểm tra xác thực...</div>;

    return (
        <main className="max-w-6xl mx-auto p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">Dashboard của bạn</h1>
                <div className="flex gap-3">
                    <Link href="/dashboard/bulk" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow transition text-sm flex items-center gap-2">
                        📂 Bulk Import
                    </Link>
                    <Link href="/create" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow transition text-sm">
                        + Tạo Link Mới
                    </Link>
                </div>
            </div>

            {error && <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">{error}</div>}

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border dark:border-gray-700">
                {loading ? (
                    <div className="p-12 text-center text-gray-500">Đang tải danh sách...</div>
                ) : links.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        Bạn chưa có link nào.
                        <Link href="/create" className="text-blue-600 ml-1 hover:underline">Tạo ngay!</Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700 text-xs uppercase text-gray-500 dark:text-gray-300">
                                <tr>
                                    <th className="px-6 py-3">Short Link</th>
                                    <th className="px-6 py-3">Original URL</th>
                                    <th className="px-6 py-3 text-center">Clicks</th>
                                    <th className="px-6 py-3 text-right">Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {links.map((link: ApiLink) => (
                                    <tr key={link.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                        <td className="px-6 py-4 font-medium text-blue-600">
                                            <a href={link.full_short_url} target="_blank" rel="noreferrer" className="hover:underline">
                                                {link.full_short_url.replace(/^https?:\/\//, '')}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate" title={link.original_url}>
                                            {link.original_url}
                                        </td>
                                        <td className="px-6 py-4 text-center font-bold dark:text-white">
                                            {link.click_count}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/dashboard/${link.id}`} className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition">
                                                Analytics
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {pageCount > 1 && (
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="px-4 py-2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                        Trước
                    </button>
                    <span className="py-2 text-sm text-gray-500 dark:text-gray-400">Trang {page} / {pageCount}</span>
                    <button
                        disabled={page === pageCount}
                        onClick={() => setPage(p => p + 1)}
                        className="px-4 py-2 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                        Sau
                    </button>
                </div>
            )}
        </main>
    );
}