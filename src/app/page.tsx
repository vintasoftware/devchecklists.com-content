import Image from "next/image";
import { ChecklistService } from "../services/checklist";
import ChecklistBoard from "@/images/checklist-board.png";
import { CardList } from "../components/cardList";
import { generateSlug } from "./utils";
import { LocalesDropdown } from "@/components/localeDropdown";

const HomePage = ({ locale = "en" }: { locale: string }) => {
    const checklistService = ChecklistService.getInstance();

    const checklists =
        ChecklistService.getInstance().getChecklistsGroupedByCategory(locale);
    const allAvailableLocales = checklistService.getAllChecklistLocales();

    const Categories = Object.entries(checklists).map(
        ([categoryName, checklists]) => (
            <CardList
                key={categoryName}
                listName={categoryName}
                listLink={`/category/${generateSlug(categoryName)}`}
                checklists={checklists}
                locale={locale}
            />
        )
    );

    return (
        <div className="flex flex-col">
            <div className="ml-auto">
                <LocalesDropdown availableLocales={allAvailableLocales} />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center my-28">
                <div className="max-w-xl">
                    <h1 className="text-4xl font-mono">
                        Always deliver your very best,{" "}
                        <span className="text-green">always check</span>
                    </h1>
                    <h5 className="max-w-md mt-12">
                        We created this{" "}
                        <span className="text-green">
                            collaborative space for sharing checklists
                        </span>{" "}
                        that help ensure software quality, guide you through
                        crisis and other helpful stuff for devs{" "}
                        <span className="text-green">;-)</span>
                    </h5>
                </div>
                <Image
                    src={ChecklistBoard}
                    alt="checklist board"
                    priority={true}
                />
            </div>

            {Categories}
        </div>
    );
};

export default HomePage;
