'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({ faqs, title = 'Frequently Asked Questions' }: { faqs: FaqItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            return (
              <div key={i} className="border border-border rounded-lg">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between p-4 text-left font-medium hover:bg-secondary/50 transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {faq.question}
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {isOpen && (
                  <div id={panelId} role="region" aria-labelledby={`faq-q-${i}`} className="px-4 pb-4 text-sm text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
