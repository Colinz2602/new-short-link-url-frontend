import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';

export function useSubscription() {
    const { user } = useAuth();
    const [plan, setPlan] = useState<string>('Đang tải...');
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    useEffect(() => {
        if (!user) return;

        const fetchSubscription = async (retryCount = 0) => {
            const token = localStorage.getItem('strapi_token');
            if (!token) {
                if (retryCount < 5) {
                    setTimeout(() => fetchSubscription(retryCount + 1), 500);
                } else {
                    setPlan('Free Member');
                }
                return;
            }
            try {
                const [subResponse, tiersResponse] = await Promise.all([
                    userService.getSubscription(),
                    userService.getSubscriptionTiers()
                ]);

                const subData = (subResponse as any).data || subResponse;
                const tiersData = (tiersResponse as any).data || tiersResponse;
                const tiers = Array.isArray(tiersData) ? tiersData : (tiersData.data || []);

                let display = 'Free Member';

                // Tìm tier trong danh sách có type khớp với plan_type của user
                if (subData.plan_type != "free") {
                    const matchedTier = tiers.find((t: any) => t.type === subData.plan_type);
                    if (matchedTier && matchedTier.name) {
                        display = matchedTier.name;
                    }
                }

                setPlan(display);

                if (subData.updatedAt) setStartDate(subData.updatedAt);
                if (subData.active_until) setEndDate(subData.active_until);

            } catch (err) {
                console.error('Error getting package:', err);
                setPlan('Free Member');
            }
        };

        fetchSubscription();
    }, [user]);

    return { plan, startDate, endDate };
}