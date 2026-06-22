'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { X, Shield, Star, ArrowRight } from 'lucide-react';
import { TRUST_STATS } from '@/lib/constants';

export function ExitIntent() {
  const [show, setShow] = useState(false);
  const [hasFired, setHasFired] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && !hasFired) {
      setShow(true);
      setHasFired(true);
    }
  }, [hasFired]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissed = sessionStorage.getItem('mp-exit-dismissed');
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
    sessionStorage.setItem('mp-exit-dismissed', '1');
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
          <Shield className="h-8 w-8 text-primary" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Wait — Don&apos;t Miss Out!</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Join {TRUST_STATS.accountsSold.toLocaleString()}+ creators already earning with our pre-monetized accounts. Every purchase is backed by our 30-day guarantee.
        </p>

        <div className="flex items-center justify-center gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          ))}
          <span className="text-sm text-muted-foreground ml-1">{TRUST_STATS.totalReviews}+ reviews</span>
        </div>

        <Link
          href="/collections/all"
          onClick={dismiss}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors w-full"
        >
          Browse Accounts <ArrowRight className="h-4 w-4" />
        </Link>

        <p className="text-xs text-muted-foreground mt-3">
          Instant delivery &bull; 100% organic &bull; 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
}
