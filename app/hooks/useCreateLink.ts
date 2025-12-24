// app/hooks/useCreateLink.ts
import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import { linkService } from '../services/linkService';
import { userService } from '../services/userService';
import { Domain, GeoRule, CreateLinkPayload } from '../types';

export function useCreateLink() {
    const { user, loading: authLoading } = useAuth();

    // Form States
    const [originalUrl, setOriginalUrl] = useState('');
    const [customSlug, setCustomSlug] = useState('');
    const [domains, setDomains] = useState<Domain[]>([]);
    const [selectedDomain, setSelectedDomain] = useState<string>('');

    // Create domain
    const [showDomainInput, setShowDomainInput] = useState(false);
    const [newDomainName, setNewDomainName] = useState('');
    const [isCreatingDomain, setIsCreatingDomain] = useState(false);

    // Geo Targeting State
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [geoRules, setGeoRules] = useState<GeoRule[]>([]);

    // Scheduling State
    const [scheduleAt, setScheduleAt] = useState('');
    const [expireAt, setExpireAt] = useState('');

    // UI States
    const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [successResult, setSuccessResult] = useState<string | null>(null);

    const fetchDomains = async () => {
        try {
            let userId = null;
            if (user) {
                try {
                    const me: any = await userService.getMe();
                    userId = me.id;
                } catch (e) { console.error(e); }
            }
            const allDomains = await linkService.getDomains(userId || undefined);
            setDomains(allDomains);

            // Nếu chưa chọn domain nào hoặc domain đang chọn không còn trong list, chọn cái đầu tiên
            if (allDomains.length > 0 && !selectedDomain) {
                setSelectedDomain(allDomains[0].id);
            }
            return allDomains;
        } catch (err) {
            console.error("Lỗi tải domain", err);
            return [];
        }
    };

    // Fetch Domains
    useEffect(() => {
        if (!authLoading) {
            fetchDomains().then((fetchedDomains) => {
                if (fetchedDomains.length > 0) setSelectedDomain(fetchedDomains[0].id);
            });
        }
    }, [user, authLoading]);

    const handleCreateDomain = async () => {
        if (!newDomainName) return;
        const hasCustomDomain = domains.some(d => d.type === 'custom');

        if (hasCustomDomain) {
            setError('Mỗi tài khoản chỉ được tạo 1 Custom Domain.');
            return;
        }
        setIsCreatingDomain(true);
        setError(null);
        try {
            const res: any = await linkService.createDomain(newDomainName);
            const newDomain = res.data || res; // Strapi v5 trả về data

            // Refresh list và chọn domain mới
            const updatedList = await fetchDomains();
            setDomains(updatedList);
            setSelectedDomain(newDomain.id || newDomain.documentId); // Chọn domain vừa tạo

            // Reset UI
            setShowDomainInput(false);
            setNewDomainName('');

        } catch (err: any) {
            console.error(err);
            const msg = err?.error?.message || err?.message || 'Không thể tạo domain';
            setError(msg);
        } finally {
            setIsCreatingDomain(false);
        }
    };

    // Helper Functions cho GeoRules
    const addGeoRule = () => setGeoRules([...geoRules, { country: '', url: '' }]);

    const removeGeoRule = (index: number) => {
        const newRules = [...geoRules];
        newRules.splice(index, 1);
        setGeoRules(newRules);
    };

    const updateGeoRule = (index: number, field: 'country' | 'url', value: string) => {
        const newRules = [...geoRules];
        newRules[index] = { ...newRules[index], [field]: value };
        setGeoRules(newRules);
    };

    // Submit Function
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoadingMessage('Đang xử lý...');
        setError(null);
        setSuccessResult(null);

        try {

            // Verify Link
            const verifyRes: any = await linkService.verifyLink(originalUrl);
            const isSafe = verifyRes.data ? verifyRes.data.isSafe : verifyRes.isSafe;
            if (isSafe === false) {
                throw new Error('Link không an toàn theo Google Safe Browsing.');
            }

            // 2. Prepare Payload
            const geoTargetingJson: Record<string, string> = {};
            geoRules.forEach(rule => {
                if (rule.url?.trim()) geoTargetingJson[rule.country] = rule.url;
            });

            const payload: CreateLinkPayload = {
                original_url: originalUrl,
                custom_slug: customSlug || undefined,
                domain: selectedDomain,
                verified_safe: true,
                geo_targeting: Object.keys(geoTargetingJson).length > 0 ? geoTargetingJson : null,
                expire_at: expireAt || null,
                schedule_at: scheduleAt || null
            };

            // 3. Call API
            const res: any = await linkService.createLink(payload);
            const createdLink = res.data || res;
            setSuccessResult(createdLink.full_short_url);
            // Reset Form
            setOriginalUrl('');
            setCustomSlug('');
            setGeoRules([]);
            setScheduleAt('');
            setExpireAt('');

        } catch (err: any) {
            setError(err?.error?.message || err.message || 'Lỗi tạo link');
        } finally {
            setLoadingMessage(null);
        }
    };

    return {
        isAuthLoading: authLoading,
        domains,
        selectedDomain, setSelectedDomain,
        originalUrl, setOriginalUrl,
        customSlug, setCustomSlug,
        // Geo
        showAdvanced, setShowAdvanced,
        geoRules, addGeoRule, removeGeoRule, updateGeoRule,
        // Schedule
        scheduleAt, setScheduleAt,
        expireAt, setExpireAt,
        // UI
        loadingMessage, error, successResult,
        handleSubmit,
        // Domain
        user,
        showDomainInput, setShowDomainInput,
        newDomainName, setNewDomainName,
        handleCreateDomain, isCreatingDomain
    };
}