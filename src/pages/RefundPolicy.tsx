import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCcw } from "lucide-react";
import { SEO } from "@/components/SEO";

const RefundPolicy = () => {
  return (
    <>
      <SEO 
        title="Refund & Warranty Policy - 30-Day Guarantee"
        description="Our comprehensive refund, replacement, and warranty policy. 30-day money-back guarantee, free replacements, and hassle-free returns."
        keywords="refund policy, warranty, money-back guarantee, replacement policy"
        canonical="https://monetizedprofiles.com/refund-policy"
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <RefreshCcw className="h-6 w-6" />
              Refund, Replacement & Warranty Policy
            </CardTitle>
            <CardDescription>We've got you. No matter the issue with your product, we will handle your inquiry—fast.</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-base">
              Please contact <a href="mailto:support@monetizedprofiles.com">support@monetizedprofiles.com</a> or live chat. We reply within 1 hour during working hours and solve most cases the same day.
            </p>
            <p className="text-base font-semibold">
              Billing name on your card: ASCENTIR*<br />
              Don't recognize the charge? Contact us first—we'll fix it.
            </p>

            <h2>1) 7-Day Return Right (digital products)</h2>
            <p>If you're not satisfied within 7 days of delivery, you may return the account for a refund.</p>
            <p>To qualify, you must return access (see "Returning access" below).</p>
            <p>A $25 processing/admin fee applies per account to cover irreversible costs (security resets, platform checks, payment fees).</p>

            <h2>2) Any-Time Clean-Account Satisfaction</h2>
            <p>At any time after delivery, if your account is completely clean (no platform strikes/violations and no breach of TikTok/YouTube ToS), you may choose one of the following, one time per account:</p>
            <ul>
              <li>Free replacement, or</li>
              <li>Full refund to your original payment method.</li>
            </ul>
            <p>Not sure if your account is "clean"? Contact us. We'll check fast so you do not need a chargeback.</p>
            
            <h3>What counts as "clean"?</h3>
            <p>No active or historical strikes, warnings, content takedowns for policy reasons, spam/inauthentic-behavior flags, suspensions/bans, or demonetization tied to your content or activity.</p>
            <p>It's OK if you uploaded videos as long as no violation exists.</p>

            <h2>3) 30-Day Platform Protection</h2>
            <p>If your account is restricted, disabled, demonetized, or removed by TikTok/YouTube within 30 days of delivery for reasons outside your behavior, we will replace it free or refund you in full—your choice.</p>
            
            <h3>Examples that qualify:</h3>
            <ul>
              <li>Random or unexplained platform action.</li>
              <li>Eligibility/monetization issues not caused by your content or behavior.</li>
            </ul>

            <h3>Examples that do not qualify:</h3>
            <ul>
              <li>Actions caused by content that breaks platform rules.</li>
              <li>Spam/inauthentic behavior or other ToS breaches.</li>
            </ul>

            <h2>4) Shadowban / Zero-View Protection (common issue)</h2>
            <p>You're protected if your content consistently gets 0 views.</p>
            
            <h3>Eligibility (all must be true):</h3>
            <ul>
              <li>You posted at least 10 public videos on the account.</li>
              <li>Each video stayed public for at least 24 hours.</li>
              <li>Each video shows 0 views (or effectively zero / not surfacing) in the platform's analytics.</li>
              <li>This is reported within 30 days of delivery.</li>
            </ul>

            <h3>What you get:</h3>
            <p>You qualify for our replacement or refund (your choice) under this policy.</p>

            <h3>How we verify (simple):</h3>
            <ul>
              <li>Send us screenshots of the account's video list or analytics showing 10 public uploads and 0 views.</li>
              <li>Confirm the upload dates (a quick screen or exported list is enough).</li>
              <li>Confirm the videos are public (not private, not unlisted, not age-restricted).</li>
            </ul>

            <h3>Notes to avoid delays:</h3>
            <ul>
              <li>Reused/AI-spammy/duplicate content can trigger platform limits. If we see a policy-related cause, we'll guide you to fix it or offer a goodwill replacement.</li>
              <li>If your videos had any views, we'll still help diagnose. If it behaves like a reach cap and you're within 30 days, we'll usually replace to keep you moving.</li>
            </ul>

            <h2>5) How to get help (3 simple steps)</h2>
            <ol>
              <li><strong>Contact us</strong> → <a href="mailto:support@monetizedprofiles.com">support@monetizedprofiles.com</a> (or live chat). We reply within 1 hour during working hours.</li>
              <li><strong>We evaluate</strong> → We may ask for basic proof (account username/ID, quick screenshots, and whether the account is clean or shadowbanned). Most cases are verified same day.</li>
              <li><strong>We resolve</strong> → We replace or refund immediately after verification. Refunds go to your original payment method.</li>
            </ol>
            <p className="font-semibold">Promise: We will handle your inquiry—no matter the issue.</p>

            <h2>6) Returning access (digital products)</h2>
            <p>To complete a replacement/refund, please:</p>
            <ul>
              <li>Relinquish access: provide current login where applicable; remove recovery email/phone you added; disable 2FA you enabled (we'll send a secure handover checklist).</li>
              <li>Stop using the account after handover.</li>
              <li>Delete local tokens/backup codes if any.</li>
            </ul>
            <p>Once confirmed, we issue your replacement or refund right away.</p>

            <h2>7) Eligibility, security & buyer responsibilities</h2>
            <p>To keep accounts secure and warranty-eligible:</p>
            <ul>
              <li>Change email and password within 48 hours of delivery.</li>
              <li>Enable 2FA.</li>
              <li>Follow TikTok/YouTube ToS at all times.</li>
            </ul>
            <p>If a specific product listing requires special setup (e.g., eSIM, region/device), please follow those instructions. Otherwise, eSIM is not required.</p>

            <h2>8) Delivery timeframe</h2>
            <ul>
              <li>Normal delivery: within 24 hours.</li>
              <li>During rare high-demand periods: up to 3 days.</li>
            </ul>
            <p>If we fail to deliver within 3 days, you may request a full refund or keep waiting with priority.</p>

            <h2>9) Duplicates, mistakes, and unrecognized payments</h2>
            <ul>
              <li>Duplicate/accidental orders → we refund immediately.</li>
              <li>Don't recognize the charge? Email or chat us; we'll confirm the descriptor and refund if needed.</li>
              <li>Suspected unauthorized use → we'll secure the account and refund once verified.</li>
            </ul>

            <h2>10) How refunds are paid</h2>
            <ul>
              <li>Refunds are sent to your original payment method and currency.</li>
              <li>Bank processing times: usually 3–10 business days.</li>
              <li>We do not refund third-party fees, exchange differences, or irreversible network costs beyond the $25 admin fee for the 7-Day Return Right.</li>
            </ul>

            <h2>11) Chargebacks (why to contact us first)</h2>
            <p>Chargebacks pause access and take longer. We resolve almost everything directly and faster.</p>
            <p>If a chargeback is filed, we must provide evidence to your bank; this can delay your outcome.</p>
            <p>Contacting us first almost always means instant replacement or refund without bank delays.</p>

            <h2>12) Policy updates & your rights</h2>
            <ul>
              <li>We may update this policy when platforms or payments change.</li>
              <li>The version in force at your order date applies, unless a newer version is more favorable to you.</li>
              <li>Nothing here limits your mandatory consumer rights under applicable law.</li>
            </ul>

            <h2>Final reminder — contact us first</h2>
            <p>For any issue—zero views, access, delivery timing, or billing—use our official support channels.</p>
            <p>This is the fastest, most reliable way to resolve your request under this policy.</p>
            <ul className="list-none">
              <li><strong>Email:</strong> <a href="mailto:support@monetizedprofiles.com">support@monetizedprofiles.com</a></li>
              <li><strong>Live chat:</strong> available on-site</li>
              <li><strong>Response time:</strong> within 1 hour (working hours)</li>
              <li><strong>Billing name on your statement:</strong> ASCENTIR*</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default RefundPolicy;
