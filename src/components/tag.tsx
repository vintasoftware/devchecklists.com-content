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
        className="rounded shrink-0 mt-2 p-1 font-mono font-bold text-xs bg-blue text-black"
        href={`/tag/${tag}`}
    >
        {tag};
    </Link>
);
