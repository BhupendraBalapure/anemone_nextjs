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

  const centralDomains = ['localhost', '127.0.0.1', 'anemony.in'];
  const isCentral = centralDomains.includes(cleanHost);

  // 2. If accessing central platform directly
  if (isCentral) {
    // Standard platform routes (/onboarding, /store/[slug], /admin, etc.) pass through
    return NextResponse.next();
  }

  // 3. Subdomain check (e.g., store1.anemony.in or store1.localhost)
  const isSubdomainOfCentral =
    cleanHost.endsWith('.anemony.in') || cleanHost.endsWith('.localhost');

  if (isSubdomainOfCentral) {
    const subdomain = cleanHost.split('.')[0];
    // Rewrite internally to /store/[slug]
    return NextResponse.rewrite(
      new URL(`/store/${subdomain}${url.pathname === '/' ? '' : url.pathname}`, req.url)
    );
  }

  // 4. Custom domain mapping (e.g., shop.brand.com)
  // For custom domains, we rewrite to /store/domain/[customDomain]
  return NextResponse.rewrite(
    new URL(`/store/domain/${cleanHost}${url.pathname === '/' ? '' : url.pathname}`, req.url)
  );
}
