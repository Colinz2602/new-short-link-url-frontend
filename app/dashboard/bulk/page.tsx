'use client';

import BulkImportResult from '../../components/dashboard/BulkImportResult';
import { useBulkImport } from '../../hooks/useBulkImport';
import PageHeader from '../../components/common/PageHeader';

export default function BulkImportPage() {
    const {
        file, uploading, result, error,
        handleFileChange, handleUpload
    } = useBulkImport();

    return (
        <main className="max-w-4xl mx-auto p-8">

            <PageHeader title="" showBulkImport={false} />

            <h1 className="text-3xl font-bold mb-6">Bulk Import (Tạo link hàng loạt)</h1>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-300">
                    <p className="font-bold">📝 Cấu trúc file CSV:</p>
                    <p className="mt-1">File cần có header: <code>original_url</code>, <code>custom_slug</code> (tuỳ chọn).</p>
                </div>

                <div className="flex flex-col gap-4">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <button
                        onClick={handleUpload}
                        disabled={uploading || !file}
                        className={`w-full py-3 rounded-xl font-bold text-white transition shadow-lg ${uploading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                        {uploading ? 'Đang xử lý...' : 'Upload & Xử lý'}
                    </button>
                </div>

                {error && <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl text-center">{error}</div>}
            </div>

            {result && <BulkImportResult result={result} />}
        </main>
    );
}