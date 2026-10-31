import { NextRequest, NextResponse } from 'next/server';
import { createStore, getTenantBySlug } from '@/lib/store-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await createStore(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create store' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
  }

  const tenant = await getTenantBySlug(slug);
  if (!tenant) {
    return NextResponse.json({ error: 'Store not found' }, { status: 404 });
  }

  return NextResponse.json(tenant);
}
