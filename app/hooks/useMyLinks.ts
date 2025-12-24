// app/hooks/useMyLinks.ts
import { useState, useEffect } from 'react';
import { linkService } from '../services/linkService';
import { useAuth } from '../context/AuthContext';

export function useMyLinks() {
    const { user, loading: authLoading } = useAuth();
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        // Nếu chưa load xong Auth hoặc chưa có user thì chưa làm gì cả
        if (authLoading || !user) return;

        const fetchLinks = async (retryCount = 0) => {
            // [SỬA]: Kiểm tra Token trước khi gọi
            const token = localStorage.getItem('strapi_token');

            if (!token) {
                if (retryCount < 10) { // Thử lại tối đa 10 lần (mỗi lần 200ms)
                    // console.log(`⏳ Chưa thấy Token, đợi đồng bộ... (Lần ${retryCount + 1})`);
                    setTimeout(() => fetchLinks(retryCount + 1), 200);
                    return;
                } else {
                    // Hết thời gian chờ mà vẫn không có token -> Lỗi thật
                    setError('Phiên đăng nhập không hợp lệ (Missing Token). Vui lòng đăng nhập lại.');
                    setLoading(false);
                    return;
                }
            }

            setLoading(true);
            setError(null);
            try {
                const res: any = await linkService.getMyLinks(page);
                setLinks(res.data);
                setPageCount(res.meta.pagination.pageCount);
            } catch (err: any) {
                if (err?.error) {
                    console.error("--> Chi tiết lỗi Strapi:", JSON.stringify(err.error, null, 2));
                    setError(err.error.message);
                } else {
                    console.error("--> Response Data:", JSON.stringify(err.response?.data, null, 2));
                    setError(err.message || 'Không thể tải danh sách link.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, [user, authLoading, page]);

    return {
        links,
        loading,
        error,
        page,
        setPage,
        pageCount,
        authLoading
    };
}