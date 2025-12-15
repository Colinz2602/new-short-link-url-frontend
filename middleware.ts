import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/auth') ||
        pathname.startsWith('/create') ||
        pathname.startsWith('/pricing') ||
        pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    if (pathname.length > 1) {
        const url = request.nextUrl.clone()
        url.pathname = `/redirect${pathname}`
        return NextResponse.rewrite(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/:path*',
}