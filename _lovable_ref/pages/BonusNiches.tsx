import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Gift, Youtube, Music, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Niche {
  name: string;
  description: string;
  url?: string;
}

interface NicheCategory {
  category: string;
  niches: Niche[];
}

const tiktokNiches: NicheCategory[] = [
  {
    category: "Entertainment",
    niches: [
      { name: "Retro TV Shows", description: "Nostalgic clips from classic television", url: "https://www.tiktok.com/@toontv889" },
      { name: "Anime Edits", description: "Creative anime compilations and edits", url: "https://www.tiktok.com/@vs.shark" },
      { name: "Funny Videos", description: "Viral comedy content and humor clips", url: "https://www.tiktok.com/@funny.viedoo" },
      { name: "Young Sheldon Clips", description: "Popular sitcom highlights", url: "https://www.tiktok.com/@clips21532" },
      { name: "Impractical Jokers Clips", description: "Prank show best moments", url: "https://www.tiktok.com/@funnyimjclips" },
    ],
  },
  {
    category: "Services & How-To",
    niches: [
      { name: "Carpet Cleaning", description: "Satisfying cleaning transformations", url: "https://www.tiktok.com/@soclean.yt" },
      { name: "Plumbing", description: "DIY fixes and professional tips", url: "https://www.tiktok.com/@beaplumbertheysaid" },
      { name: "Pool Cleaning", description: "Oddly satisfying pool maintenance", url: "https://www.tiktok.com/@thep00lguy" },
      { name: "Driving Instruction", description: "Tips for new drivers and road safety", url: "https://www.tiktok.com/@clearviewdriving" },
      { name: "Hair Styling", description: "Trending cuts, colors, and tutorials", url: "https://www.tiktok.com/@stash2.0" },
    ],
  },
  {
    category: "Lifestyle & Fashion",
    niches: [
      { name: "Sneakers", description: "Shoe reviews, drops, and collections", url: "https://www.tiktok.com/@qiasomar24" },
      { name: "Fashion", description: "Outfit inspiration and style tips", url: "https://www.tiktok.com/@cultureforce" },
      { name: "Lifestyle", description: "Day-in-the-life and aesthetic content", url: "https://www.tiktok.com/@ashley.paiige" },
      { name: "Animated Knitting", description: "Creative craft content with animations", url: "https://www.tiktok.com/@indiarosecrawford" },
    ],
  },
  {
    category: "Unique & Creative",
    niches: [
      { name: "Hypnosis", description: "Hypnotherapy content and relaxation", url: "https://www.tiktok.com/@hayleyadams_hypnotherapy" },
      { name: "AI Animal Rescues", description: "AI-generated heartwarming rescue stories", url: "https://www.tiktok.com/@bluelifeheroes" },
      { name: "Miniature Items", description: "Tiny creations and mini worlds", url: "https://www.tiktok.com/@realminiworld" },
      { name: "Quiz", description: "Interactive trivia and brain teasers", url: "https://www.tiktok.com/@gugugagaquiz" },
    ],
  },
  {
    category: "Other Trending",
    niches: [
      { name: "Buy and Sell", description: "Flipping items and marketplace finds", url: "https://www.tiktok.com/@buy.and.selll" },
      { name: "News", description: "Breaking news and current events coverage", url: "https://www.tiktok.com/@aaronparnas1" },
      { name: "Darts", description: "Professional darts highlights and tips", url: "https://www.tiktok.com/@switchdarts" },
    ],
  },
];

