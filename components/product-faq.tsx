import { FaqSection } from './faq-section';
import { getProductFaqs } from '@/data/faqs';
import { faqJsonLd } from '@/lib/seo';

export function ProductFaq({ handle }: { handle: string }) {
  const faqs = getProductFaqs(handle);
  if (faqs.length === 0) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <FaqSection faqs={faqs} title="Product FAQ" />
    </>
  );
}
