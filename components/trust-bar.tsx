import { Shield, Users, Star, ThumbsUp } from 'lucide-react';
import { TRUST_STATS } from '@/lib/constants';

export function TrustBar() {
  const stats = [
    { icon: Users, value: `${(TRUST_STATS.accountsSold / 1000).toFixed(1)}k+`, label: 'Accounts Sold' },
    { icon: Star, value: `${TRUST_STATS.averageRating}`, label: 'Average Rating' },
    { icon: ThumbsUp, value: `${TRUST_STATS.totalReviews}+`, label: 'Verified Reviews' },
    { icon: Shield, value: `${TRUST_STATS.satisfactionRate}%`, label: 'Satisfaction Rate' },
  ];

  return (
    <section className="border-y border-border bg-secondary/50 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="h-5 w-5 text-primary mb-1" />
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
