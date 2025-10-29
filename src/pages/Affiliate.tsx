import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, Mail, ArrowRight, TrendingUp, Users, DollarSign, Video, Package, Zap, BarChart, Quote, UserPlus, Share2, Wallet, Play } from "lucide-react";
import { useState } from "react";
import { useEffect, useRef } from "react";

const Affiliate = () => {
  const [conversions, setConversions] = useState([10]);
  const conversionValue = 80;
  const monthlyEarnings = conversions[0] * conversionValue;
  const videoScrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll videos with seamless loop
  useEffect(() => {
    const scrollContainer = videoScrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const scrollSpeed = 0.5; // pixels per frame

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Get the width of one set of videos (half of total since we duplicate)
        const singleSetWidth = scrollContainer.scrollWidth / 2;
        
        // Reset to beginning when we've scrolled past the first set
        if (scrollContainer.scrollLeft >= singleSetWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-12 sm:py-20 relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-tight">
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
      <section className="py-12 sm:py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-lg text-muted-foreground">We've perfected the affiliate experience with generous commissions and full support</p>
          </div>
            
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-20 bg-secondary/20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Getting Started Is Easy
            </h2>
            <p className="text-lg text-muted-foreground">Three simple steps to start earning generous commissions</p>
          </div>
            
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                      <UserPlus className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">1</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Sign Up</h3>
                  <p className="text-muted-foreground text-sm">
                    Fill out our simple application form and get approved within 24 hours.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                      <Share2 className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">2</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Promote</h3>
                  <p className="text-muted-foreground text-sm">
                    Share your affiliate link across your platforms with our marketing materials.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-8 text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                      <Wallet className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-primary-foreground">3</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Get Paid</h3>
                  <p className="text-muted-foreground text-sm">
                    Earn 20% commission on every sale and get paid regularly.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" className="text-lg px-10 py-6">
                Start Earning Today
              </Button>
          </div>
        </div>
      </section>

      {/* Revenue Predictor Section */}
      <section className="py-12 sm:py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Your Earnings Potential
            </h2>
            <p className="text-lg text-muted-foreground">
              Calculate how much you can earn with our affiliate program
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-6">
                  {/* Slider */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-base font-semibold">Monthly Conversions</label>
                      <span className="text-xl font-bold text-primary">{conversions[0]}</span>
                    </div>
                    <Slider
                      value={conversions}
                      onValueChange={setConversions}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 sale</span>
                      <span>100 sales</span>
                    </div>
                  </div>

                  {/* Results Display */}
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Per Sale</p>
                        <p className="text-xl font-bold">${conversionValue}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Monthly</p>
                        <p className="text-3xl font-bold text-primary">
                          ${monthlyEarnings.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Annually</p>
                        <p className="text-xl font-bold">
                          ${(monthlyEarnings * 12).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <Button size="lg" className="text-base px-8 py-5">
                      Start Earning Today
                    </Button>
                  </div>

                  {/* Disclaimer inside card */}
                  <p className="text-xs text-center text-muted-foreground pt-2">
                    * Earnings are estimated based on average product value. Actual earnings may vary.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Our Affiliates Are Saying
            </h2>
            <p className="text-lg text-muted-foreground">
              Success stories from our affiliate partners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-secondary/20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our affiliate program
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4 max-w-3xl mx-auto">
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
      </section>


      {/* Affiliate Examples Section */}
      <section className="py-12 sm:py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              See Our Affiliates In Action
            </h2>
            <p className="text-lg text-muted-foreground">
              Real creators getting real results promoting our products
            </p>
          </div>
        </div>
            
        {/* Edge-to-edge scrolling container */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <div className="relative">
              <div 
                ref={videoScrollRef}
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide items-center"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* First set of videos */}
                <div className="flex-none w-[200px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Short-form Content"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[356px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-video bg-secondary/20 flex items-center justify-center relative">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Affiliate Success Story"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[200px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <Play className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[200px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <Play className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[356px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-video bg-secondary/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <Play className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[200px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Affiliate Tips"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[356px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-video bg-secondary/20 flex items-center justify-center relative">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Journey Story"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                {/* Duplicate set for seamless loop */}
                <div className="flex-none w-[200px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Short-form Content"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[356px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-video bg-secondary/20 flex items-center justify-center relative">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Affiliate Success Story"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[200px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <Play className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[200px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <Play className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[356px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-video bg-secondary/20 flex items-center justify-center relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <Play className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[200px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Affiliate Tips"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-none w-[356px]">
                  <div className="overflow-hidden rounded-lg hover:shadow-lg transition-all">
                    <div className="aspect-video bg-secondary/20 flex items-center justify-center relative">
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Journey Story"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="text-center mt-8">
              <p className="text-muted-foreground">
                Want to be featured? Share your success story with us!
              </p>
            </div>
          </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-20 bg-secondary/20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Questions About Our Program?
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Our affiliate team is here to help you succeed
            </p>
            <a 
              href="mailto:affiliates@monetizedprofiles.com" 
              className="text-lg sm:text-xl font-semibold hover:underline inline-flex items-center gap-2 text-primary transition-colors hover:opacity-80"
            >
              <Mail className="w-5 h-5" />
              affiliates@monetizedprofiles.com
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready To Start Earning?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join hundreds of successful affiliates who are already earning generous commissions promoting our premium monetized accounts.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>No upfront costs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>Fast approval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span>20% commission</span>
                  </div>
                </div>

                <Button 
size="lg" 
                  className="text-lg px-10 py-6"
                  onClick={() => window.open('https://monetizedprofiles.everflowclient.io/affiliate/signup', '_blank')}
                >
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
