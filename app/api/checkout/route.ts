import { NextRequest, NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lines } = body;

    if (!lines || !Array.isArray(lines) || lines.length === 0) {
      return NextResponse.json({ error: 'No items provided' }, { status: 400 });
    }

    const cart = await createCart(lines);
    return NextResponse.json({ checkoutUrl: cart.checkoutUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
