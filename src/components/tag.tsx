import Link from "next/link";

export const Tags = ({ tags, lang }: { tags: string[]; lang: string }) => (
    <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
            <Tag key={tag} tag={tag} lang={lang} />
        ))}
    </div>
);

export const Tag = ({ tag, lang }: { tag: string; lang: string }) => (
    <Link
        className="mt-2 shrink-0 rounded bg-blue p-1 font-mono text-xs font-bold text-black"
        href={`/${lang}/tag/${tag}`}
    >
        {tag};
    </Link>
);
