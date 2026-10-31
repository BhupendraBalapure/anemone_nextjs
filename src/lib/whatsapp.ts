import { CartItem } from './supabase/types';

interface WhatsAppOrderPayload {
  orderNumber: string;
  storeName: string;
  whatsappNumber: string;
  currency: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  totalAmount: number;
  notes?: string;
}

export function generateWhatsAppOrderUrl(payload: WhatsAppOrderPayload): string {
  const cleanPhone = payload.whatsappNumber.replace(/[^0-9]/g, '');

  const lines: string[] = [];
  lines.push(`🛍️ *NEW ORDER: #${payload.orderNumber}*`);
  lines.push(`🏪 Store: *${payload.storeName}*`);
  lines.push('--------------------------------');
  lines.push(`👤 *Customer:* ${payload.customerName}`);
  lines.push(`📞 *Phone:* ${payload.customerPhone}`);
  if (payload.customerAddress) {
    lines.push(`📍 *Delivery Address:* ${payload.customerAddress}`);
  }
  lines.push('--------------------------------');
  lines.push('📦 *Ordered Items:*');

  payload.items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    lines.push(`• ${item.title} (x${item.quantity}) - ${payload.currency} ${itemTotal.toFixed(2)}`);
  });

  lines.push('--------------------------------');
  lines.push(`Subtotal: ${payload.currency} ${payload.subtotal.toFixed(2)}`);
  if (payload.discountAmount > 0) {
    lines.push(`Discount (${payload.couponCode || 'PROMO'}): -${payload.currency} ${payload.discountAmount.toFixed(2)}`);
  }
  lines.push(`💰 *Total Amount: ${payload.currency} ${payload.totalAmount.toFixed(2)}*`);
  
  if (payload.notes) {
    lines.push(`📝 *Notes:* ${payload.notes}`);
  }
  lines.push('--------------------------------');
  lines.push('⚡ _Sent via Anemony Digital Operating System_');

  const fullText = lines.join('\n');
  const encoded = encodeURIComponent(fullText);

  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
