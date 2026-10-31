import React from 'react';
import { notFound } from 'next/navigation';
import { getTenantBySlug, getCatalogItemsByTenant, getOrdersByTenant } from '@/lib/store-service';
import MerchantDashboardClient from './MerchantDashboardClient';

export const dynamic = 'force-dynamic';

interface DashboardPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { slug } = await params;
  const tenant = await getTenantBySlug(slug);

  if (!tenant) {
    notFound();
  }

  const items = await getCatalogItemsByTenant(tenant.id);
  const orders = await getOrdersByTenant(tenant.id);

  return <MerchantDashboardClient tenant={tenant} initialItems={items} initialOrders={orders} />;
}
