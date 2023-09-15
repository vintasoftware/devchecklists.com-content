import Image from "next/image";
import Link from "next/link";
import Logo from "@/images/logo.svg";

export const Header = ({ lang }: { lang: string }) => {
    return (
        <header className="border-bottom flex justify-center border-black bg-dark-gray p-4">
            <nav className="container flex h-16 items-center justify-between">
                <Link href={`/${lang}`}>
                    <Image src={Logo} alt="Devchecklists logo" width={180} />
                </Link>
                <Link
                    href="https://github.com/vintasoftware/devchecklists.com-content/blob/main/COLLABORATE.md"
                    target="_blank"
                    className="flex-shrink-0 rounded border-2 border-b-8 border-dark-green bg-green px-2 py-3 font-mono text-dark-gray"
                >
                    + Collaborate
                </Link>
            </nav>
        </header>
    );
};
