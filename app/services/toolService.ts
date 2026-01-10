import axiosClient from './axiosClient';

export interface Tool {
    id: number;
    name: string;
    description: string;
    price: number;
    slug: string;
    interval: number;
    period: string;
    stripe_price_id: string;
    is_active_for_user: boolean;
    current_user_subscription?: {
        start_date: string;
        end_date: string | null;
    };
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