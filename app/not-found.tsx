import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 text-center">
            <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
            <h2 className="text-2xl font-bold mb-4">Trang không tồn tại</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                Có vẻ như đường dẫn bạn đang tìm kiếm không đúng hoặc đã bị xóa.
            </p>
            <Link
                href="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition font-semibold"
            >
                Về trang chủ
            </Link>
        </div>
    );
}