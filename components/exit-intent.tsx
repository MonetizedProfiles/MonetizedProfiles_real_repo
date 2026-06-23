'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Shield, Star, ArrowRight, Mail } from 'lucide-react';
import { TRUST_STATS } from '@/lib/constants';
import { klaviyoSubscribe } from '@/lib/klaviyo';

export function ExitIntent() {
  const [show, setShow] = useState(false);
  const [hasFired, setHasFired] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !hasFired) {
      setShow(true);
      setHasFired(true);
    }
  }, [hasFired]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissed = localStorage.getItem('mp-exit-dismissed');
    if (dismissed) {
      setHasFired(true);
      return;
    }

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('mp-exit-dismissed', '1');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    setError('');

    try {
      await klaviyoSubscribe(email, 'exit_intent');
      setSubmitted(true);
      localStorage.setItem('mp-exit-subscribed', '1');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={dismiss} />
      <div className="relative bg-background rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-slide-up">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 p-2 hover:bg-secondary rounded-lg"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          {submitted ? <Mail className="h-8 w-8 text-primary" /> : <Shield className="h-8 w-8 text-primary" />}
        </div>

        {submitted ? (
          <>
            <h2 className="text-2xl font-bold mb-2">You&apos;re In!</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Use code <span className="font-bold text-primary">WELCOME10</span> at checkout for 10% off your first account.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Check your inbox for exclusive deals and creator tips.
            </p>
            <button
              onClick={dismiss}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors w-full"
            >
              Start Browsing <ArrowRight className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">Wait — Get 10% Off!</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Join {TRUST_STATS.accountsSold.toLocaleString()}+ creators already earning with our pre-monetized accounts. Enter your email for an exclusive discount.
            </p>

            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-sm text-muted-foreground ml-1">{TRUST_STATS.totalReviews}+ reviews</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors w-full disabled:opacity-50"
              >
                {submitting ? 'Subscribing...' : 'Get My 10% Off'}
              </button>
            </form>

            <p className="text-xs text-muted-foreground mt-3">
              Instant delivery &bull; 100% organic &bull; 30-day money-back guarantee
            </p>
          </>
        )}
      </div>
    </div>
  );
}
