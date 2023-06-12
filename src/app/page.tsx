import Image from "next/image";
import { ChecklistService } from "../services/checklist";
import ChecklistBoard from "@/images/checklist-board.png";
import { CardList } from "../components/cardList";
import { generateSlug } from "./utils";

const HomePage = () => {
    const checklistService = ChecklistService.getInstance();

    const checklists = checklistService.getChecklistsGroupedByCategory();

    const Categories = Object.entries(checklists).map(
        ([categoryName, checklists]) => (
            <CardList
                key={categoryName}
                listName={categoryName}
                listLink={`/category/${generateSlug(categoryName)}`}
                checklists={checklists}
            />
        )
    );

    return (
        <>
            <div className="flex justify-between items-center my-28">
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
                <Image src={ChecklistBoard} alt="checklist board" />
            </div>

            {Categories}
        </>
    );
};

export default HomePage;
