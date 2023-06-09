import { Checklist } from "../services/checklist";
import { Card } from "./card";

export interface CardListProps {
    listName: string;
    listNameLink?: string;
    checklists: Checklist[];
    oneRow?: boolean;
}

export const CardList = ({
    listName,
    listNameLink,
    checklists,
    oneRow = true,
}: CardListProps) => {
    const Checklists = checklists.map((checklist) => (
        <Card key={checklist.slug} checklist={checklist} />
    ));

    return (
        <div className="container">
            <a href={listNameLink}>
                <h2 className="my-8 text-3xl font-medium">{listName}</h2>
            </a>
            {/* TODO: See all */}

            <div
                className={`flex ${oneRow ? "overflow-x-scroll" : "flex-wrap"}`}
            >
                {Checklists}
            </div>
        </div>
    );
};
