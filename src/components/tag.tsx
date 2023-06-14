import Link from "next/link";

export const Tags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
        ))}
    </div>
);

export const Tag = ({ tag }: { tag: string }) => (
    <Link
        className="mt-2 shrink-0 rounded bg-blue p-1 font-mono text-xs font-bold text-black"
        href={`/tag/${tag}`}
    >
        {tag};
    </Link>
);
