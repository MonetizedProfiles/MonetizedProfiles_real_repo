import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Mail, ArrowRight, TrendingUp, Users, DollarSign, Video } from "lucide-react";
import { Link } from "react-router-dom";

const Affiliate = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            Monetized<span style={{ color: '#FF2929' }}>Profiles</span>
          </Link>
          <Button asChild variant="outline">
            <Link to="/">Back to Store</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Promote Our Accounts.<br />
              <span style={{ color: '#FF2929' }}>Get Paid Generously.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Join 500+ creators earning 20% commission on every sale
            </p>
            <Button size="lg" className="text-xl px-12 py-8 shadow-lg hover:shadow-xl transition-all" style={{ backgroundColor: '#FF2929' }}>
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Why Partner With Us?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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

              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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

              <Card className="border-2">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
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
      <section className="py-20 bg-secondary/20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Getting Started is <span style={{ color: '#FF2929' }}>Easy</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold border-4 border-primary" style={{ backgroundColor: '#FF2929', color: 'white' }}>
                    1
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Sign Up</h3>
                  <p className="text-muted-foreground text-lg">
                    Fill out our simple application form. Get approved within 24 hours and receive your unique affiliate link.
                  </p>
                </div>
                <div className="hidden md:block absolute top-10 -right-6 text-4xl text-primary">
                  <ArrowRight />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold border-4 border-primary" style={{ backgroundColor: '#FF2929', color: 'white' }}>
                    2
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Promote Your Link</h3>
                  <p className="text-muted-foreground text-lg">
                    Share your affiliate link on YouTube, TikTok, Instagram, or any platform. We provide marketing materials to help you succeed.
                  </p>
                </div>
                <div className="hidden md:block absolute top-10 -right-6 text-4xl text-primary">
                  <ArrowRight />
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-bold border-4 border-primary" style={{ backgroundColor: '#FF2929', color: 'white' }}>
                    3
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Get Paid</h3>
                  <p className="text-muted-foreground text-lg">
                    Earn 20% commission on every sale. Track your earnings in real-time and get paid regularly via your preferred method.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-16">
              <Button size="lg" className="text-xl px-12 py-8 shadow-lg hover:shadow-xl transition-all" style={{ backgroundColor: '#FF2929' }}>
                Start Earning Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Examples Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
              See Our Affiliates <span style={{ color: '#FF2929' }}>in Action</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16">
              Real creators getting real results promoting our products
            </p>
            
            {/* Video Grid - Placeholder for UGC/YouTube/Organic Content */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Placeholder Cards - Replace these with actual video embeds or images */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <Card key={item} className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                  <div className="aspect-[9/16] bg-secondary/20 flex items-center justify-center relative">
                    <Video className="w-12 h-12 text-muted-foreground" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-sm font-medium">Affiliate Example {item}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground text-lg">
                Upload your UGC clips, link YouTube videos, or add organic short-form content here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-secondary/20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Mail className="w-16 h-16 mx-auto mb-6" style={{ color: '#FF2929' }} />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Questions About Our Program?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our affiliate team is here to help you succeed
            </p>
            <a 
              href="mailto:affiliates@monetizedprofiles.com" 
              className="text-2xl font-bold hover:underline inline-flex items-center gap-2"
              style={{ color: '#FF2929' }}
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
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Start <span style={{ color: '#FF2929' }}>Earning?</span>
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

                <Button size="lg" className="text-xl px-12 py-8 shadow-lg hover:shadow-xl transition-all" style={{ backgroundColor: '#FF2929' }}>
                  Apply for Affiliate Program
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 MonetizedProfiles. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Affiliate;
