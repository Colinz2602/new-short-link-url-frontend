import axiosClient from './axiosClient';

export const userService = {
    getMe: () => {
        return axiosClient.get('/api/users/me');
    },

    getSubscription: () => {
        return axiosClient.get('/api/subscriptions/me');
    },

    createCheckoutSession: (priceId: string, planType: string) => {
        return axiosClient.post('/api/subscriptions/checkout', {
            priceId,
            planType
        });
    },

    loginGoogle: (idToken: string) => {
        return axiosClient.post('/api/auth/google', { idToken });
    }
};