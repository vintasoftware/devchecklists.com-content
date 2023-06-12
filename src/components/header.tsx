import Image from "next/image";
import Logo from "@/images/logo.png";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="flex justify-center border-bottom border-black bg-dark-gray p-4">
            <nav className="flex container justify-between items-center h-16">
                <Link href="/">
                    <Image src={Logo} alt="Devchecklists logo" width={180} />
                </Link>
                <Link
                    href="https://github.com/vintasoftware/devchecklists.com-content/collaborate.md"
                    target="_blank"
                    className="rounded flex-shrink-0 border-2 border-b-8 font-mono text-dark-gray bg-green border-dark-green px-2 py-3"
                >
                    + Collaborate
                </Link>
            </nav>
        </header>
    );
};
