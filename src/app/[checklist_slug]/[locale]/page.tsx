import { Avatar } from "@/components/avatar";
import { ChecklistService } from "../../../services/checklist";
import { Tag } from "@/components/tag";
import { CircleStackIcon } from "@heroicons/react/24/solid";
import { Checklist } from "@/components/checklist";
import { LocalesDropdown } from "@/components/localeDropdown";

interface ChecklistParam {
    checklist_slug: string;
    locale: string;
}

// Generate all static paths that lead to checklists on the format /<checklist_slug>/<locale>
export const generateStaticParams = (): ChecklistParam[] => {
    const checklistPaths = ChecklistService.getInstance().getChecklistFiles();

    return checklistPaths.map(({ slug, locale }) => ({
        checklist_slug: slug,
        locale,
    }));
};

const ChecklistPage = ({
    params: { checklist_slug: slug, locale },
}: {
    params: ChecklistParam;
}) => {
    const checklist = ChecklistService.getInstance().getChecklistData(
        slug,
        locale
    );
    const {
        frontmatter: {
            title,
            description,
            author_username,
            author_name,
            tags = [],
        },
        availableLocales,
    } = checklist;

    const Tags = tags.map((tag) => <Tag key={tag} tag={tag} />);

    return (
        <div className="flex flex-col container mx-auto">
            <div className="flex justify-between">
                <div className="flex flex-col gap-4 my-10">
                    <div className="flex justify-between">
                        {title && (
                            <h2 className="text-4xl font-mono">{title}</h2>
                        )}
                    </div>
                    <div className="checklist-author">
                        <a
                            href={
                                author_username
                                    ? `https://github.com/${author_username}/`
                                    : "#"
                            }
                            target="_blank"
                            className="flex gap-2"
                        >
                            {author_username && (
                                <Avatar username={author_username} />
                            )}
                            {author_name && <h5>{author_name}</h5>}
                        </a>
                    </div>
                    <h5 className="text-gray-500">{description}</h5>
                    <div>{Tags}</div>
                    <div className="flex text-blue-400 gap-2 items-center">
                        <CircleStackIcon title="Storage" className="h-4" />
                        <h5>Checks are saved in your local storage</h5>
                    </div>
                </div>
                <LocalesDropdown availableLocales={availableLocales} />
            </div>

            <article className="prose prose-invert prose-ul:list-none max-w-3xl px-10 py-4 bg-gray-900 rounded-md">
                <Checklist checklistHTML={checklist.contentHtml} />
            </article>
        </div>
    );
};

export default ChecklistPage;
