import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_EVENTS = ['Viewed Product', 'Added to Cart', 'Started Checkout'] as const;
const KLAVIYO_API_VERSION = '2024-10-15';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 30;
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
    const { email, event, properties } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!ALLOWED_EVENTS.includes(event)) {
      return NextResponse.json({ error: 'Invalid event' }, { status: 400 });
    }

    const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Klaviyo not configured' }, { status: 500 });
    }

    const eventRes = await fetch('https://a.klaviyo.com/api/events', {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        'Content-Type': 'application/json',
        revision: KLAVIYO_API_VERSION,
      },
      body: JSON.stringify({
        data: {
          type: 'event',
          attributes: {
            metric: {
              data: {
                type: 'metric',
                attributes: { name: event },
              },
            },
            profile: {
              data: {
                type: 'profile',
                attributes: { email },
              },
            },
            properties: properties || {},
          },
        },
      }),
    });

    if (!eventRes.ok) {
      const err = await eventRes.text();
      console.error('Klaviyo track error:', eventRes.status, err);
      return NextResponse.json({ error: 'Tracking failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Klaviyo track error:', error);
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}
