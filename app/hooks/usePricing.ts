import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { Plan, SubscriptionTier } from '../types';

export function usePricing() {
    const { user } = useAuth();
    const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response: any = await userService.getSubscriptionTiers();
                const tiers: SubscriptionTier[] = Array.isArray(response) ? response : (response.data || []);

                const mappedPlans: Plan[] = tiers.map((tier) => {
                    let formattedPrice = `${tier.price}`;
                    if (tier.currency?.toLowerCase() === 'usd') {
                        formattedPrice = `$${tier.price}`;
                    } else if (tier.currency?.toLowerCase() === 'vnd') {
                        formattedPrice = `${tier.price.toLocaleString('vi-VN')}đ`;
                    } else if (tier.price === 0) {
                        formattedPrice = '0đ';
                    }

                    const periodMap: Record<string, string> = {
                        day: 'day',
                        week: 'week',
                        month: 'month',
                        year: 'year'
                    };

                    const periodText = periodMap[tier.period]

                    const intervalCount = tier.interval

                    let periodDisplay = '';

                    if (intervalCount > 1) {
                        periodDisplay = `/ ${intervalCount} ${periodText}`;
                    } else if (intervalCount == undefined) {
                        periodDisplay = ``;
                    } else {
                        periodDisplay = `/ ${periodText}`;
                    }

                    return {
                        id: tier.stripe_price_id || `free_${tier.id}`,
                        name: tier.name,
                        price: formattedPrice,
                        period: periodDisplay,
                        features: Array.isArray(tier.features) ? tier.features : [],
                        limitation: tier.limitation || '',
                        type: tier.type,
                        highlight: tier.highlight
                    };
                });

                setPlans(mappedPlans);
            } catch (error) {
                console.error('Failed to fetch subscription tiers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handleCheckout = async (priceId: string, planType: string) => {
        if (!user) {
            alert('Vui lòng đăng nhập để đăng ký gói.');
            // Hoặc chuyển hướng: window.location.href = '/auth/login';
            return;
        }

        setProcessingPlanId(priceId);

        try {
            const response: any = await userService.createCheckoutSession(priceId, planType);
            const checkoutUrl = response?.data?.url || response?.url;

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            } else {
                alert('Lỗi: Không lấy được link thanh toán từ server (Empty URL).');
            }

        } catch (error: any) {
            const msg = error?.response?.data?.error?.message || error.message || 'Đã có lỗi xảy ra';
            alert(`Lỗi: ${msg}`);
        } finally {
            setProcessingPlanId(null);
        }
    };

    return { user, processingPlanId, handleCheckout, plans, loading };
}