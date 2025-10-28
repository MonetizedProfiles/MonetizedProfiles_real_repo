import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowRight } from "lucide-react";
import { storefrontApiRequest } from "@/lib/shopify";

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

const Blog = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const response = await storefrontApiRequest(BLOG_QUERY, { first: 20 });
      return response.data.articles.edges;
    },
  });

  return (
    <div className="bg-background">

      {/* Blog Header */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and insights for growing your social media business
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 sm:py-16 container mx-auto px-4">
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
                    {article.node.excerpt || (article.node.content ? article.node.content.substring(0, 150) + '...' : '')}
                  </CardDescription>
                  <a 
                    href={`/blog/${article.node.handle}`}
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

    </div>
  );
};

export default Blog;
