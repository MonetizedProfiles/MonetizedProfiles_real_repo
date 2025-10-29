import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCcw } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-3xl">
              <RefreshCcw className="h-6 w-6" />
              Refund & Replacement Policy
            </CardTitle>
            <CardDescription>Last updated: January 2025</CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert">
            <h2>30-Day Money Back Guarantee</h2>
            <p>We stand behind the quality of our monetized accounts with a comprehensive 30-day money back or replacement warranty.</p>
            
            <h3>Eligibility Requirements</h3>
            <p>To qualify for a refund or replacement, the following conditions must be met:</p>
            <ul>
              <li>Request must be made within 30 days of purchase</li>
              <li>The account must be returned to us in its original condition</li>
              <li>You must not have violated any platform terms of service</li>
              <li>The account credentials must not have been changed or modified</li>
            </ul>

            <h3>Return Process</h3>
            <p>To initiate a return for refund or replacement:</p>
            <ol>
              <li>Contact our support team with your order number and reason for return</li>
              <li>Return the account credentials to us (do not delete or modify the account)</li>
              <li>Once we verify the account is in good standing, we will process your refund or send a replacement</li>
              <li>Refunds are processed within 5-7 business days after verification</li>
            </ol>

            <h3>Replacement Option</h3>
            <p>If you prefer a replacement account instead of a refund, we will provide you with a comparable account of equal or greater value at no additional cost.</p>

            <h3>Non-Refundable Situations</h3>
            <p>Refunds or replacements will not be granted if:</p>
            <ul>
              <li>The account was suspended or banned due to your actions</li>
              <li>You violated the platform's terms of service</li>
              <li>The account was not returned as required</li>
              <li>More than 30 days have passed since purchase</li>
              <li>Account credentials were changed or the account was modified</li>
            </ul>

            <h3>Delivery Time</h3>
            <p>All accounts are delivered within 24-72 hours of purchase confirmation. If you do not receive your account within this timeframe, please contact support immediately.</p>

            <h3>Contact Us</h3>
            <p>For any questions about our refund policy or to initiate a return, please contact our customer support team.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundPolicy;
