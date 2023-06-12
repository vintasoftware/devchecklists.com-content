import { Avatar } from "@/components/avatar";
import { ChecklistService } from "../../../services/checklist";
import { Tag, Tags } from "@/components/tag";
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
                            className="flex gap-2 text-blue items-center"
                        >
                            {author_username && (
                                <Avatar username={author_username} size={35} />
                            )}
                            {author_name && <h5>{author_name}</h5>}
                        </a>
                    </div>
                    <h5 className="text-light-gray">{description}</h5>
                    <Tags tags={tags} />
                    <div className="flex text-blue gap-2 items-center">
                        <CircleStackIcon title="Storage" className="h-4" />
                        <h5>Checks are saved to your local storage</h5>
                    </div>
                </div>
                <div className="mt-10">
                    <LocalesDropdown availableLocales={availableLocales} />
                    </div>
            </div>

            <article className="prose prose-invert prose-ul:list-none max-w-3xl px-10 py-4 bg-dark-gray rounded-md">
                <Checklist checklistHTML={checklist.contentHtml} />
            </article>
        </div>
    );
};

export default ChecklistPage;