const youtubeNiches: NicheCategory[] = [
  {
    category: "Entertainment & Gaming",
    niches: [
      { name: "Gaming", description: "Let's plays, walkthroughs, and gaming content", url: "https://www.youtube.com/@Caylus/videos" },
      { name: "This or That", description: "Interactive choice-based content", url: "https://www.youtube.com/@corvscateee/videos" },
      { name: "Gumball Universe", description: "Animated show fan content", url: "https://www.youtube.com/@ItsGumballsUniverse" },
      { name: "Invincible", description: "Comic/show analysis and content", url: "https://www.youtube.com/@AyoZan3/videos" },
      { name: "Criminal Movie Characters", description: "Movie villain analysis and breakdowns", url: "https://www.youtube.com/@realmousait/videos" },
    ],
  },
  {
    category: "Tech & Finance",
    niches: [
      { name: "Gadget Reviews", description: "Tech product reviews and unboxings", url: "https://www.youtube.com/@bensgadgetreviews/videos" },
      { name: "Make Money Online", description: "Side hustles and income strategies", url: "https://www.youtube.com/@marktilbury/videos" },
    ],
  },
  {
    category: "Lifestyle & How-To",
    niches: [
      { name: "Mini Food Cooking", description: "Tiny kitchen cooking videos", url: "https://www.youtube.com/@HanaMiniCooking/videos" },
      { name: "Amish Life Hacks", description: "Traditional living tips and tricks", url: "https://www.youtube.com/@FrugalSolutionsTV" },
      { name: "Fashion", description: "Style tips and outfit inspiration", url: "https://www.youtube.com/@ezracaughtin4k" },
      { name: "Travel Hacks", description: "Budget travel tips and guides", url: "https://www.youtube.com/@TravelHackLab" },
      { name: "Safe by Design", description: "Safety tips and awareness content", url: "https://www.youtube.com/@SafeByDesign" },
      { name: "Welding", description: "Metalwork tutorials and art", url: "https://www.youtube.com/@METALWELDINGART" },
    ],
  },
  {
    category: "Spirituality & Wellness",
    niches: [
      { name: "Islamic Teachings", description: "Religious education and inspiration", url: "https://www.youtube.com/@BrotherAqibOfficial" },
      { name: "Healing Energy Frequencies", description: "Meditation and frequency content", url: "https://www.youtube.com/@AbundanceEnergy2104" },
    ],
  },
  {
    category: "Sports",
    niches: [
      { name: "Wrestling", description: "WWE/wrestling highlights and news", url: "https://www.youtube.com/@realwrestlemafia" },
      { name: "Baseball", description: "MLB content and analysis", url: "https://www.youtube.com/@unidiamondtalk1" },
    ],
  },
  {
    category: "Unique Niches",
    niches: [
      { name: "Elderly Amazon Products", description: "Product reviews for seniors", url: "https://www.youtube.com/@MiniMart_1" },
      { name: "HFY (Humanity F*** Yeah)", description: "Sci-fi stories celebrating humanity", url: "https://www.youtube.com/@SpaceHumansHFYSciFi/videos" },
      { name: "Old Photos", description: "Historical photography and stories", url: "https://www.youtube.com/@Immorta-lChronicles" },
      { name: "Who Died Today", description: "Celebrity death news and tributes", url: "https://www.youtube.com/@whodiedtoday-us/videos" },
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
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{niche.name}</span>
                      {niche.url && (
                        <a
                          href={niche.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          View Example →
                        </a>
                      )}
                    </div>
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
        title="Your Email Signup Bonus: 40 Viral Niches for 2026"
        description="Your exclusive email signup bonus - 40 viral TikTok and YouTube niches with proven demand for 2026."
        noIndex={true}
      />

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Gift className="h-5 w-5" />
              <span className="font-medium">Your Email Signup Bonus</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              40 Viral Niches for 2026
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thanks for subscribing! As promised, here are <span className="font-semibold text-foreground">40 proven viral niches</span> for 
              TikTok and YouTube — each with real demand and monetization potential. Use these to find your perfect content angle.
            </p>
          </div>
        </section>

        {/* Niches Content */}
        <section className="py-8 md:py-12">
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
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto px-4">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="inline-flex items-center gap-2 text-primary mb-4">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">Want 160+ More Niches?</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Get the Full Niche Vault with Your First Purchase
                </h2>

                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  When you buy your first monetized TikTok or YouTube account, you'll unlock our 
                  <span className="font-semibold text-foreground"> complete vault of 160+ viral niches</span> — 
                  updated regularly with fresh opportunities.
                </p>

                <Button asChild size="lg" className="gap-2">
                  <Link to="/">
                    Browse Monetized Accounts
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default BonusNiches;
