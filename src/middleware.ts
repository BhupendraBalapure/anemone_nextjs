import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || 'localhost:3000';

  // 1. Clean host (remove port and leading www)
  const cleanHost = hostname.replace(/:[0-9]+$/, '').toLowerCase().replace(/^www\./, '');

  const rootDomain = (process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'anemony.in')
    .replace(/:[0-9]+$/, '')
    .toLowerCase()
    .replace(/^www\./, '');

  const centralDomains = ['localhost', '127.0.0.1', 'anemony.in', rootDomain];
  const isVercel = cleanHost.endsWith('.vercel.app') || cleanHost.endsWith('.now.sh');
  const isCentral = centralDomains.includes(cleanHost) || isVercel;

  // 2. If accessing central platform directly
  if (isCentral) {
    // Standard platform routes (/onboarding, /store/[slug], /admin, etc.) pass through
    return NextResponse.next();
  }

  // 3. Subdomain check (e.g., store1.anemony.in, store1.localhost, or store1.<custom-root>)
  const isSubdomain =
    cleanHost.endsWith('.anemony.in') ||
    cleanHost.endsWith('.localhost') ||
    (rootDomain !== 'localhost' && cleanHost.endsWith(`.${rootDomain}`));

  if (isSubdomain) {
    // Extract the subdomain part (e.g. bhupendra-2011 from bhupendra-2011.localhost)
    const parts = cleanHost.split('.');
    const subdomain = parts[0];

    // Don't rewrite platform subdomains like app or admin
    if (subdomain !== 'app' && subdomain !== 'admin') {
      const targetPath = `/store/${subdomain}${url.pathname === '/' ? '' : url.pathname}${url.search}`;
      return NextResponse.rewrite(new URL(targetPath, req.url));
    }
  }

  // 4. Fallback: pass through to standard routes
  return NextResponse.next();
}
