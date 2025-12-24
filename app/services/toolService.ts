import axiosClient from './axiosClient';

export interface Tool {
    id: number;
    documentId: string;
    name: string;
    description: string;
    price: number;
    slug: string;
    active: boolean;
    is_active_for_user?: boolean;
    stripe_price_id?: string;
}

export const toolService = {
    getTools: () => {
        return axiosClient.get<any, { data: Tool[] }>('/api/tools');
    },
    scrapeFacebook: (url: string) => {
        return axiosClient.post('/api/scraper/facebook', { url });
    },
    buyTool: (priceId: string, toolId: number) => {
        return axiosClient.post('/api/payment/checkout', {
            priceId,
            planType: 'tool',
            toolId
        });
    }
};