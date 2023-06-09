import Image from "next/image";
import VintaLogo from "@/images/vinta-logo.png";
import NextLogo from "@/images/next.svg";

export const Footer = () => {
    return (
        <footer className="h-52 bg-gray-800 text-white mt-8">
            <div className="flex justify-between items-center container h-full mx-auto">
                <div className="flex flex-col">
                    <h5 className="pb-4 font-mono">
                        made with <span className="text-red-600">❤︎</span> by
                    </h5>
                    <a href="https://vintasoftware.com/" target="_blank">
                        <Image
                            src={VintaLogo}
                            height={42}
                            alt="Vinta Software Logo"
                        />
                    </a>
                </div>
                <div className="flex flex-col">
                    <h5 className="pb-4 font-mono">developed using</h5>
                    <a href="https://nextjs.org/" target="_blank">
                        <Image src={NextLogo} height={42} alt="Next Logo" />
                    </a>
                </div>
                <h5 className="max-w-sm text-right text-gray-500">
                    Those checklists are used in Vinta&apos;s projects and we
                    are always looking for exciting work. So, if want to know us
                    better feel free to{" "}
                    <a
                        className="text-lime-400"
                        href="mailto:contact@vinta.com.br"
                    >
                        get in touch.
                    </a>
                </h5>
            </div>
        </footer>
    );
};
