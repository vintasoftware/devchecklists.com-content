import Image from "next/image";
import Logo from "@/images/logo.svg";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="border-bottom flex justify-center border-black bg-dark-gray p-4">
            <nav className="container flex h-16 items-center justify-between">
                <Link href="/">
                    <Image src={Logo} alt="Devchecklists logo" width={180} />
                </Link>
                <Link
                    href="https://github.com/vintasoftware/devchecklists.com-content/collaborate.md"
                    target="_blank"
                    className="flex-shrink-0 rounded border-2 border-b-8 border-dark-green bg-green px-2 py-3 font-mono text-dark-gray"
                >
                    + Collaborate
                </Link>
            </nav>
        </header>
    );
};
