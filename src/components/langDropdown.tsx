import Link from "next/link";

interface LangsDropdownProps {
    availableLangs: string[];
    href?: string;
}

export const LangsDropdown = ({
    availableLangs,
    href = "",
}: LangsDropdownProps) => {
    if (!availableLangs || availableLangs.length <= 1) {
        return null;
    }

    return (
        <details className="h-6">
            <summary className="m-1 open:bg-light-black">Languages</summary>
            <ul className="relative z-10 bg-light-black p-2 shadow">
                {availableLangs.map((lang) => (
                    <li key={lang}>
                        <Link href={`/${lang}${href}`} prefetch={false}>
                            {lang}
                        </Link>
                    </li>
                ))}
            </ul>
        </details>
    );
};
