import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, ArrowLeft } from "lucide-react";
import { storefrontApiRequest } from "@/lib/shopify";
import { SEO } from "@/components/SEO";

const BLOG_POST_QUERY = `
  query GetBlogPost($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
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
  const searchParams = new URLSearchParams(window.location.search);
  const blogHandle = searchParams.get('blog') || 'news';
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['blog-post', blogHandle, handle],
    queryFn: async () => {
      const response = await storefrontApiRequest(BLOG_POST_QUERY, { 
        blogHandle, 
        articleHandle: handle 
      });
      return response.data.blog?.articleByHandle;
    },
    enabled: !!handle && !!blogHandle,
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
    <>
      <SEO 
        title={data.title}
        description={data.excerpt || data.content.substring(0, 155) + "..."}
        keywords={`${data.title}, youtube tips, tiktok growth, social media monetization`}
        canonical={`https://monetizedprofiles.com/blog/${handle}`}
        ogImage={data.image?.url}
        ogType="article"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": data.title,
            "image": data.image?.url,
            "datePublished": data.publishedAt,
            "dateModified": data.publishedAt,
            "author": {
              "@type": "Person",
              "name": data.author?.name || "MonetizedProfiles"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MonetizedProfiles",
              "logo": {
                "@type": "ImageObject",
                "url": "https://monetizedprofiles.com/monetizedprofiles-logo.webp"
              }
            },
            "description": data.excerpt || data.content.substring(0, 155)
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://monetizedprofiles.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://monetizedprofiles.com/blog"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": data.title,
                "item": `https://monetizedprofiles.com/blog/${handle}`
              }
            ]
          }
        ]}
      />
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
          className="prose prose-lg max-w-none 
            prose-headings:font-bold prose-headings:text-foreground
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-5
            prose-h4:text-xl prose-h4:mb-2 prose-h4:mt-4
            prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-bold
            prose-em:text-foreground prose-em:italic
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
            prose-li:text-foreground prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground
            prose-code:bg-secondary prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
            prose-pre:bg-secondary prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
            prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
            prose-hr:border-border prose-hr:my-8
            prose-table:border-collapse prose-table:w-full
            prose-th:border prose-th:border-border prose-th:bg-secondary prose-th:p-2 prose-th:text-left
            prose-td:border prose-td:border-border prose-td:p-2"
          dangerouslySetInnerHTML={{ __html: data.contentHtml }}
        />
      </article>
    </div>
    </>
  );
};

export default BlogPost;
