// Redirect to new URLS
// From /checklist/<checklist_slug>/<locale>.html to <lang>/checklist/<checklist_slug>.html

import { redirect } from "next/navigation";
import { ChecklistService } from "@/services/checklist";

// Generate all static paths that lead to checklists
export const generateStaticParams = () => {
    const checklistPaths = ChecklistService.getInstance().getChecklistFiles();

    return checklistPaths.map(({ slug, lang }) => ({
        checklist_slug: slug,
        locale: lang,
    }));
};

export default function Redirect({
    params: { locale, checklist_slug },
}: {
    params: { locale: string; checklist_slug: string };
}) {
    redirect(`/${locale}/checklist/${checklist_slug}`);
}
