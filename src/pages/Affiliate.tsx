import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, Mail, ArrowRight, TrendingUp, Users, DollarSign, Video, Package, Zap, BarChart, Quote, UserPlus, Share2, Wallet, Play } from "lucide-react";
import { useState } from "react";

const Affiliate = () => {
  const [conversions, setConversions] = useState([10]);
  const conversionValue = 80;
  const monthlyEarnings = conversions[0] * conversionValue;

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Promote Our Accounts.<br />
              <span className="text-primary">Get Paid Generously.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Join 500+ creators earning 20% commission on every sale
            </p>
            <Button size="lg" className="text-xl px-12 py-6">
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Why Partner With Us?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-lg transition-all hover:border-primary/50">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">High Commissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg">
                    Earn $100-$400 per sale with our generous 20% commission structure. The more you sell, the more you earn.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all hover:border-primary/50">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Proven Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg">
                    Premium monetized accounts that deliver real results. High customer satisfaction means high conversion rates for you.
                  </p>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all hover:border-primary/50">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Full Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-lg">
                    We handle everything - delivery, support, and customer service. You focus on promoting, we take care of the rest.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-secondary/20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Getting Started is <span className="text-primary">Easy</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-primary/30 transition-all">
                        <UserPlus className="w-12 h-12 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-md">
                        <span className="text-xl font-bold text-primary">1</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Sign Up</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Fill out our simple application form. Get approved within 24 hours and receive your unique affiliate link.
                    </p>
                  </CardContent>
                </Card>
                <div className="hidden md:block absolute top-1/2 -right-4 z-10 -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-primary/30 transition-all">
                        <Share2 className="w-12 h-12 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-md">
                        <span className="text-xl font-bold text-primary">2</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Promote Your Link</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Share your affiliate link on YouTube, TikTok, Instagram, or any platform. We provide marketing materials to help you succeed.
                    </p>
                  </CardContent>
                </Card>
                <div className="hidden md:block absolute top-1/2 -right-4 z-10 -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto shadow-lg group-hover:shadow-primary/30 transition-all">
                        <Wallet className="w-12 h-12 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-md">
                        <span className="text-xl font-bold text-primary">3</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Get Paid</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Earn 20% commission on every sale. Track your earnings in real-time and get paid regularly via your preferred method.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button size="lg" className="text-xl px-12 py-6">
                Start Earning Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Predictor Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Your Earnings <span className="text-primary">Potential</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16">
              Calculate how much you can earn with our affiliate program
            </p>
            
            <Card className="border-2 shadow-lg">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-8">
                  {/* Slider */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <label className="text-lg font-semibold">Monthly Conversions</label>
                      <span className="text-2xl font-bold text-primary">{conversions[0]}</span>
                    </div>
                    <Slider
                      value={conversions}
                      onValueChange={setConversions}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>1 sale</span>
                      <span>100 sales</span>
                    </div>
                  </div>

                  {/* Results Display */}
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8 border-2 border-primary/20">
                    <div className="text-center space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Commission per sale</p>
                        <p className="text-2xl font-bold">${conversionValue}</p>
                      </div>
                      
                      <div className="w-16 h-0.5 bg-border mx-auto"></div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Estimated Monthly Earnings</p>
                        <p className="text-5xl md:text-6xl font-bold text-primary">
                          ${monthlyEarnings.toLocaleString()}
                        </p>
                      </div>

                      <div className="w-16 h-0.5 bg-border mx-auto"></div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Annual Potential</p>
                        <p className="text-3xl font-bold">
                          ${(monthlyEarnings * 12).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center pt-4">
                    <Button size="lg" className="text-lg px-10 py-6">
                      Start Earning Today
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                * Earnings are estimated based on average product value. Actual earnings may vary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Resources Section */}
      <section className="py-20 bg-secondary/20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Marketing <span className="text-primary">Resources</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16">
              Everything you need to succeed as an affiliate
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="group hover:shadow-lg transition-all hover:border-primary/50">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Package className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Ready-to-Use Creatives</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>High-quality product images and banners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Pre-written promotional copy templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Social media post templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Email marketing templates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all hover:border-primary/50">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Zap className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Tracking & Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Real-time sales tracking dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Conversion rate analytics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Commission history and reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Performance insights and tips</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all hover:border-primary/50">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Dedicated Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Personal affiliate manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Priority email support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Monthly strategy calls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Exclusive affiliate community</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all hover:border-primary/50">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Video className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Training Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Video tutorials and best practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Conversion optimization guides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Platform-specific strategies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Case studies from top affiliates</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
              What Our Affiliates <span className="text-primary">Are Saying</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16">
              Success stories from our affiliate partners
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  <p className="text-muted-foreground mb-6 italic">
                    "I've been promoting MonetizedProfiles for 6 months and consistently make $3-5k/month. The products sell themselves and the support team is incredible."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Sarah M.</p>
                      <p className="text-sm text-muted-foreground">YouTube Creator</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  <p className="text-muted-foreground mb-6 italic">
                    "The commission structure is unbeatable. I made my first $1,000 in the first week! The dashboard makes tracking everything so easy."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Mike R.</p>
                      <p className="text-sm text-muted-foreground">Instagram Influencer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all">
                <CardContent className="pt-6">
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  <p className="text-muted-foreground mb-6 italic">
                    "Best affiliate program I've joined. High-quality products, great conversion rates, and payments always on time. Highly recommend!"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Jessica L.</p>
                      <p className="text-sm text-muted-foreground">TikTok Creator</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16">
              Everything you need to know about our affiliate program
            </p>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-background border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How do I get paid?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer multiple payment methods including PayPal, bank transfer, and Wise. Payments are processed on the 1st and 15th of each month for all commissions earned in the previous period. There's a minimum payout threshold of $50.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-background border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  What is the commission rate?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  All affiliates earn a flat 20% commission on every sale. There are no tiers or complex structures - just straightforward 20% on all products, whether they're $500 or $2,000+.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-background border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How long is the cookie duration?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We use a 30-day cookie window. This means if someone clicks your affiliate link, you'll earn commission on any purchase they make within 30 days, even if they don't buy immediately.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-background border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Who can become an affiliate?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Anyone with an audience interested in social media growth and monetization! Whether you're a YouTuber, TikToker, Instagram influencer, blogger, or run a Discord/Telegram community - if you can promote to people interested in growing their social media, you're a great fit.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-background border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  How long does approval take?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Most applications are reviewed and approved within 24 hours. Once approved, you'll receive your unique affiliate link and access to all marketing materials immediately.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-background border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  Can I promote on multiple platforms?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely! You can use your affiliate link across all your platforms - YouTube, TikTok, Instagram, Twitter, blog, email list, Discord, or anywhere else you have an audience. We encourage multi-platform promotion for maximum earnings.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>


      {/* Affiliate Examples Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
              See Our Affiliates <span className="text-primary">in Action</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Real creators getting real results promoting our products
            </p>
            
            {/* Compact Mixed Video Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* Long-form Video 1 (16:9) - Spans 2 columns */}
              <Card className="col-span-2 overflow-hidden group cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
                <div className="aspect-video bg-secondary/20 flex items-center justify-center relative">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Affiliate Success Story"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-xs line-clamp-1">$5K in 30 Days</p>
                  <p className="text-xs text-muted-foreground">Sarah M.</p>
                </CardContent>
              </Card>

              {/* Short-form Video 1 (9:16) */}
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
                <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Play className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-xs line-clamp-1">First Sale!</p>
                  <p className="text-xs text-muted-foreground">Mike R.</p>
                </CardContent>
              </Card>

              {/* Short-form Video 2 (9:16) */}
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
                <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Short-form Content"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-xs line-clamp-1">Easy Money</p>
                  <p className="text-xs text-muted-foreground">Jessica L.</p>
                </CardContent>
              </Card>

              {/* Short-form Video 3 (9:16) */}
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
                <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Play className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-xs line-clamp-1">Quick Win</p>
                  <p className="text-xs text-muted-foreground">Emma T.</p>
                </CardContent>
              </Card>

              {/* Long-form Video 2 (16:9) - Spans 2 columns */}
              <Card className="col-span-2 overflow-hidden group cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
                <div className="aspect-video bg-secondary/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Play className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-xs line-clamp-1">Complete Guide to Monetization</p>
                  <p className="text-xs text-muted-foreground">David K.</p>
                </CardContent>
              </Card>

              {/* Short-form Video 4 (9:16) */}
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
                <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Affiliate Tips"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-xs line-clamp-1">3 Secrets</p>
                  <p className="text-xs text-muted-foreground">Alex P.</p>
                </CardContent>
              </Card>

              {/* Short-form Video 5 (9:16) */}
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
                <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Play className="w-10 h-10 text-primary" />
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-xs line-clamp-1">Passive Income</p>
                  <p className="text-xs text-muted-foreground">Chris B.</p>
                </CardContent>
              </Card>

              {/* Long-form Video 3 (16:9) - Spans 2 columns */}
              <Card className="col-span-2 overflow-hidden group cursor-pointer hover:shadow-lg transition-all hover:border-primary/50">
                <div className="aspect-video bg-secondary/20 flex items-center justify-center relative">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Journey Story"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <CardContent className="p-3">
                  <p className="font-semibold text-xs line-clamp-1">My Passive Income Journey</p>
                  <p className="text-xs text-muted-foreground">Chris B.</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Want to be featured? Share your success story with us!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-secondary/20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Questions About Our Program?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our affiliate team is here to help you succeed
            </p>
            <a 
              href="mailto:affiliates@monetizedprofiles.com" 
              className="text-2xl font-bold hover:underline inline-flex items-center gap-2 text-primary transition-colors hover:opacity-80"
            >
              <Mail className="w-6 h-6" />
              affiliates@monetizedprofiles.com
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Start <span className="text-primary">Earning?</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join hundreds of successful affiliates who are already earning generous commissions promoting our premium monetized accounts.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-lg">No upfront costs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-lg">Fast approval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-lg">20% commission</span>
                  </div>
                </div>

                <Button size="lg" className="text-xl px-12 py-6">
                  Apply for Affiliate Program
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Affiliate;
