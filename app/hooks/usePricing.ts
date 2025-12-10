import { useState } from 'react';
import { userService } from '../services/userService';
import { useAuth } from '../context/AuthContext';

export function usePricing() {
    const { user } = useAuth();
    const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

    const handleCheckout = async (priceId: string, planType: string) => {
        if (!user) {
            alert('Vui lòng đăng nhập để đăng ký gói.');
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

    return { user, processingPlanId, handleCheckout };
}