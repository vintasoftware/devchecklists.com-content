import Image from "next/image";
import VintaLogo from "@/images/vinta-logo.svg";
import NextLogo from "@/images/next.svg";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="text-white mt-8 bg-dark-gray md:h-52">
            <div className="container mx-auto flex h-full flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex flex-col">
                    <h5 className="pb-4 font-mono">
                        made with <span className="text-red">❤︎</span> by
                    </h5>
                    <Link href="https://vintasoftware.com/" target="_blank">
                        <Image
                            src={VintaLogo}
                            height={80}
                            alt="Vinta Software Logo"
                        />
                    </Link>
                </div>
                <div className="flex flex-col">
                    <h5 className="pb-4 font-mono">developed using</h5>
                    <Link href="https://nextjs.org/" target="_blank">
                        <Image src={NextLogo} height={42} alt="Next Logo" />
                    </Link>
                </div>
                <h5 className="max-w-sm text-right text-light-gray">
                    Those checklists are used in Vinta&apos;s projects and we
                    are always looking for exciting work. So, if want to know us
                    better feel free to{" "}
                    <Link
                        className="text-green"
                        href="mailto:contact@vinta.com.br"
                    >
                        get in touch.
                    </Link>
                </h5>
            </div>
        </footer>
    );
};
