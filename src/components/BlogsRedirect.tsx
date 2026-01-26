import { useParams, Navigate } from "react-router-dom";

export const BlogsRedirect = () => {
  const { "*": path } = useParams();
  
  // Handle /blogs/blog-name/article-handle -> /blog/article-handle
  // Or /blogs/article-handle -> /blog/article-handle
  const parts = path?.split("/") || [];
  const handle = parts[parts.length - 1];
  
  // If no handle, redirect to main blog page
  if (!handle) {
    return <Navigate to="/blog" replace />;
  }
  
  return <Navigate to={`/blog/${handle}`} replace />;
};
