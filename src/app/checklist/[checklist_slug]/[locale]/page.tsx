import { Avatar } from "@/components/avatar";
import {
    Checklist as IChecklist,
    ChecklistService,
} from "@/services/checklist";
import { Tags } from "@/components/tag";
import { CircleStackIcon } from "@heroicons/react/24/solid";
import { Checklist } from "@/components/checklist";
import { LocalesDropdown } from "@/components/localeDropdown";
import Link from "next/link";
import { Metadata } from "next";
import Script from "next/script";

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

// Generate the page metadata
export async function generateMetadata({
    params: { checklist_slug: slug, locale },
}: {
    params: ChecklistParam;
}): Promise<Metadata> {
    const checklist = ChecklistService.getInstance().getChecklistData(
        slug,
        locale
    );

    return {
        title: `DevChecklists | ${checklist.frontmatter.title ?? ""}`,
        description: checklist.frontmatter.description,
        keywords: checklist.frontmatter.tags,
    };
}

// Used to provide rich results for search engines
// https://developers.google.com/search/docs/appearance/structured-data/how-to
function generateJSONLD(checklist: IChecklist) {
    return {
        __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: checklist.frontmatter.title ?? checklist.slug,
            // TODO: Extract checkitems and add them to JSON-LD
            step: [],
        }),
    };
}

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
        <>
            <Script
                id="ld-json"
                type="application/ld+json"
                dangerouslySetInnerHTML={generateJSONLD(checklist)}
            />
            <div className="flex flex-col container mx-auto">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mt-10 order-1 md:order-2">
                        <LocalesDropdown
                            availableLocales={availableLocales}
                            hrefPrefix={`/checklist/${slug}/`}
                        />
                    </div>
                    <div className="flex flex-col gap-4 my-10 order-2 md:order-1">
                        <div className="flex justify-between">
                            {title && (
                                <h2 className="text-4xl font-mono">{title}</h2>
                            )}
                        </div>
                        <div className="checklist-author">
                            <Link
                                href={
                                    author_username
                                        ? `https://github.com/${author_username}/`
                                        : "#"
                                }
                                target="_blank"
                                className="flex gap-2 text-blue items-center"
                            >
                                {author_username && (
                                    <Avatar
                                        username={author_username}
                                        size={35}
                                    />
                                )}
                                {author_name && <h5>{author_name}</h5>}
                            </Link>
                        </div>
                        <h5 className="text-light-gray">{description}</h5>
                        <Tags tags={tags} />
                        <div className="flex text-blue gap-2 items-center">
                            <CircleStackIcon title="Storage" className="h-4" />
                            <h5>Checks are saved to your local storage</h5>
                        </div>
                    </div>
                </div>

                <article className="prose prose-invert prose-ul:list-none max-w-3xl px-10 py-4 bg-dark-gray rounded-md">
                    <Checklist checklistHTML={checklist.contentHtml} />
                </article>
            </div>
        </>
    );
};

export default ChecklistPage;
