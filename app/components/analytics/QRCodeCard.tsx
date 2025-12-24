'use client';

import { useQRCode } from '../../hooks/useQRCode';
import { QrCode, Download, Loader2 } from 'lucide-react';

interface QRCodeCardProps {
    linkId: number;
    fullShortUrl: string;
    existingQrUrl?: string;
}

export default function QRCodeCard({ linkId, existingQrUrl }: QRCodeCardProps) {
    const { qrUrl, isLoading, generateQR, downloadQR } = useQRCode(
        linkId,
        existingQrUrl
    );

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col h-full">
            <h2 className="text-lg font-bold mb-6 text-gray-200 tracking-wide flex items-center gap-2">
                <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                QR Code
            </h2>

            <div className="flex-1 flex flex-col items-center justify-center">
                {qrUrl ? (
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300 w-full">
                        <div className="p-3 bg-white rounded-xl shadow-lg mb-6 max-w-[200px] w-full aspect-square flex items-center justify-center">
                            <img
                                src={qrUrl}
                                alt="QR Code"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <button
                            onClick={downloadQR}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/30 transition transform active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download (PNG)
                        </button>
                    </div>
                ) : (
                    <div className="py-8 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <QrCode className="w-8 h-8 text-gray-400" />
                        </div>

                        <p className="text-gray-400 mb-6 text-sm">
                            No QR code has been generated for this link yet.
                        </p>

                        <button
                            onClick={generateQR}
                            disabled={isLoading}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold disabled:opacity-50 transition flex items-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                'Generate QR Code'
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
