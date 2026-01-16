import { useEffect } from "react";

const Sitemap = () => {
  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const response = await fetch(
          "https://csbwkcpugthkdvdpbtvd.supabase.co/functions/v1/sitemap"
        );
        const xml = await response.text();
        
        // Replace entire document with XML content
        document.open("text/xml");
        document.write(xml);
        document.close();
      } catch (error) {
        console.error("Failed to fetch sitemap:", error);
      }
    };
    
    fetchSitemap();
  }, []);

  return null;
};

export default Sitemap;
