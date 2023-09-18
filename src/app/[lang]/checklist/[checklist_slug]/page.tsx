import { CircleStackIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Script from "next/script";
import {
    ChecklistService,
    Checklist as IChecklist,
} from "@/services/checklist";
import { Tags } from "@/components/tag";
import { Checklist } from "@/components/checklist";
import { LangsDropdown } from "@/components/langDropdown";
import { Author } from "@/components/author";

import "./page.css";

interface ChecklistParam {
    checklist_slug: string;
    lang: string;
}

// Generate all static paths that lead to checklists
export const generateStaticParams = (): ChecklistParam[] => {
    const checklistPaths = ChecklistService.getInstance().getChecklistFiles();

    return checklistPaths.map(({ slug, lang }) => ({
        checklist_slug: slug,
        lang,
    }));
};

// Generate the page metadata
export async function generateMetadata({
    params: { checklist_slug: slug, lang },
}: {
    params: ChecklistParam;
}): Promise<Metadata> {
    const checklist = ChecklistService.getInstance().getChecklistData(
        slug,
        lang,
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
    params: { checklist_slug: slug, lang },
}: {
    params: ChecklistParam;
}) => {
    const checklist = ChecklistService.getInstance().getChecklistData(
        slug,
        lang,
    );
    const {
        frontmatter: {
            title,
            description,
            author_username,
            author_name,
            tags = [],
        },
        availableLangs,
    } = checklist;

    return (
        <>
            <Script
                id="ld-json"
                type="application/ld+json"
                dangerouslySetInnerHTML={generateJSONLD(checklist)}
            />
            <div className="container mx-auto flex flex-col">
                <div className="flex flex-col justify-between px-4 md:flex-row md:px-0">
                    <div className="order-1 mt-10 md:order-2">
                        <LangsDropdown
                            availableLangs={availableLangs}
                            href={`/checklist/${slug}/`}
                        />
                    </div>
                    <div
                        className="order-2 my-10 flex flex-col gap-4 md:order-1"
                        data-pagefind-body
                    >
                        <div className="flex justify-between">
                            {title && (
                                <h2 className="font-mono text-4xl">{title}</h2>
                            )}
                        </div>
                        <div className="text-blue">
                            <Author
                                author_name={author_name}
                                author_username={author_username}
                            />
                        </div>
                        <h5 className="text-light-gray">{description}</h5>
                        <Tags tags={tags} lang={lang} />
                        <div className="flex items-center gap-2 text-blue">
                            <CircleStackIcon title="Storage" className="h-4" />
                            <h5>Checks are saved to your local storage</h5>
                        </div>
                    </div>
                </div>

                <article className="prose prose-invert max-w-3xl rounded-md bg-dark-gray px-10 py-8 prose-ul:list-none">
                    <Checklist checklistHTML={checklist.contentHtml} />
                </article>
            </div>
        </>
    );
};

export default ChecklistPage;
