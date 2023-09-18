"use client";

import Script from "next/script";

export const Search = () => {
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
