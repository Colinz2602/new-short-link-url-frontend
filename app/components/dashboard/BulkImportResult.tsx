interface BulkResultProps {
    result: {
        total: number;
        success: number;
        failed: number;
        details: Array<{
            originalUrl: string;
            shortUrl?: string;
            error?: string;
            status: 'success' | 'failed';
        }>;
    };
}

export default function BulkImportResult({ result }: BulkResultProps) {
    return (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold mb-4">Kết quả xử lý</h2>

            {/* Thống kê tổng quan */}
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <span className="block text-gray-500 dark:text-gray-400 text-sm">Tổng số dòng</span>
                    <span className="text-2xl font-bold">{result.total}</span>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-lg">
                    <span className="block text-sm">Thành công</span>
                    <span className="text-2xl font-bold">{result.success}</span>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-4 rounded-lg">
                    <span className="block text-sm">Thất bại</span>
                    <span className="text-2xl font-bold">{result.failed}</span>
                </div>
            </div>

            {/* Bảng chi tiết */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Original URL</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Short Link / Error</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {result.details.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs" title={item.originalUrl}>
                                        {item.originalUrl}
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {item.status === 'success' ? (
                                            <a href={item.shortUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                {item.shortUrl}
                                            </a>
                                        ) : (
                                            <span className="text-red-500">{item.error}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {item.status === 'success' ? '✅' : '❌'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}