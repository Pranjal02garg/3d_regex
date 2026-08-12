/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

// This component handles the Meta Pixel initialization and page view tracking
export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Replace with your actual Meta Pixel ID, or use an environment variable
  const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "YOUR_PIXEL_ID";

  useEffect(() => {
    // Only track page views if the Pixel has been loaded
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  if (!PIXEL_ID || PIXEL_ID === "YOUR_PIXEL_ID") {
    console.warn("Meta Pixel ID is not configured. Add NEXT_PUBLIC_META_PIXEL_ID to your environment variables.");
    return null; // Don't render the script if there's no real ID
  }

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
