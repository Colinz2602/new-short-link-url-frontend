export interface Domain {
    id: string;
    domain_name: string;
    type?: 'public' | 'custom';
}

export interface GeoRule {
    country: string;
    url: string;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface CreateLinkPayload {
    original_url: string;
    custom_slug?: string;
    domain: string;
    verified_safe: boolean;
    geo_targeting?: Record<string, string> | null;
    expire_at?: string | null;
    schedule_at?: string | null;
}

// API Responses
export interface ApiLink {
    id: number;
    original_url: string;
    full_short_url: string;
    click_count: number;
    state: 'active' | 'expired' | 'flagged';
    createdAt: string;
    domain?: {
        domain_name: string;
    };
    qr_image?: {
        url: string;
    };
}

export interface PaginationMeta {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

export interface LinksResponse {
    data: ApiLink[];
    meta: PaginationMeta;
}

export interface AnalyticsData {
    link: ApiLink;
    analytics: {
        clicksOverTime: { date: string; count: string }[];
        topCountries: { country: string; count: string }[];
        topReferrers: { referrer: string; count: string }[];
        topDevices: { device: string; count: string }[];
    };
}