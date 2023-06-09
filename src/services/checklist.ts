import path from "path";
import { unified, Plugin } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import rehypeSlug from "rehype-slug";
import find from "unist-util-find";
import { visit } from "unist-util-visit";
import { parse } from "yaml";
import { generateSlug } from "@/app/utils";

const NO_CATEGORY = "No Category";

export interface FrontMatter {
    author_username: string;
    author_name: string;
    category: string;
    color: string;
    description: string;
    github_repository: string;
    labels: string[];
    slug: string;
    title: string;
}

interface ChecklistFile {
    slug: string;
    path: string;
    locale: string;
}

export interface Checklist {
    slug: string;
    locale: string;
    availableLocales: string[];
    contentHtml: string;
    frontmatter: Partial<FrontMatter>;
}

// Based on https://github.com/phuctm97/remark-parse-frontmatter
// Adds frontmatter metadata to file.data.frontmatter so we can pass it on
export const remarkParseFrontmatter: Plugin = () => (tree, file) => {
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

// From https://github.com/remarkjs/remark-gfm/issues/41#issuecomment-1267369148
// remark-gfm follows the Github default of creating all checkbox inputs as disabled
// This plugin enables all checkboxes
export const rehypeEnableCheckboxes: Plugin = () => (tree) =>
    visit(
        tree,
        {
            type: "element",
            tagName: "input",
        },
        (node: any) => {
            if (
                node.properties &&
                node.properties.type === "checkbox" &&
                node.properties.disabled
            ) {
                node.properties.disabled = false;
            }
        }
    );

// Wraps the text that follows a checkbox in a label so we can click on the text to change the checkbox state
const rehypeWrapCheckItemInLabel: Plugin = () => (tree) =>
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

            const [checkbox, ...children] = node.children;
            if (checkbox.type !== "element") {
                return;
            }

            const textChildren = children.filter(
                (child: any) => child.tagName !== "ul"
            );
            const subList = children.filter(
                (child: any) => child.tagName == "ul"
            );

            if (!checkbox.properties.id) {
                checkbox.properties.id = generateSlug(
                    textChildren.map((text: any) => text.value).join()
                );
            }

            node.children = [
                checkbox,
                {
                    type: "element",
                    tagName: "label",
                    properties: { for: checkbox.properties.id },
                    children: textChildren,
                },
                ...subList,
            ];
        }
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

    public getChecklistData = (
        slug: string,
        locale: string = "en"
    ): Checklist => {
        const allLocales = this.files.filter((file) => file.slug === slug);
        const availableLocales = allLocales.map(({ locale }) => locale);

        const file = allLocales.find((file) => file.locale === locale);

        if (!file) throw new Error(`Missing checklist: ${slug} -${locale}`);

        const fileContents = readFileSync(file.path, "utf8");

        // Use remark to convert markdown into HTML string
        const processedContent = unified()
            .use(remarkParse)
            .use(remarkFrontmatter)
            .use(remarkParseFrontmatter)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeEnableCheckboxes)
            .use(rehypeWrapCheckItemInLabel)
            .use(rehypeSlug)
            .use(rehypeStringify)
            .processSync(fileContents);

        const contentHtml = processedContent.toString();

        // Combine the data with the id and contentHtml
        return {
            slug,
            locale,
            contentHtml,
            availableLocales,
            frontmatter: processedContent.data.frontmatter as Record<
                string,
                string
            >,
        };
    };

    formatChecklist = (checklist: Checklist) => {};

    private _getChecklistFiles = (): ChecklistFile[] => {
        const files = [];

        // Files should be on <checklist-name>/<language>/checklist.md
        const root = readdirSync(this.checklistsDirectory);
        for (const folder of root) {
            const folderPath = path.join(this.checklistsDirectory, folder);
            const folderStat = statSync(folderPath);
            if (!folderStat.isDirectory()) {
                console.warn(
                    "Found non-directory at the root of checklists - all checklists should be on folders",
                    { file: folderPath }
                );
                continue;
            }

            const locales = readdirSync(folderPath);
            for (const locale of locales) {
                const localePath = path.join(folderPath, locale);
                const localeStat = statSync(localePath);

                // If we find a <checklist-name>/checklist.md, assume it's en
                if (locale === "checklist.md") {
                    console.warn(
                        "Found non-directory inside a checklists folder instead of a locale - will use en as default",
                        { file: localePath }
                    );
                    files.push({
                        slug: folder,
                        path: localePath,
                        locale: "en",
                    });
                }

                // Skip other files
                if (!localeStat.isDirectory()) {
                    continue;
                }

                const file = path.join(localePath, "checklist.md");
                if (existsSync(file)) {
                    files.push({ slug: folder, path: file, locale });
                } else {
                    console.warn("Found locale folder without checklist file", {
                        folder: localePath,
                    });
                }
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
            checklists.push(this.getChecklistData(file.slug, file.locale));
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

    public getChecklistsGroupedByCategory = () => {
        const checklists = this.getChecklists();

        // Groups categories in a object like { "Category Name": [ Checklist1, Checklist2 ]}
        return checklists.reduce((grouped, checklist) => {
            const category = checklist.frontmatter.category ?? NO_CATEGORY;

            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(checklist);

            return grouped;
        }, {} as Record<string, Checklist[]>);
    };

    public getAllChecklistLanguages = () => {
        const checklists = this.getChecklists();

        const locales = checklists.map(({ locale }) => locale);
        const deduplicatedLocales = new Set(locales);

        return Array.from(deduplicatedLocales);
    };

    public getAllChecklistCategories = () => {
        const checklists = this.getChecklists();

        const categories = checklists.map(
            ({ frontmatter: { category } }) => category ?? NO_CATEGORY
        );
        const deduplicatedCategories = Array.from(new Set(categories));
        const categorySlugs = deduplicatedCategories.map((category) =>
            generateSlug(category)
        );

        return categorySlugs;
    };

    public getChecklistsByCategory = (category: string) => {
        const checklists = this.getChecklists();

        if (category === NO_CATEGORY)
            return checklists.filter(
                ({ frontmatter: { category } }) => !category
            );

        return this.getChecklists().filter(
            ({ frontmatter }) =>
                frontmatter.category &&
                generateSlug(frontmatter.category) === generateSlug(category)
        );
    };

    public getAllChecklistTags = () => {
        const checklists = this.getChecklists();

        const tags = checklists.flatMap(
            ({ frontmatter: { labels } }) => labels ?? []
        );
        const deduplicatedTags = Array.from(new Set(tags));
        const tagSlugs = deduplicatedTags.map((tag) => generateSlug(tag));

        return tagSlugs;
    };

    public getChecklistsByTag = (tag: string) =>
        this.getChecklists().filter(({ frontmatter: { labels } }) =>
            labels?.includes(tag)
        );
}
