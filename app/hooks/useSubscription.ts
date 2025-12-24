import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';

export function useSubscription() {
    const { user } = useAuth();
    const [plan, setPlan] = useState<string>('Đang tải...');

    useEffect(() => {
        if (!user) return;

        const fetchSubscription = async (retryCount = 0) => {
            const token = localStorage.getItem('strapi_token');
            if (!token) {
                if (retryCount < 5) {
                    console.log(`⏳ Chưa thấy Strapi Token, đang đợi... (Lần ${retryCount + 1})`);
                    setTimeout(() => fetchSubscription(retryCount + 1), 500);
                } else {
                    console.error("❌ Không tìm thấy Token sau khi đăng nhập. Fallback về Free.");
                    setPlan('Free Member');
                }
                return;
            }
            try {
                const response: any = await userService.getSubscription();
                const realData = response.data || response;
                let display = 'Free Member';

                // Mapping logic
                if (realData.plan_type === 'bundle') display = 'Pro Bundle';
                else if (realData.plan_type === 'annual') display = 'Annual VIP';
                else if (realData.plan_type === 'quarterly') display = 'Quarterly Pro';

                setPlan(display);
            } catch (err) {
                console.error('Lỗi lấy gói:', err);
                setPlan('Free Member');
            }
        };

        fetchSubscription();
    }, [user]);

    return { plan };
}