import axiosClient from './axiosClient';
import { CreateLinkPayload, Domain, LinksResponse, AnalyticsData, ApiLink } from '../types';

export const linkService = {
    verifyLink: (originalUrl: string) => {
        return axiosClient.post('/api/links/verify', { originalUrl });
    },

    createLink: (payload: CreateLinkPayload) => {
        return axiosClient.post<any, ApiLink>('/api/links', payload);
    },

    getLinkBySlug: (slug: string) => {
        return axiosClient.get(`/api/links/${slug}`);
    },

    bulkImport: (formData: FormData) => {
        return axiosClient.post('/api/links/bulk', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    trackClick: (slug: string, referrer: string) => {
        return axiosClient.post('/api/analytics/click', {
            slug,
            referrer
        });
    },

    getAnalytics: (linkId: string) => {
        return axiosClient.get<any, AnalyticsData>(`/api/analytics/${linkId}`);
    },

    getMyLinks: (page = 1, pageSize = 10) => {
        return axiosClient.get<any, LinksResponse>(`/api/links`, {
            params: {
                page,
                pageSize,
                sort: 'createdAt:desc'
            }
        });
    },

    getDomains: async (userId?: number): Promise<Domain[]> => {
        console.log("🚀 [LinkService] Bắt đầu gọi getDomains...");
        try {
            console.log("📡 [LinkService] Requesting: /api/domains?filters[type]=public");

            const publicReq = axiosClient.get<any, { data: Domain[] }>('/api/domains?filters[type]=public');

            if (userId) {
                console.log(`👤 [LinkService] Có UserId ${userId}, gọi thêm custom domains...`);
                const [publicRes, customRes] = await Promise.all([
                    publicReq,
                    axiosClient.get<any, { data: Domain[] }>(`/api/domains?filters[type]=custom&filters[users_permissions_user][id]=${userId}`)
                ]);
                const combined = [...(publicRes.data || []), ...(customRes.data || [])];
                console.log("✅ [LinkService] Kết quả (User):", combined);
                return combined;
            }

            const res = await publicReq;
            console.log("✅ [LinkService] Kết quả (Guest - Public Only):", res.data);
            return res.data || [];
        } catch (error: any) {
            console.error("❌ [LinkService] Error fetching domains:", {
                status: error?.response?.status,
                statusText: error?.response?.statusText,
                url: error?.config?.url,
                message: error?.message
            });
            return [];
        }
    },

    generateQr: (linkId: number) => {
        return axiosClient.post<any, { url: string }>(`/api/links/${linkId}/qr`);
    },


};