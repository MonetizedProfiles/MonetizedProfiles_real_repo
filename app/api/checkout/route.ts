import { NextRequest, NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { lines } = body;

    if (!lines || !Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    if (lines.length > 10) {
      return NextResponse.json({ error: 'Too many items' }, { status: 400 });
    }

    for (const line of lines) {
      if (!line.merchandiseId || typeof line.merchandiseId !== 'string') {
        return NextResponse.json({ error: 'Invalid item format' }, { status: 400 });
      }
      if (!Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 10) {
        return NextResponse.json({ error: 'Invalid quantity' }, { status: 400 });
      }
    }

    const cart = await createCart(lines);
    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
