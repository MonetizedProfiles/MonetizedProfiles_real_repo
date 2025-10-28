import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowLeft } from "lucide-react";
import { storefrontApiRequest } from "@/lib/shopify";

const BLOG_POST_QUERY = `
  query GetBlogPost($handle: String!) {
    blog(handle: "news") {
      articleByHandle(handle: $handle) {
        id
        title
        handle
        content
        contentHtml
        excerpt
        publishedAt
        image {
          url
          altText
        }
        author {
          name
        }
      }
    }
  }
`;

const BlogPost = () => {
  const { handle } = useParams<{ handle: string }>();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['blog-post', handle],
    queryFn: async () => {
      const response = await storefrontApiRequest(BLOG_POST_QUERY, { handle });
      return response.data.blog?.articleByHandle;
    },
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <div className="bg-background">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-48 mb-8" />
          <Skeleton className="aspect-video w-full mb-8" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog post not found</h2>
          <Link to="/blog" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back to Blog */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
          
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={data.publishedAt}>
                {new Date(data.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            {data.author && (
              <>
                <span>•</span>
                <span>By {data.author.name}</span>
              </>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {data.image && (
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img 
              src={data.image.url} 
              alt={data.image.altText || data.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: data.contentHtml }}
        />
      </article>
    </div>
  );
};

export default BlogPost;
