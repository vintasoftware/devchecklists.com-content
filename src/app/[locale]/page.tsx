import HomePage from "../page";
import { ChecklistService } from "@/services/checklist";

export function generateStaticParams() {
    const locales = ChecklistService.getInstance().getAllChecklistLocales();

    return locales.map((locale) => ({ locale }));
}

const LocalizedHomePage = ({
    params: { locale },
}: {
    params: { locale: string };
}) => <HomePage locale={locale} />;

export default LocalizedHomePage;
