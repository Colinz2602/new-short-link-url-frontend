import { useState, useEffect } from 'react';
import { linkService } from '../services/linkService';

export function useGuestShortener() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createdLinks, setCreatedLinks] = useState<any[]>([]);
    const [domains, setDomains] = useState<any[]>([]);
    const [selectedDomain, setSelectedDomain] = useState<string>('');

    // Load lịch sử từ LocalStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedLinks = localStorage.getItem('guest_links');
            if (savedLinks) {
                try {
                    setCreatedLinks(JSON.parse(savedLinks));
                } catch (e) {
                    console.error("Lỗi đọc lịch sử:", e);
                }
            }
        }
    }, []);

    // Load danh sách Public Domains
    useEffect(() => {
        const fetchDomains = async () => {
            try {
                const allDomains = await linkService.getDomains();
                const publicDomains = allDomains.filter(d => d.type === 'public' || !d.type);
                setDomains(publicDomains);
                if (publicDomains.length > 0) {
                    setSelectedDomain(publicDomains[0].id);
                }
            } catch (e) {
                console.error("Failed to load public domain", e);
            }
        };
        fetchDomains();
    }, []);

    // Xử lý rút gọn link
    const handleShorten = async () => {
        if (!url) return;
        if (!selectedDomain) {
            setError("Hệ thống đang khởi động, vui lòng thử lại sau giây lát.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const payload = {
                original_url: url,
                domain: selectedDomain,
                verified_safe: true,
            };

            const res: any = await linkService.createLink(payload);
            const newLink = res.data || res;

            setCreatedLinks(prev => {
                const newList = [newLink, ...prev];
                localStorage.setItem('guest_links', JSON.stringify(newList));
                return newList;
            });

            setUrl('');
        } catch (err: any) {
            const msg = err?.error?.message || err?.response?.data?.error?.message || err?.message || "Có lỗi xảy ra khi tạo link.";
            if (msg.includes("50 links")) {
                setError("Bạn đã đạt giới hạn miễn phí (50 link). Hãy đăng nhập để tiếp tục!");
            } else {
                setError(msg);
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        url, setUrl,
        loading,
        error,
        createdLinks,
        domains,
        selectedDomain, setSelectedDomain,
        handleShorten
    };
}