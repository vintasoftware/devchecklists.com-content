import Image from "next/image";
import { Checklist } from "../services/checklist";
import { Avatar } from "./avatar";
import IconSocialGithub from "@/images/icon-social-github.png";
import { Tags } from "./tag";
import Link from "next/link";

export const Card = ({
    checklist,
    locale = "en",
}: {
    checklist: Checklist;
    locale?: string;
}) => {
    const {
        slug,
        frontmatter: {
            title,
            author_username,
            github_repository,
            description,
            tags = [],
        },
    } = checklist;

    return (
        <div className="flex flex-col shrink-0 w-96 rounded-md bg-dark-gray m-4">
            <div className="flex justify-between rounded-t-md bg-blue text-black p-4 h-32">
                <div className="flex flex-col justify-between">
                    <Link href={`checklist/${slug}/${locale}/`}>
                        <h3 className="text-2xl line-clamp-2">{title}</h3>
                    </Link>
                    {author_username && (
                        <Link
                            href={`https://github.com/${author_username}`}
                            target="_blank"
                            className="flex items-center mt-4"
                        >
                            <Avatar username={author_username} />
                            <h6 className="ml-2 text-xs font-bold">
                                {author_username}
                            </h6>
                        </Link>
                    )}
                </div>
                {github_repository && (
                    <Link
                        href={`https://github.com/vintasoftware/${github_repository}`}
                        target="_blank"
                    >
                        <Image src={IconSocialGithub} alt="github logo" />
                    </Link>
                )}
            </div>
            <div className="flex flex-col justify-between p-6 h-60">
                <h5 className="text-light-gray line-clamp-5">{description}</h5>
                <Tags tags={tags} />
            </div>
        </div>
    );
};
