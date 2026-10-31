import React from 'react';
import { notFound } from 'next/navigation';
import { getTenantBySlug, getCatalogItemsByTenant } from '@/lib/store-service';
import StorefrontClient from './StorefrontClient';

export const dynamic = 'force-dynamic';

interface StorePageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StorePage({ params, searchParams }: StorePageProps) {
  const { slug } = await params;
  const sParams = await searchParams;
  const demoParam = sParams.demo === '1' || sParams.demo === 'true';
  const themeParam = typeof sParams.theme === 'string' ? sParams.theme : undefined;

  const tenant = await getTenantBySlug(slug);

  if (!tenant) {
    notFound();
  }

  const items = await getCatalogItemsByTenant(tenant.id);

  return (
    <StorefrontClient
      tenant={tenant}
      initialItems={items}
      initialTheme={themeParam}
      isDemoMode={demoParam}
    />
  );
}
