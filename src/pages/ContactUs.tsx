import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Mail, Clock, MessageSquare, Shield, CheckCircle2, AlertCircle, Package, HeadphonesIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";

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

      // Here you would send the contact form data to your backend
      console.log("Contact form submitted:", validated);

      toast.success("Message sent successfully!", {
        description: "We'll get back to you within 1 hour during weekdays.",
      });

      setFormData({ name: "", email: "", orderNumber: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground mb-6">
            We're here to help with any questions or concerns
          </p>

          {/* 24/7 Chat Notice */}
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full border border-primary/30 mb-8">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span className="font-semibold">Need instant help? Use our 24/7 live chat in the bottom-right corner!</span>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="mb-12">
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
        <div className="grid md:grid-cols-2 gap-6 mb-12">
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
                <AlertCircle className="w-5 h-5 text-orange-500" />
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

        {/* Order Tracking */}
        <Card className="mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-6 h-6" />
              Track Your Order
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Most orders are delivered within 6-12 hours. You'll receive an email with your account credentials and instructions once ready.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Check your email</p>
                  <p className="text-sm text-muted-foreground">Look for order confirmation and delivery emails</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Check spam folder</p>
                  <p className="text-sm text-muted-foreground">Sometimes emails may land in spam</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Contact us with order number</p>
                  <p className="text-sm text-muted-foreground">We can look up your order status immediately</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guarantee Info */}
        <Card className="mb-12 border-2 border-primary/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Our Guarantees
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">7-Day Money Back Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  Not satisfied? Get a full refund within 7 days, no questions asked.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">30-Day Replacement Warranty</h3>
                <p className="text-sm text-muted-foreground">
                  Any issues with your account? We'll replace it free of charge within 30 days.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">24/7 Support Access</h3>
                <p className="text-sm text-muted-foreground">
                  Get instant help anytime through our live chat or email support system.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">100% Organic Accounts</h3>
                <p className="text-sm text-muted-foreground">
                  All accounts come with real, engaged followers. Zero bots guaranteed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">When will I receive my account?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Most accounts are delivered within 6-12 hours of purchase. You'll receive an email with login credentials and step-by-step transfer instructions. If you haven't received it within 24 hours, please contact us immediately at support@monetizedprofiles.com with your order number.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">What if I have issues with my account?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We offer a 30-day replacement guarantee. If you experience any issues with your account, contact our support team immediately at support@monetizedprofiles.com. We'll work with you to resolve the issue or provide a replacement account at no additional cost.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">How do refunds work?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We offer a 7-day money-back guarantee. If you're not satisfied with your purchase for any reason, contact us within 7 days at support@monetizedprofiles.com with your order number. Refunds are processed within 3-5 business days back to your original payment method.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">I didn't receive my order confirmation email</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                First, check your spam/junk folder. If you still can't find it, contact us immediately at support@monetizedprofiles.com with your email address and payment information. We'll resend your order details and ensure delivery.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">Can I change or cancel my order?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                If your order hasn't been processed yet (usually within the first few hours), you can request a change or cancellation by contacting support@monetizedprofiles.com immediately. Include your order number and desired changes. Once the account is delivered, you can use our 7-day money-back guarantee instead.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="bg-card border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">How do I contact you for urgent issues?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                For urgent issues, use our 24/7 live chat available in the bottom-right corner of the website. You'll get an immediate response from our support team. For less urgent matters, email us at support@monetizedprofiles.com and we'll respond within 1 hour during weekdays.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Before You Dispute */}
        <Card className="border-2 border-orange-500/30 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
              <AlertCircle className="w-6 h-6" />
              Before You File a Dispute or Chargeback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              <strong>Please contact us first!</strong> We're committed to resolving any issues quickly and fairly. Filing a dispute or chargeback can delay resolution and may prevent us from helping you.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  <strong>We respond within 1 hour during weekdays</strong> - Most issues are resolved immediately
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  <strong>7-day money-back guarantee</strong> - Get a full refund if you're not satisfied
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm">
                  <strong>30-day replacement warranty</strong> - We'll replace any problematic accounts
                </p>
              </div>
            </div>
            <div className="bg-card rounded-lg p-4 mt-4">
              <p className="text-sm font-semibold mb-2">Contact us immediately:</p>
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
  );
};

export default ContactUs;
