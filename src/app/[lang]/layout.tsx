import { Roboto_Flex, Roboto_Mono } from "next/font/google";
import { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { BodyGTM, HeadGTM } from "@/components/gtm";
import { ChecklistService } from "@/services/checklist";

import "../globals.css";
import { Search } from "@/components/search";
import { Suspense } from "react";

// Loads fonts: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
export const robotoFlex = Roboto_Flex({ subsets: ["latin"], display: "swap" });
export const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap" });

export const generateStaticParams = () => {
    return ChecklistService.getInstance()
        .getAllChecklistLangs()
        .map((lang) => ({ lang }));
};

export default function Layout({
    children,
    params: { lang },
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    return (
        <html lang={lang}>
            <HeadGTM />

            <body className="bg-light-black">
                <BodyGTM />
                <Header lang={lang} />
                <Suspense fallback={null}>
                    <Search />
                </Suspense>
                <div className="mx-auto min-h-screen max-w-5xl">{children}</div>
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
    metadataBase: new URL("https://devchecklists.com"),
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
