import axiosClient from './axiosClient';

export interface Tool {
    id: number;
    documentId: string;
    name: string;
    description: string;
    price: number;
    slug: string;
    active: boolean;
    period: 'month' | 'year' | 'week' | 'day';
    interval: number;
    is_active_for_user?: boolean;
    stripe_price_id?: string;
    stripe_product_id?: string;
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