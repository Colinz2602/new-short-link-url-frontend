import axiosClient from './axiosClient';

export const userService = {
    getMe: () => {
        return axiosClient.get('/api/users/me');
    },

    getSubscription: () => {
        return axiosClient.get('/api/subscriptions/me');
    },

    getSubscriptionTiers: () => {
        return axiosClient.get('/api/subscription-tiers?filters[is_active][$eq]=true&sort=price:asc');
    },

    createCheckoutSession: (priceId: string, planType: string) => {
        return axiosClient.post('/api/payment/checkout', {
            priceId,
            planType
        });
    },

    loginGoogle: (idToken: string) => {
        return axiosClient.post('/api/auth/google', { idToken });
    }
};