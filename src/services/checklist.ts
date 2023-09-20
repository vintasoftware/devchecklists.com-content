import path from "path";
import { readFileSync, readdirSync, statSync } from "fs";
import { Plugin, unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import find from "unist-util-find";
import { visit } from "unist-util-visit";
import { parse } from "yaml";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";
import { fromHtml } from "hast-util-from-html";
import { generateSlug } from "@/app/utils";

const NO_CATEGORY = "No Category";

// HeroIcon arrow-top-right-on-square
const EXTERNAL_LINK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4" aria-hidden="true" role="img">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
</svg>`;

export interface FrontMatter {
    author_username: string;
    author_name: string;
    category: string;
    color: string;
    description: string;
    github_repository: string;
    tags: string[];
    title: string;
}

interface ChecklistFile {
    slug: string;
    path: string;
    lang: string;
    lastModified: Date;
}

export interface Checklist {
    slug: string;
    lang: string;
    availableLangs: string[];
    contentHtml: string;
    frontmatter: Partial<FrontMatter>;
}

// Based on https://github.com/phuctm97/remark-parse-frontmatter
// Adds frontmatter metadata to file.data.frontmatter so we can use it later
const remarkParseFrontmatter: Plugin = () => (tree, file) => {
    const node = find(tree, { type: "yaml" });
    if (!node) {
        file.message("No yaml frontmatter.");
        return;
    }
    if (typeof node.value !== "string") file.fail("Invalid yaml node.", node);

    let frontmatter;
    try {
        frontmatter = parse(node.value);
    } catch (err) {
        file.fail(err as Error, node);
    }

    const data: any = file.data;
    data.frontmatter = frontmatter;
};

// Wraps the text that follows a checkbox in a label so we can click on the text to change the checkbox state
const rehypeFormatCheckboxes: Plugin = () => (tree) =>
    visit(
        tree,
        {
            type: "element",
            tagName: "li",
        },
        (node: any) => {
            if (!node.properties?.className?.includes("task-list-item")) {
                return;
            }

            const [firstChildren, secondChildren] = node.children;
            let checkbox, children;

            if (
                firstChildren.type === "text" &&
                secondChildren.type === "element" &&
                secondChildren.tagName === "p"
            ) {
                // Sometimes we get the checkbox and text wrapped in a `<p>` tag
                [checkbox, ...children] = secondChildren.children;
            } else if (
                firstChildren.type === "element" &&
                firstChildren.tagName === "input"
            ) {
                // Sometimes we get the checkbox and text directly inside the .task-list-item
                [checkbox, ...children] = node.children;
            } else {
                console.warn("Found unknown DOM inside .tag-list-item", {
                    elements: node.children,
                });
                return;
            }

            const elementsToBeWrappedInLabel = children.filter(
                (child: any) => child.tagName !== "ul",
            );
            const subList = children.filter(
                (child: any) => child.tagName == "ul",
            );

            // If the checkbox doesn't have an id, generate one
            if (!checkbox.properties.id) {
                checkbox.properties.id = generateSlug(
                    elementsToBeWrappedInLabel
                        .map((text: any) => text.value)
                        .join(),
                );
            }

            // remark-gfm follows the Github default of creating all checkbox inputs as disabled
            checkbox.properties.disabled = false;

            node.children = [
                checkbox,
                {
                    type: "element",
                    tagName: "label",
                    properties: { for: checkbox.properties.id },
                    children: elementsToBeWrappedInLabel,
                },
                ...subList,
            ];
        },
    );

export class ChecklistService {
    private static instance: ChecklistService;

    private files: ChecklistFile[] = [];
    private checklists: Checklist[] = [];
    public checklistsDirectory = path.join(process.cwd(), "checklists");

    constructor(getChecklists = true) {
        if (getChecklists) {
            this.getChecklists(true);
        }
    }

    // Get singleton instance, so we can share the checklist data cache
    public static getInstance(getChecklists = true) {
        if (!ChecklistService.instance) {
            ChecklistService.instance = new ChecklistService(getChecklists);
        }

        return ChecklistService.instance;
    }

    public getChecklistData = (slug: string, lang = "en"): Checklist => {
        const allLangs = this.files.filter((file) => file.slug === slug);
        const availableLangs = allLangs.map(({ lang }) => lang);

        const file = allLangs.find((file) => file.lang === lang);

        if (!file) throw new Error(`Missing checklist: ${slug} -${lang}`);

        const fileContents = readFileSync(file.path, "utf8");

        // Use remark to convert markdown into HTML string
        const processedContent = unified()
            // Parses Markdown to hast tree
            .use(remarkParse)
            // remarkFrontmatter parses the front-matter, but does not make it available for after process
            .use(remarkFrontmatter)
            // remarkParseFrontmatter adds the front-matter data to file.data.frontmatter
            .use(remarkParseFrontmatter)
            // Github Markdown styles
            .use(remarkGfm)
            // From MarkDown to HTML
            .use(remarkRehype)
            // Adds ids to headers so we can easily link to them
            .use(rehypeSlug)
            // Adds syntax highlight to <code> blocks
            .use(rehypeHighlight)
            // Sanitizes HTML as our markdown is user input
            .use(rehypeSanitize)
            // Opens external links on new tabs, adds external link icon for accessibility
            .use(rehypeExternalLinks, {
                target: "_blank",
                rel: ["nofollow", "noopener", "noreferrer"],
                content: fromHtml(EXTERNAL_LINK_SVG) as any,
                contentProperties: {
                    class: "inline-block ml-1",
                    "aria-label": "Open in new tab",
                },
            })
            // Enables checkboxes and add ids - should always run after rehypeSanitize
            .use(rehypeFormatCheckboxes)
            // Serializes hast tree to HTML
            .use(rehypeStringify)
            .processSync(fileContents);

        const contentHtml = processedContent.toString();

        // Combine the data with the id and contentHtml
        return {
            slug,
            lang,
            contentHtml,
            availableLangs,
            frontmatter: processedContent.data.frontmatter as Record<
                string,
                string
            >,
        };
    };

    private getLocaleFromChecklistFilename = (filename: string) => {
        const CHECKLIST_FILE_NAME_PATTERN = /^checklist\.([a-z\-_]+)\.md$/;

        const match = filename.match(CHECKLIST_FILE_NAME_PATTERN);

        if (match) {
            return match[1];
        }

        return null;
    };

    private _getChecklistFiles = (): ChecklistFile[] => {
        const files = [];

        // Files should be on <checklist-slug>/checklist.<lang>.md
        const root = readdirSync(this.checklistsDirectory);
        for (const checklistFolder of root) {
            const folderPath = path.join(
                this.checklistsDirectory,
                checklistFolder,
            );
            const folderStat = statSync(folderPath);

            if (!folderStat.isDirectory()) {
                console.warn(
                    "Found file at the root of checklists - all checklists should be on folders",
                    { file: folderPath },
                );
                continue;
            }

            const checklistFiles = readdirSync(folderPath);
            for (const checklistFile of checklistFiles) {
                const checklistFilePath = path.join(folderPath, checklistFile);
                const checklistFileStat = statSync(checklistFilePath);

                // Skip other files
                if (checklistFileStat.isDirectory()) {
                    console.debug(
                        "Found folder inside a checklist folder - ignoring",
                        { folder: checklistFilePath },
                    );
                    continue;
                }

                // If we find a <checklist-name>/checklist.md, assume it's en
                if (checklistFile === "checklist.md") {
                    console.warn(
                        "Found checklist without lang suffix - will use en as default",
                        { file: checklistFilePath },
                    );
                    files.push({
                        slug: checklistFolder,
                        path: checklistFilePath,
                        lastModified: checklistFileStat.mtime,
                        lang: "en",
                    });
                    continue;
                }

                const lang = this.getLocaleFromChecklistFilename(checklistFile);

                if (!lang) {
                    console.debug(
                        "Found filename that does not match the expected checklist.<lang>.md - ignoring",
                        { file: checklistFilePath },
                    );
                    continue;
                }

                files.push({
                    slug: checklistFolder,
                    path: checklistFilePath,
                    lastModified: checklistFileStat.mtime,
                    lang,
                });
            }
        }

        return files;
    };

    // Quick and dirty cache
    public getChecklistFiles = (refresh = false) => {
        if (refresh || !this.files.length) {
            this.files = this._getChecklistFiles();
        }

        return this.files;
    };

    private _getChecklists = (refresh = false) => {
        const checklists: Checklist[] = [];
        const files = this.getChecklistFiles(refresh);

        for (const file of files) {
            checklists.push(this.getChecklistData(file.slug, file.lang));
        }

        return checklists;
    };

    // Quick and dirty cache
    public getChecklists = (refresh = false) => {
        if (refresh || !this.checklists.length) {
            this.checklists = this._getChecklists();
        }

        return this.checklists;
    };

    public getChecklistsGroupedByCategory = (lang: string) => {
        const checklists = this.getChecklists();

        // Groups categories in a object like { "Category Name": [ Checklist1, Checklist2 ]}
        return checklists.reduce(
            (grouped, checklist) => {
                if (checklist.lang !== lang) {
                    return grouped;
                }

                const category = checklist.frontmatter.category ?? NO_CATEGORY;

                if (!grouped[category]) {
                    grouped[category] = [];
                }

                grouped[category].push(checklist);

                return grouped;
            },
            {} as Record<string, Checklist[]>,
        );
    };

    public getAllChecklistLangs = () => {
        const checklists = this.getChecklists();

        const langs = checklists.map(({ lang }) => lang);
        const deduplicatedLangs = new Set(langs);

        return Array.from(deduplicatedLangs);
    };

    public getAllChecklistCategories = () => {
        const checklists = this.getChecklists();

        const categories = checklists.map(
            ({ frontmatter: { category } }) => category ?? NO_CATEGORY,
        );
        const deduplicatedCategories = Array.from(new Set(categories));
        const categorySlugs = deduplicatedCategories.map((category) =>
            generateSlug(category),
        );

        return categorySlugs;
    };

    public getChecklistsByCategory = (category: string) => {
        const checklists = this.getChecklists();

        if (category === NO_CATEGORY)
            return checklists.filter(
                ({ frontmatter: { category } }) => !category,
            );

        return this.getChecklists().filter(
            ({ frontmatter }) =>
                frontmatter.category &&
                generateSlug(frontmatter.category) === generateSlug(category),
        );
    };

    public getAllChecklistTags = () => {
        const checklists = this.getChecklists();

        const tags = checklists.flatMap(
            ({ frontmatter: { tags } }) => tags ?? [],
        );
        const deduplicatedTags = Array.from(new Set(tags));
        const tagSlugs = deduplicatedTags.map((tag) => generateSlug(tag));

        return tagSlugs;
    };

    public getChecklistsByTag = (tag: string) =>
        this.getChecklists().filter(
            ({ frontmatter: { tags } }) => tags?.includes(tag),
        );
}
