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
        return axiosClient.get(`/api/links/go/${slug}`);
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
        try {
            const publicReq = axiosClient.get<any, { data: Domain[] }>('/api/domains?filters[type]=public');

            if (userId) {
                const [publicRes, customRes] = await Promise.all([
                    publicReq,
                    axiosClient.get<any, { data: Domain[] }>(`/api/domains?filters[type]=custom&filters[users_permissions_user][id]=${userId}`)
                ]);
                return [...(publicRes.data || []), ...(customRes.data || [])];
            }

            const res = await publicReq;
            return res.data || [];
        } catch (error) {
            console.error("Error fetching domains:", error);
            return [];
        }
    },

    generateQr: (linkId: number) => {
        return axiosClient.post<any, { url: string }>(`/api/links/${linkId}/qr`);
    },


};