import Script from "next/script";

// To be added to <head> on app/page.tsx
export const HeadGTM = () => (
    <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WFBZNP9');`}
    </Script>
);

// To be added to <body> on app/page.tsx
export const BodyGTM = () => (
    <noscript>
        <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFBZNP9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
        ></iframe>
    </noscript>
);
