import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

/**
 * Redirects old /product/:handle URLs to new /products/:handle URLs
 * Preserves SEO by using replace navigation (301-like behavior)
 */
export const ProductRedirect = () => {
  const { handle } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (handle) {
      navigate(`/products/${handle}`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [handle, navigate]);

  return null;
};
