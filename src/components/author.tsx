import Link from "next/link";
import { Avatar } from "./avatar";

export const Author = ({
    author_name,
    author_username,
    avatarSize = 35,
}: {
    author_name?: string;
    author_username?: string;
    avatarSize?: number;
}) => {
    if (!author_name && !author_username) {
        return null;
    }

    const AvatarAndName = (
        <span className="flex items-center gap-2">
            <Avatar
                username={(author_username ?? author_name)!}
                size={avatarSize}
            />
            <h5>{author_name ?? author_username}</h5>
        </span>
    );

    if (!author_username) return AvatarAndName;

    return (
        <Link
            href={`https://github.com/${author_username}/`}
            target="_blank"
            className="flex items-center gap-2"
        >
            {AvatarAndName}
        </Link>
    );
};
