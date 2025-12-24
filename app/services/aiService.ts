import axiosClient from './axiosClient';

export interface ScriptGeneratorPayload {
    url: string;
    platform: 'tiktok' | 'instagram' | 'youtube';
    tone: 'professional' | 'funny' | 'inspirational' | 'casual';
}

export interface ScriptResponse {
    caption: string;
    script: string;
    keywords: string[];
}

export const aiService = {
    // POST /api/ai/script
    generateScript: (payload: ScriptGeneratorPayload) => {
        return axiosClient.post<any, { data: ScriptResponse }>('/api/ai/script', payload);
    },

    // POST /api/ai/verify
    verifyLink: (url: string) => {
        return axiosClient.post('/api/ai/verify', { url });
    },

    generateInsights: (linkId: number) => {
        return axiosClient.post('/api/ai/insights', { linkId });
    }
};