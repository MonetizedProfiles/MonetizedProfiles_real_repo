export async function klaviyoSubscribe(email: string, source: string, properties?: Record<string, unknown>) {
  const res = await fetch('/api/klaviyo/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source, properties }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Subscription failed' }));
    throw new Error(data.error || 'Subscription failed');
  }
  return res.json();
}

export async function klaviyoTrack(
  email: string,
  event: string,
  properties: Record<string, unknown>,
) {
  const res = await fetch('/api/klaviyo/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, event, properties }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: 'Tracking failed' }));
    throw new Error(data.error || 'Tracking failed');
  }
  return res.json();
}
