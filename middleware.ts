import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /admin routes
    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('sb-access-token')?.value;

        if (!token) {
            // Redirect to login if no token
            return NextResponse.redirect(new URL('/login', request.url));
        }

        // You could add additional token validation here if needed
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
