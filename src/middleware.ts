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
  
  // The main platform Vercel app domain or preview deployments of anemone-nextjs
  const isMainVercel =
    cleanHost === 'anemone-nextjs.vercel.app' ||
    (cleanHost.endsWith('.vercel.app') && cleanHost.startsWith('anemone-nextjs')) ||
    cleanHost.endsWith('.now.sh');

  const isCentral = centralDomains.includes(cleanHost) || isMainVercel;

  // 2. If accessing central platform directly
  if (isCentral) {
    // Standard platform routes (/onboarding, /store/[slug], /admin, etc.) pass through
    return NextResponse.next();
  }

  // 3. Subdomain check (e.g. store1.localhost, store1.anemony.in, or any custom Vercel domain like bhupendra-2011.vercel.app)
  const isVercelStoreDomain = cleanHost.endsWith('.vercel.app') && !isMainVercel;
  const isSubdomain =
    cleanHost.endsWith('.anemony.in') ||
    cleanHost.endsWith('.localhost') ||
    (rootDomain !== 'localhost' && cleanHost.endsWith(`.${rootDomain}`)) ||
    isVercelStoreDomain;

  if (isSubdomain) {
    let subdomain = '';
    if (isVercelStoreDomain) {
      subdomain = cleanHost.replace('.vercel.app', '');
    } else {
      subdomain = cleanHost.split('.')[0];
    }

    // Don't rewrite platform subdomains like app or admin
    if (subdomain && subdomain !== 'app' && subdomain !== 'admin') {
      const targetPath = `/store/${subdomain}${url.pathname === '/' ? '' : url.pathname}${url.search}`;
      return NextResponse.rewrite(new URL(targetPath, req.url));
    }
  }

  // 4. Fallback: pass through to standard routes
  return NextResponse.next();
}
