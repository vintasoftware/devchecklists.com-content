import Image from "next/image";
import { Checklist } from "../services/checklist";
import { Avatar } from "./avatar";
import IconSocialGithub from "@/images/icon-social-github.png";
import { Tags } from "./tag";

export const Card = ({ checklist }: { checklist: Checklist }) => {
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
            <div className="flex justify-between rounded-t-md bg-blue text-black p-4">
                <div className="flex flex-col">
                    <a href={`/${slug}/en/`}>
                        <h3 className="text-2xl">{title}</h3>
                    </a>
                    {author_username && (
                        <a
                            href={`https://github.com/${author_username}`}
                            target="_blank"
                            className="flex items-center mt-4"
                        >
                            <Avatar username={author_username} />
                            <h6 className="ml-2 text-xs font-bold">
                                {author_username}
                            </h6>
                        </a>
                    )}
                </div>
                {github_repository && (
                    <a
                        href={`https://github.com/vintasoftware/${github_repository}`}
                        target="_blank"
                    >
                        <Image src={IconSocialGithub} alt="github logo" />
                    </a>
                )}
            </div>
            <div className="p-6">
                <h5 className="text-light-gray">{description}</h5>
                <Tags tags={tags} />
            </div>
        </div>
    );
};
