import { useState, useEffect } from 'react';
import { linkService } from '../services/linkService';
import { useAuth } from '../context/AuthContext';

export function useAnalytics(linkId: string) {
    const { user, loading: authLoading } = useAuth();
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (authLoading || !user || !linkId) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                console.log(`[Frontend Hook] Calling API for LinkID: ${linkId}`);
                const result: any = await linkService.getAnalytics(linkId);
                console.log('[Frontend Hook] Data received:', result);
                setData(result.data);
            } catch (err: any) {
                console.error('[Frontend Hook] Error:', err);
                setError(err?.error?.message || err?.message || 'Error loading data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [linkId, user, authLoading]);

    return { data, loading, error, authLoading };
}