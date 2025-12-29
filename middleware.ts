import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl;

    const hostname = req.headers.get('host') || '';
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

    const currentHost = process.env.NODE_ENV === 'production'
        ? hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '')
        : hostname.replace(`.localhost:3000`, '');

    const systemSubdomains = ['5ea', 'u2l', 'trimz'];

    const isSystemSubdomain = systemSubdomains.includes(currentHost);

    const systemPaths = [
        '/create',
        '/dashboard',
        '/bulk',
        '/pricing',
        '/auth',
        '/login',
        '/register',
        '/favicon.ico',
        '/platform/link-management',
        '/tool/script-generator',
        '/tool',
        '/tool/facebook-scraper',
        '/platform/smarttools'
    ];

    const isSystemPath = systemPaths.some(path => url.pathname.startsWith(path));

    const isApiOrStatic = url.pathname.startsWith('/_next') ||
        url.pathname.startsWith('/api') ||
        url.pathname.startsWith('/static') ||
        url.pathname.includes('.');

    if (!isApiOrStatic && !isSystemPath && (isSystemSubdomain || hostname !== rootDomain)) {

        if (url.pathname !== '/') {
            return NextResponse.rewrite(new URL(`/redirect${url.pathname}`, req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all paths except for:
         * 1. /api routes
         * 2. /_next 
         * 3. /_static
         * 4. all root files inside /public (e.g. /favicon.ico)
         */
        "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};