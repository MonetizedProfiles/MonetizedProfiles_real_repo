import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowRight } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

// Shopify Blog API setup
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_PERMANENT_DOMAIN || 'your-store.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

const BLOG_QUERY = `
  query GetBlogPosts($first: Int!) {
    articles(first: $first) {
      edges {
        node {
          id
          title
          handle
          excerpt
          content
          publishedAt
          image {
            url
            altText
          }
          blog {
            handle
          }
        }
      }
    }
  }
`;

async function fetchBlogPosts(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error fetching blog posts: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

const Blog = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const response = await fetchBlogPosts(BLOG_QUERY, { first: 20 });
      return response.data.articles.edges;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="MonetizedProfiles" className="h-8" />
          </Link>
          <CartDrawer />
        </div>
      </header>

      {/* Blog Header */}
      <section className="py-16 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and insights for growing your social media business
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 container mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : !data || data.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No blog posts yet</h3>
            <p className="text-muted-foreground">Check back soon for valuable insights and tips!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {data.map((article: any) => (
              <Card key={article.node.id} className="group hover:shadow-lg transition-all hover:border-primary/50 overflow-hidden">
                {article.node.image && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={article.node.image.url} 
                      alt={article.node.image.altText || article.node.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.node.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {article.node.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 mb-4">
                    {article.node.excerpt || article.node.content.substring(0, 150) + '...'}
                  </CardDescription>
                  <a 
                    href={`https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/blogs/${article.node.blog.handle}/${article.node.handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <img src={logo} alt="MonetizedProfiles" className="h-8 mb-4" />
              <p className="text-muted-foreground text-sm max-w-md">
                Premium digital products for social media professionals. Turn your followers into customers.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-2">
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <div className="flex flex-col space-y-2 text-sm">
                <Link to="/" className="hover:text-primary transition-colors">Shop</Link>
                <a href="#" className="hover:text-primary transition-colors">About</a>
                <a href="#" className="hover:text-primary transition-colors">Contact</a>
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-2">
              <h3 className="font-semibold mb-3">Legal</h3>
              <div className="flex flex-col space-y-2 text-sm">
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              </div>
            </div>
          </div>

          {/* Email Capture */}
          <div className="pt-8 border-t max-w-md mx-auto text-center">
            <p className="text-sm text-muted-foreground mb-3">Get notified about restocking and exclusive offers</p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email');
                toast.success("Thanks for subscribing!");
                e.currentTarget.reset();
              }}
              className="flex gap-2"
            >
              <Input 
                type="email" 
                name="email"
                placeholder="Enter your email" 
                required 
                className="flex-1"
              />
              <Button type="submit" size="sm">Subscribe</Button>
            </form>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground pt-8">
            <p>&copy; 2024 MonetizedProfiles. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;
