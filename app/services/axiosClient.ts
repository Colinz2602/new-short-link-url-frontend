import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

const axiosClient = axios.create({
    baseURL: STRAPI_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Tự động gắn Token vào mọi request
axiosClient.interceptors.request.use(async (config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('strapi_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Xử lý response và lỗi toàn cục
axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.error("The token has expired or is invalid.");
            localStorage.removeItem('strapi_token');
            window.location.href = '/';
        }
        return Promise.reject(error.response?.data || error);
    }
);

export default axiosClient;