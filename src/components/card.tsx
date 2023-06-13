import Image from "next/image";
import { Checklist } from "../services/checklist";
import { Avatar } from "./avatar";
import GithubIcon from "@/images/github-logo.svg";
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
        <div className="m-4 flex w-64 shrink-0 flex-col rounded-md bg-dark-gray md:w-96">
            <div className="flex h-32 items-center justify-between rounded-t-md bg-blue p-4 text-black">
                <div className="flex w-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <Link href={`checklist/${slug}/${locale}/`}>
                            <h3 className="line-clamp-2 text-2xl">
                                {title ?? slug}
                            </h3>
                        </Link>
                        {github_repository && (
                            <Link href={github_repository} target="_blank">
                                <Image
                                    src={GithubIcon}
                                    alt="github logo"
                                    width={30}
                                    height={30}
                                />
                            </Link>
                        )}
                    </div>
                    {author_username && (
                        <Link
                            href={`https://github.com/${author_username}`}
                            target="_blank"
                            className="mt-4 flex items-center"
                        >
                            <Avatar username={author_username} />
                            <h6 className="ml-2 text-xs font-bold">
                                {author_username}
                            </h6>
                        </Link>
                    )}
                </div>
            </div>
            <div className="flex h-60 flex-col justify-between p-6">
                <h5 className="line-clamp-5 text-light-gray">{description}</h5>
                <Tags tags={tags} />
            </div>
        </div>
    );
};
