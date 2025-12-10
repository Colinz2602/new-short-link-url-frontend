'use client';
import { useQRCode } from '../../hooks/useQRCode';

interface QRCodeCardProps {
    linkId: number;
    fullShortUrl: string;
    existingQrUrl?: string;
}

export default function QRCodeCard({ linkId, existingQrUrl }: QRCodeCardProps) {
    const { qrUrl, isLoading, generateQR, downloadQR } = useQRCode(linkId, existingQrUrl);

    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col items-center justify-center text-center h-full">
            <h2 className="text-xl font-semibold mb-4">QR Code</h2>

            {qrUrl ? (
                <div className="flex flex-col items-center animate-in fade-in">
                    <div className="p-2 bg-white rounded-lg border shadow-sm mb-4">
                        <img src={qrUrl} alt="QR Code" className="w-48 h-48 object-contain" />
                    </div>
                    <button
                        onClick={downloadQR}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition"
                    >
                        Tải xuống (PNG)
                    </button>
                </div>
            ) : (
                <div className="py-8">
                    <p className="text-gray-500 mb-4 text-sm">Chưa có mã QR cho link này.</p>
                    <button
                        onClick={generateQR}
                        disabled={isLoading}
                        className="bg-gray-900 dark:bg-gray-700 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 transition"
                    >
                        {isLoading ? 'Đang tạo...' : 'Tạo QR Code ngay'}
                    </button>
                </div>
            )}

            <p className="mt-4 text-xs text-gray-400">Powered by CDN77</p>
        </div>
    );
}