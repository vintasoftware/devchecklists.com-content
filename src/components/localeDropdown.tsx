import Link from "next/link";

interface LocalesDropdownProps {
    availableLocales: string[];
    hrefPrefix?: string;
}

export const LocalesDropdown = ({
    availableLocales,
    hrefPrefix = "",
}: LocalesDropdownProps) => {
    if (!availableLocales || availableLocales.length <= 1) {
        return null;
    }

    return (
        <details className="h-6">
            <summary className="m-1 open:bg-light-black">Languages</summary>
            <ul className="relative z-10 bg-light-black p-2 shadow">
                {availableLocales.map((locale) => (
                    <li key={locale}>
                        <Link href={`${hrefPrefix}${locale}`}>{locale}</Link>
                    </li>
                ))}
            </ul>
        </details>
    );
};
