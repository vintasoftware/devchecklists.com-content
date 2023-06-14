import Image from "next/image";
import { generateSlug } from "./utils";
import { ChecklistService } from "@/services/checklist";
import { CardList } from "@/components/cardList";
import ChecklistBoard from "@/images/checklist-board.png";
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
            <div className="my-28 flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="m-4 max-w-xl md:m-0">
                    <h1 className="font-mono text-4xl">
                        Always deliver your very best,{" "}
                        <span className="text-green">always check</span>
                    </h1>
                    <h5 className="mt-12 max-w-md">
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

            <div className="m-4 md:m-0">{Categories}</div>
        </div>
    );
};

export default HomePage;
