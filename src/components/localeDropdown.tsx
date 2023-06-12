import Link from "next/link";

interface LocalesDropdownProps {
    availableLocales: string[];
}

export const LocalesDropdown = ({ availableLocales }: LocalesDropdownProps) => {
    if (!availableLocales || availableLocales.length <= 1) {
        return null;
    }

    return (
        <details className="h-6">
            <summary className="m-1">Languages</summary>
            <ul className="p-2 shadow">
                {availableLocales.map((locale) => (
                    <li key={locale}>
                        <Link href={`${locale}`}>{locale}</Link>
                    </li>
                ))}
            </ul>
        </details>
    );
};
