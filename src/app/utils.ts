import type { Checklist } from "@/services/checklist";

export const NO_CATEGORY = "No Category";

export const normalizeString = (text: string) =>
    text
        .normalize("NFD") // Normalize Unicode characters to separate diacritics
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
        .toLowerCase() // Convert to lowercase
        .replace(/[^\p{L}\p{N}\s-]/gu, ""); // Remove non-letter, non-number, non-space, non-dash characters

export const generateSlug = (text: string) =>
    normalizeString(text.substring(0, 200)) // Limit to 200 chars
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .trim(); // Remove leading/trailing spaces

/**
 * Groups categories in a object like { "Category Name": [ Checklist1, Checklist2 ]}
 * @param checklists
 * @param filter Optional filter method that will be applied on the same way as Array.filter
 * @param limit The maximum number of items to show in a category
 * @returns
 */
export const groupChecklistsByCategory = (
    checklists: Checklist[],
    filter?: (checklist: Checklist) => boolean,
    limit = 10
) => {
    console.log("group");
    return checklists.reduce((grouped, checklist) => {
        if (filter && !filter(checklist)) {
            return grouped;
        }

        const category = checklist.frontmatter.category ?? NO_CATEGORY;

        if (!grouped[category]) {
            grouped[category] = [];
        }

        // Limit the number of items inside a category
        if (grouped[category].length <= limit) {
            grouped[category].push(checklist);
        }

        return grouped;
    }, {} as Record<string, Checklist[]>);
};

/**
 * A debounce function from https://stackoverflow.com/a/54265129
 * @param f The function to be debounced
 * @param interval The debounce interval in milisseconds
 * @returns A promise that will be resolved when the debounce period expired
 */
export function debounce<Args extends unknown[], Result = unknown>(
    f: (...args: Args) => Result,
    interval = 500
): (...args: Args) => Promise<Result> {
    let timer: string | NodeJS.Timeout | null = null;

    return (...args: Args) => {
        if (timer) {
            clearTimeout(timer);
        }
        return new Promise((resolve) => {
            timer = setTimeout(() => resolve(f(...args)), interval);
        });
    };
}
