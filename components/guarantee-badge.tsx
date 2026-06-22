import { Shield } from 'lucide-react';

export function GuaranteeBadge({ variant = 'inline' }: { variant?: 'inline' | 'banner' }) {
  if (variant === 'banner') {
    return (
      <section className="py-10 bg-green-50 border-y border-green-200">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-7 w-7 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">30-Day Money-Back Guarantee</h3>
          <p className="text-sm text-muted-foreground">
            If your account has any issues we can&apos;t resolve, you get a full refund within 30 days. No questions asked. Every account is backed by our guarantee.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
      <Shield className="h-8 w-8 text-green-600 flex-shrink-0" />
      <div>
        <p className="font-semibold text-sm">30-Day Money-Back Guarantee</p>
        <p className="text-xs text-muted-foreground">Full refund if any issues we can&apos;t resolve. No questions asked.</p>
      </div>
    </div>
  );
}
