import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Mail, Clock, MessageSquare, HeadphonesIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { SEO } from "@/components/SEO";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  orderNumber: z.string().trim().max(50, "Order number must be less than 50 characters").optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message must be less than 2000 characters")
});

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = contactSchema.parse(formData);
      setIsSubmitting(true);

      // Create ticket in Gorgias
      const { data, error } = await supabase.functions.invoke('gorgias-ticket', {
        body: {
          name: validated.name,
          email: validated.email,
          orderNumber: validated.orderNumber || undefined,
          message: validated.message
        }
      });

      if (error) {
        console.error("Error creating Gorgias ticket:", error);
        toast.error("Failed to send message", {
          description: "Please try again or contact us directly at support@monetizedprofiles.com"
        });
        return;
      }

      console.log("Gorgias ticket created:", data.ticketId);
      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 1 hour during weekdays.",
      });

      setFormData({ name: "", email: "", orderNumber: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        console.error("Error submitting form:", error);
        toast.error("Failed to send message", {
          description: "Please try again or use our live chat for immediate assistance."
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us - Customer Support"
        description="Get help with your monetized account purchase. 24/7 live chat support, 1-hour response time. Contact us for order inquiries, account issues, and questions."
        keywords="customer support, contact monetizedprofiles, account help, order support"
        canonical="https://monetizedprofiles.com/contact"
      />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-5xl space-y-12 sm:space-y-20">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground mb-6">
            We're here to help with any questions or concerns
          </p>

          {/* 24/7 Chat Notice */}
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full border border-primary/30 mb-3">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className="font-semibold">Need instant help? Use our 24/7 live chat in the bottom-right corner!</span>
          </div>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Mail className="w-6 h-6" />
                  Send us a Message
                </CardTitle>
                <CardDescription>We typically respond within 1 hour during weekdays</CardDescription>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Clock className="w-3 h-3" />
                1 Hour Response Time
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name *</label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    maxLength={100}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={255}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Order Number (Optional)</label>
                <Input
                  type="text"
                  placeholder="e.g., #12345"
                  value={formData.orderNumber}
                  onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  maxLength={50}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message *</label>
                <Textarea
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  maxLength={2000}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.message.length}/2000 characters
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Email Addresses */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HeadphonesIcon className="w-5 h-5" />
                General Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a href="mailto:support@monetizedprofiles.com" className="text-primary hover:underline font-medium">
                support@monetizedprofiles.com
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                For order inquiries, account issues, and general questions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="w-5 h-5 text-orange-500" />
                Affiliate Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a href="mailto:affiliates@monetizedprofiles.com" className="text-primary hover:underline font-medium">
                affiliates@monetizedprofiles.com
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                For affiliate program inquiries and partnership questions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">How quickly will I receive my account after purchase?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Delivery is usually between 12-24 hours via email. However, during periods of high demand, it can take up to 72 hours. You'll receive login credentials and step-by-step transfer instructions. You can track your order anytime through our order tracking page. If you haven't received it within 72 hours, please contact us at support@monetizedprofiles.com with your order number.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">Is this legal? Will I get in trouble?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes, it's completely legal. We provide access to legitimately grown accounts that comply with platform requirements. All accounts are in good standing with no violations. You're simply getting access to an account that has already met monetization requirements through organic growth.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">What happens if the account gets disabled or shadowbanned?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We offer a free replacement, no questions asked. All our accounts are healthy and in good standing with no violations, but if anything happens, you're fully covered by our replacement warranty. Just contact support@monetizedprofiles.com and we'll take care of you.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">Are the followers/subscribers real people or bots?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                100% organic, real engagement. We never use bots or fake accounts. All of our accounts are grown naturally with real people who actively engage with content. Bots would hurt your long-term success, which is why we only provide authentic, quality accounts with genuine audiences.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">Do you guarantee I'll make money?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                While we can't guarantee specific earnings, we provide you with the tools for success: a monetized account with real followers. Your success depends on content quality and consistency. However, our customers have seen incredible results – $2,000 from their first post and $5,000/month within 60 days. Plus, you'll get our free YouTube/TikTok growth course to help you maximize your earnings.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">When can I withdraw my first payment?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Withdrawal timelines vary by platform. TikTok requires a minimum of $50 in earnings before you can withdraw. YouTube's requirements vary based on your location and payment method. You'll need to connect your PayPal or bank account to receive payments. Detailed instructions are included with your account transfer.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">What payment methods do you accept?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We accept all major credit cards, debit cards, and secure payment methods (not crypto). This builds trust compared to competitors who only accept cryptocurrency. All transactions are processed through our encrypted, safe payment system.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">How are you different from other account sellers?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We stand out with: 100% organic growth (no bots), safe payment methods (not crypto), comprehensive warranty protection, and dedicated human support. Unlike competitors, we respond within 1 hour during business hours, offer a 30-day replacement warranty, and provide a free growth course with every purchase.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">What's the difference between aged and monetized YouTube accounts?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Aged accounts are older accounts that meet age requirements but may not be monetized yet. Monetized accounts are already approved for the YouTube Partner Program and can earn ad revenue immediately. We recommend monetized accounts as they offer better value – you can start earning from your first video.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">How do I contact support?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We make it easy! Use our 24/7 live chat (bottom-right corner) for instant help, or email support@monetizedprofiles.com for a response within 1 hour during business hours. All support is handled by real humans, not automated bots.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">How often are accounts restocked?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our products are in very high demand. Restock times are unpredictable as accounts must be organically grown to monetization – this can take days or weeks. We recommend signing up for restock notifications (available on each product page) to be alerted immediately when your desired product becomes available.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">I didn't receive my order confirmation email</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                First, check your spam/junk folder. If you still can't find it, contact us immediately at support@monetizedprofiles.com with your email address and payment information. We'll resend your order details and ensure delivery.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">Can I change or cancel my order?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                If your order hasn't been processed yet (usually within the first few hours), you can request changes or cancellation by contacting support@monetizedprofiles.com immediately with your order number. Once the account is delivered, you can use our 7-day money-back guarantee instead.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>


        {/* Before You Dispute */}
        <div className="max-w-3xl mx-auto">
          <Card className="border border-orange-200 bg-orange-50/50 dark:bg-orange-950/10 dark:border-orange-900/30">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-orange-700 dark:text-orange-400">
                <AlertCircle className="w-5 h-5" />
                Before You File a Dispute or Chargeback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Please contact us first! We're committed to resolving any issues quickly and fairly. Filing a dispute or chargeback can delay resolution and may prevent us from helping you.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong>We respond within 1 hour during weekdays</strong> - Most issues are resolved immediately
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong>7-day money-back guarantee</strong> - Get a full refund if you're not satisfied
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong>30-day replacement warranty</strong> - We'll replace any problematic accounts
                  </p>
                </div>
              </div>
              <div className="bg-background/60 rounded-lg p-3 mt-4">
                <p className="text-sm font-medium mb-2">Contact us:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Email: <a href="mailto:support@monetizedprofiles.com" className="text-primary hover:underline">support@monetizedprofiles.com</a></li>
                  <li>• Live Chat: Bottom-right corner (24/7)</li>
                  <li>• Include your order number for fastest resolution</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
