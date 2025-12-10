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
            setQrUrl(getValidQrUrl(existingQrUrl));
        }
    }, [existingQrUrl]);

    const generateQR = async () => {
        setIsLoading(true);
        try {
            const data: any = await linkService.generateQr(linkId);
            if (data.url) {
                let finalUrl = data.url;
                if (data.url.startsWith('/')) {
                    finalUrl = `${STRAPI_URL}${data.url}`;
                } else if (!data.url.startsWith('http')) {
                    finalUrl = `${STRAPI_URL}/${data.url}`;
                }
                setQrUrl(finalUrl);
            }
        } catch (error) {
            console.error("Lỗi tạo QR:", error);
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