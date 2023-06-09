import { Footer } from "../components/footer";
import { Header } from "../components/header";
import "./globals.css";
import { Roboto_Flex, Roboto_Mono } from "next/font/google";

// Loads fonts: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
export const robotoFlex = Roboto_Flex({ subsets: ["latin"], display: "swap" });
export const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap" });

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-gray-900">
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
