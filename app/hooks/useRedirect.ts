// app/hooks/useRedirect.ts
import { useState, useEffect, useRef } from 'react';
import { linkService } from '../services/linkService';

export function useRedirect(slug: string) {
    const [message, setMessage] = useState('Đang tìm link của bạn...');
    const [error, setError] = useState<string | null>(null);
    const hasExecuted = useRef(false);

    useEffect(() => {
        if (!slug || hasExecuted.current) return;
        hasExecuted.current = true;

        const handleRedirect = async () => {

            try {
                linkService.trackClick(slug, document.referrer || 'direct')
                    .catch(err => console.error('Analytics error:', err));

                const res: any = await linkService.getLinkBySlug(slug);

                const targetUrl = res.data?.targetUrl || res.targetUrl;

                if (!targetUrl) throw new Error('Link không tồn tại hoặc lỗi server.');

                setMessage('Đã tìm thấy! Đang chuyển hướng...');
                window.location.replace(targetUrl);

            } catch (err: any) {
                setError(err.message || err.error?.message || 'Lỗi không xác định.');
                setMessage('');
            }
        };

        handleRedirect();
    }, [slug]);

    return { message, error };
}