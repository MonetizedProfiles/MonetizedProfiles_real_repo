import { Shield, CreditCard, Lock, RefreshCcw } from 'lucide-react';

export function TrustSignals() {
  return (
    <div className="mt-6 pt-6 border-t border-border">
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Shield, label: 'Secure Checkout' },
          { icon: CreditCard, label: 'All Cards Accepted' },
          { icon: Lock, label: 'SSL Encrypted' },
          { icon: RefreshCcw, label: 'Money-Back Guarantee' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon className="h-4 w-4 text-green-600 flex-shrink-0" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
