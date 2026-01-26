import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Gift, Youtube, Music, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/monetizedprofiles-logo.webp";

interface Niche {
  name: string;
  description: string;
}

interface NicheCategory {
  category: string;
  niches: Niche[];
}

const tiktokNiches: NicheCategory[] = [
  {
    category: "Entertainment",
    niches: [
      { name: "Retro TV Shows", description: "Nostalgic clips from classic television" },
      { name: "Anime Edits", description: "Creative anime compilations and edits" },
      { name: "Funny Videos", description: "Viral comedy content and humor clips" },
      { name: "Young Sheldon Clips", description: "Popular sitcom highlights" },
      { name: "Impractical Jokers Clips", description: "Prank show best moments" },
    ],
  },
  {
    category: "Services & How-To",
    niches: [
      { name: "Carpet Cleaning", description: "Satisfying cleaning transformations" },
      { name: "Plumbing", description: "DIY fixes and professional tips" },
      { name: "Pool Cleaning", description: "Oddly satisfying pool maintenance" },
      { name: "Driving Instruction", description: "Tips for new drivers and road safety" },
      { name: "Hair Styling", description: "Trending cuts, colors, and tutorials" },
    ],
  },
  {
    category: "Lifestyle & Fashion",
    niches: [
      { name: "Sneakers", description: "Shoe reviews, drops, and collections" },
      { name: "Fashion", description: "Outfit inspiration and style tips" },
      { name: "Lifestyle", description: "Day-in-the-life and aesthetic content" },
      { name: "Animated Knitting", description: "Creative craft content with animations" },
    ],
  },
  {
    category: "Unique & Creative",
    niches: [
      { name: "Hypnosis", description: "Hypnotherapy content and relaxation" },
      { name: "AI Animal Rescues", description: "AI-generated heartwarming rescue stories" },
      { name: "Miniature Items", description: "Tiny creations and mini worlds" },
      { name: "Quiz", description: "Interactive trivia and brain teasers" },
    ],
  },
  {
    category: "Other Trending",
    niches: [
      { name: "Buy and Sell", description: "Flipping items and marketplace finds" },
      { name: "News", description: "Breaking news and current events coverage" },
      { name: "Darts", description: "Professional darts highlights and tips" },
    ],
  },
];

const youtubeNiches: NicheCategory[] = [
  {
    category: "Finance",
    niches: [
      { name: "Crypto Analysis", description: "Market updates and predictions" },
      { name: "Stock Trading", description: "Investment tips and market analysis" },
      { name: "Personal Finance", description: "Budgeting and saving strategies" },
    ],
  },
  {
    category: "Technology",
    niches: [
      { name: "Tech Reviews", description: "Gadget unboxings and reviews" },
      { name: "AI Tutorials", description: "How to use AI tools and automation" },
      { name: "Coding Tutorials", description: "Programming lessons and projects" },
    ],
  },
  {
    category: "Entertainment",
    niches: [
      { name: "Documentary Recaps", description: "True crime and documentary summaries" },
      { name: "Gaming Walkthroughs", description: "Game guides and let's plays" },
      { name: "Movie Analysis", description: "Deep dives into films and shows" },
    ],
  },
];

const NicheSection = ({
  title,
  icon: Icon,
  categories,
  iconColor,
}: {
  title: string;
  icon: typeof Youtube;
  categories: NicheCategory[];
  iconColor: string;
}) => (
  <Card className="border-border/50">
    <CardHeader className="pb-4">
      <CardTitle className="flex items-center gap-3 text-xl md:text-2xl">
        <Icon className={`h-6 w-6 ${iconColor}`} />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Accordion type="single" collapsible className="w-full">
        {categories.map((cat, index) => (
          <AccordionItem key={cat.category} value={`item-${index}`}>
            <AccordionTrigger className="text-base font-medium hover:no-underline">
              {cat.category}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3 pt-2">
                {cat.niches.map((niche) => (
                  <li key={niche.name} className="flex flex-col gap-0.5 pl-4 border-l-2 border-primary/20">
                    <span className="font-medium text-foreground">{niche.name}</span>
                    <span className="text-sm text-muted-foreground">{niche.description}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </CardContent>
  </Card>
);

const BonusNiches = () => {
  return (
    <>
      <SEO
        title="Exclusive Bonus: Top Profitable Niches 2025"
        description="Your exclusive list of the most profitable TikTok and YouTube niches for 2025."
        noIndex={true}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <img
              src={logo}
              alt="MonetizedProfiles"
              className="h-10 md:h-12 mx-auto mb-8"
            />
            
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Gift className="h-5 w-5" />
              <span className="font-medium">Exclusive Bonus Content</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Top Profitable Niches for 2025
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thanks for subscribing! As promised, here are the most profitable TikTok and YouTube niches 
              that are dominating right now. Use these to find your perfect content angle.
            </p>
          </div>
        </section>

        {/* Niches Content */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-4 space-y-8">
            <NicheSection
              title="TOP TIKTOK NICHES"
              icon={Music}
              categories={tiktokNiches}
              iconColor="text-pink-500"
            />

            <NicheSection
              title="TOP YOUTUBE NICHES"
              icon={Youtube}
              categories={youtubeNiches}
              iconColor="text-red-500"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 text-primary mb-4">
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Ready to Start?</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Skip the Grind, Start Monetized
            </h2>

            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Browse our collection of pre-monetized TikTok and YouTube accounts 
              and start earning from day one.
            </p>

            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                Browse Monetized Accounts
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default BonusNiches;
