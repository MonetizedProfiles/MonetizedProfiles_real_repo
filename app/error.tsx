'use client';

import Link from 'next/link';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-24 text-center max-w-lg">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-muted-foreground mb-8">
        We hit an unexpected error. Please try again or browse our products.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/collections/all"
          className="inline-flex items-center justify-center border border-border px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
