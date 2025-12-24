export interface Plan {
    id: string;
    name: string;
    price: string;
    period: string;
    features: string[];
    limitation: string;
    type: string;
    highlight: boolean;
}

export const PLANS: Plan[] = [
    {
        id: "free_no_signup",
        name: 'Free (No signup)',
        price: '0đ',
        period: '/ month',
        features: ['Shorten 50 links/month'],
        limitation: 'No dashboard',
        type: 'free',
        highlight: false
    },
    {
        id: 'free_signup',
        name: 'Free (Signup)',
        price: '0đ',
        period: '/ month',
        features: ['Basic analytics'],
        limitation: '200 links/month',
        type: 'free',
        highlight: false
    },
    {
        id: 'price_1SWCPtACee5Wzv9GqH1gCeLF',
        name: 'Pro Bundle',
        price: '$9.99',
        period: '/ month',
        features: ['Unlock all tools'],
        limitation: 'No Limit',
        type: 'bundle',
        highlight: true
    },
    {
        id: 'price_1SWCVAACee5Wzv9GujYTLHxK',
        name: 'Quarterly Pro',
        price: '$24.99',
        period: '/ 3 month',
        features: ['Unlock all tools'],
        limitation: 'No limit',
        type: 'quarterly',
        highlight: false
    },
    {
        id: 'price_1SWCU4ACee5Wzv9GhJaOQygR',
        name: 'Annual VIP',
        price: '$99.9',
        period: '/ year',
        features: ['Unlock all tools', '+2 months free'],
        limitation: 'Annual',
        type: 'annual',
        highlight: true
    },
];