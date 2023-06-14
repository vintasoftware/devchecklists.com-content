import { ChecklistService } from "@/services/checklist";
import HomePage from "../page";

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
