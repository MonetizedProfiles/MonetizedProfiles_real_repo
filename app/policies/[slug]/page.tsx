import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { breadcrumbJsonLd } from '@/lib/seo';

const policies: Record<string, { title: string; content: string }> = {
  'privacy-policy': {
    title: 'Privacy Policy',
    content: `<h2>Information We Collect</h2>
<p>When you visit our site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the site, and information about how you interact with the site.</p>

<h2>How We Use Your Information</h2>
<p>We use the information we collect to fulfill any orders placed through the site, communicate with you, screen our orders for potential risk or fraud, and provide you with information or advertising relating to our products or services.</p>

<h2>Sharing Your Information</h2>
<p>We share your personal information with third parties to help us use your personal information, as described above. We use Shopify to power our online store. We also use Google Analytics to help us understand how our customers use the site.</p>

<h2>Your Rights</h2>
<p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us.</p>

<h2>Contact</h2>
<p>For more information about our privacy practices or if you have questions, please contact us at support@monetizedprofiles.com.</p>`,
  },
  'terms-of-service': {
    title: 'Terms of Service',
    content: `<h2>Overview</h2>
<p>This website is operated by ${SITE_NAME}. Throughout the site, the terms "we", "us" and "our" refer to ${SITE_NAME}. By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions.</p>

<h2>Products & Services</h2>
<p>All products are delivered digitally. Account credentials are provided after successful payment. We reserve the right to limit the quantities of any products or services that we offer.</p>

<h2>Accuracy of Information</h2>
<p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only.</p>

<h2>Account Responsibility</h2>
<p>After account transfer, you are responsible for maintaining the security of the account. We recommend immediately changing passwords and enabling two-factor authentication.</p>

<h2>Prohibited Uses</h2>
<p>You may not use our products for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction, including copyright laws or the terms of service of any social media platform.</p>`,
  },
  'refund-policy': {
    title: 'Refund Policy',
    content: `<h2>Refund Policy</h2>
<p>We stand behind the quality of every account we sell. If you experience an issue with your purchased account, we're here to help.</p>

<h2>Eligibility</h2>
<p>Refund requests must be submitted within 7 days of purchase. The account must not have been significantly modified (rebranding, content upload, etc.) for a full refund to be issued.</p>

<h2>Process</h2>
<p>To request a refund, contact our support team at support@monetizedprofiles.com with your order number and a description of the issue. We'll review your case within 24 hours.</p>

<h2>Resolution</h2>
<p>We'll first attempt to resolve any issues with a replacement account. If we cannot resolve the issue, a full refund will be issued to your original payment method within 5-10 business days.</p>

<h2>Exceptions</h2>
<p>Accounts that have been banned or suspended due to buyer actions (spam, violations of platform terms) after transfer are not eligible for refund.</p>`,
  },
};

export function generateStaticParams() {
  return Object.keys(policies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) return {};

  return {
    title: policy.title,
    description: `${policy.title} for ${SITE_NAME}`,
    alternates: { canonical: `${SITE_URL}/policies/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug];
  if (!policy) notFound();

  const breadcrumbs = [
    { name: 'Home', url: SITE_URL },
    { name: policy.title, url: `${SITE_URL}/policies/${slug}` },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <h1 className="text-4xl font-bold mb-8">{policy.title}</h1>
      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: policy.content }} />
    </div>
  );
}
