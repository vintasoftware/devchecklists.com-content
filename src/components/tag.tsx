export const Tag = ({ tag }: { tag: string }) => (
    <a
        key={tag}
        className="rounded shrink-0 mt-2 p-1 font-mono font-bold text-xs bg-blue-400 text-black"
        href={`/tag/${tag}`}
    >
        {tag};
    </a>
);
