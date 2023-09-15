"use client";

import Script from "next/script";
/*import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";*/

export const Search = () => {
    /*const pathname = usePathname();
    const searchParams = useSearchParams();*/

    /*useEffect(() => {
        // @ts-ignore
        if (PagefindUI) {
            console.log("oi");
            // @ts-ignore
            new PagefindUI({
                element: "#search",
                showSubResults: true,
            });
        }
    }, [pathname, searchParams]);*/

    return (
        <>
            <div id="search"></div>
            <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
            <Script
                src="/pagefind/pagefind-ui.js"
                onLoad={() =>
                    // @ts-ignore
                    new PagefindUI({
                        element: "#search",
                        showSubResults: true,
                    })
                }
            />
        </>
    );
};
