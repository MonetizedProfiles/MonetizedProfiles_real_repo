import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { breadcrumbJsonLd } from '@/lib/seo';
import { Mail, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with the ${SITE_NAME} team. We're here to help with any questions about our monetized accounts.`,
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: 'Contact', url: `${SITE_URL}/contact` },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
      <p className="text-muted-foreground text-center mb-10">
        Have a question? We&apos;re here to help. Reach out through any of the channels below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: Mail, title: 'Email', desc: 'support@monetizedprofiles.com', sub: 'We reply within 24 hours' },
          { icon: MessageSquare, title: 'Live Chat', desc: 'Click the chat icon', sub: 'Available during business hours' },
          { icon: Clock, title: 'Hours', desc: 'Mon–Fri, 9am–6pm EST', sub: 'Weekends by email only' },
        ].map(({ icon: Icon, title, desc, sub }) => (
          <div key={title} className="text-center border border-border rounded-xl p-6">
            <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm font-medium">{desc}</p>
            <p className="text-xs text-muted-foreground mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-secondary rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold mb-3">Need Immediate Help?</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Check our FAQ section for instant answers to common questions, or use the live chat widget in the bottom right corner.
        </p>
        <a href="/#faq" className="text-primary font-medium hover:underline">View FAQ →</a>
      </div>
    </div>
  );
}
