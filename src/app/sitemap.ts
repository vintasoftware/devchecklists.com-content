import { MetadataRoute } from "next";
import { ChecklistService } from "@/services/checklist";

export default function sitemap(): MetadataRoute.Sitemap {
    const checklistPaths = ChecklistService.getInstance().getChecklistFiles();

    return checklistPaths.map(({ slug, lang, lastModified }) => ({
        url: `https://devchecklists.com/${lang}/checklist/${slug}`,
        lastModified,
    }));
}
