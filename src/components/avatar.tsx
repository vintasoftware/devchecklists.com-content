"use client";
import Image from "next/image";

export interface AvatarProps {
    username: string;
    size?: number;
}

export const Avatar = ({ username, size = 20 }: AvatarProps) => {
    return (
        <Image
            src={`https://github.com/${username}.png`}
            alt={username}
            width={size}
            height={size}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping if gravatar fails to load
                currentTarget.src =
                    "https://www.gravatar.com/avatar/{include.author_username}?d=retro";
            }}
        />
    );
};
