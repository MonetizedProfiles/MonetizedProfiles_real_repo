'use client';

import Script from 'next/script';
import { GA_ID, TAPFILIATE_ID } from '@/lib/constants';

export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
      {TAPFILIATE_ID && (
        <Script id="tapfiliate" strategy="lazyOnload">
          {`(function(t,a,p){t.TapsAffiliateObject=a;t[a]=t[a]||function(){(t[a].q=t[a].q||[]).push(arguments)};var s=document.createElement('script');s.async=!0;s.src='https://script.tapfiliate.com/tapfiliate.js';var r=document.getElementsByTagName('script')[0];r.parentNode.insertBefore(s,r)})(window,'tap');tap('create','${TAPFILIATE_ID}',{integration:'javascript'});tap('detect');`}
        </Script>
      )}
    </>
  );
}
