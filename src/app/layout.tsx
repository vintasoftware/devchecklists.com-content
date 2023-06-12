import Script from "next/script";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import "./globals.css";
import { Roboto_Flex, Roboto_Mono } from "next/font/google";
import { Metadata } from "next";

// Loads fonts: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
export const robotoFlex = Roboto_Flex({ subsets: ["latin"], display: "swap" });
export const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap" });

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Script id="google-tag-manager" strategy="afterInteractive">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                '../www.googletagmanager.com/gtm5445.html?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-WFBZNP9');`}
            </Script>
            <body className="bg-light-black">
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-WFBZNP9"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>
                <Header />
                <div className="max-w-5xl mx-auto min-h-screen">{children}</div>
                <Footer />
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    applicationName: "DevChecklists",
    title: "DevChecklists | Always deliver your very best, always check",
    description:
        "DevChecklists is a collaborative space for sharing checklists that help ensure software quality, guide you through crisis and other helpful stuff for devs.",
    keywords:
        "checklist, lean, agile, web development, python, django, javascript, react, python development, django development, javascript development, react development, development, software development, ux design, product discovery, code review, test coverage, mvp, api, api experts, django rest framework, SPA, single page application",
    themeColor: "#52D171",
    colorScheme: "dark",
    twitter: {
        card: "summary_large_image",
        site: "@vintasoftware",
        creator: "@vintasoftware",
        images: [
            {
                url: "/devchecklist-thumbnail.png",
                alt: "Devchecklist thumbnail",
            },
        ],
    },
    openGraph: {
        type: "website",
        images: [
            {
                url: "/devchecklist-thumbnail.png",
                alt: "Devchecklist thumbnail",
            },
        ],
    },
};
