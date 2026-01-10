import { useState, useEffect } from 'react';
import { linkService } from '../services/linkService';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export function useQRCode(linkId: number, existingQrUrl?: string) {
    const [qrUrl, setQrUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Helper format URL
    const getValidQrUrl = (url?: string) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return `${STRAPI_URL}${url}`;
    };

    useEffect(() => {
        if (existingQrUrl) {
            const finalUrl = getValidQrUrl(existingQrUrl);
            setQrUrl(finalUrl);
        }
    }, [existingQrUrl]);

    const generateQR = async () => {
        setIsLoading(true);
        try {
            const res: any = await linkService.generateQr(linkId);
            const returnedUrl = res?.data?.url || res?.url;
            if (returnedUrl) {
                let finalUrl = returnedUrl;
                if (finalUrl.startsWith('/')) {
                    finalUrl = `${STRAPI_URL}${finalUrl}`;
                } else if (!finalUrl.startsWith('http')) {
                    finalUrl = `${STRAPI_URL}/${finalUrl}`;
                }
                setQrUrl(finalUrl);
            }
        } catch (error) {
            console.error("[CLIENT ERROR] QR Code Creation Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadQR = async () => {
        if (!qrUrl) return;
        try {
            const response = await fetch(qrUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `qr-${linkId}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (e) {
            console.error("Lỗi download", e);
            window.open(qrUrl, '_blank');
        }
    };

    return { qrUrl, isLoading, generateQR, downloadQR };
}