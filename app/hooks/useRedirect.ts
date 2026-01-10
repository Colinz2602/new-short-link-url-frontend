// app/hooks/useRedirect.ts
import { useState, useEffect, useRef } from 'react';
import { linkService } from '../services/linkService';

export function useRedirect(slug: string) {
    const [message, setMessage] = useState('Looking for your link...');
    const [error, setError] = useState<string | null>(null);
    const hasExecuted = useRef(false);

    useEffect(() => {
        if (!slug || hasExecuted.current) return;
        hasExecuted.current = true;

        const handleRedirect = async () => {

            try {
                const searchParams = new URLSearchParams(window.location.search);
                const mockIp = searchParams.get('mock_ip');

                linkService.trackClick(slug, document.referrer || 'direct')
                    .catch(err => console.error('Analytics error:', err));

                const res: any = await linkService.getLinkBySlug(
                    slug,
                    mockIp ? { mock_ip: mockIp } : {}
                );

                let targetUrl = res.data?.targetUrl || res.targetUrl;

                if (!targetUrl) throw new Error('The link does not exist, or there is a server error.');

                if (!/^https?:\/\//i.test(targetUrl)) {
                    targetUrl = `https://${targetUrl}`;
                }

                setMessage('Found! Redirecting...');
                window.location.replace(targetUrl);

            } catch (err: any) {
                setError(err.message || err.error?.message || 'An error occurred.');
                setMessage('');
            }
        };

        handleRedirect();
    }, [slug]);

    return { message, error };
}