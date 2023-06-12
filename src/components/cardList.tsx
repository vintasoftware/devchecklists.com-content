import Link from "next/link";
import { Checklist } from "../services/checklist";
import { Card } from "./card";

export interface CardListProps {
    listName: string;
    listLink?: string;
    checklists: Checklist[];
    locale?: string;
    oneRow?: boolean;
}

export const CardList = ({
    listName,
    listLink = "",
    checklists,
    locale = "en",
    oneRow = true,
}: CardListProps) => {
    const Checklists = checklists.map((checklist) => (
        <Card key={checklist.slug} checklist={checklist} locale={locale} />
    ));

    return (
        <div className="container">
            <Link href={listLink}>
                <h2 className="my-8 text-3xl font-medium">{listName}</h2>
            </Link>

            <div
                className={`flex ${oneRow ? "overflow-x-scroll" : "flex-wrap"}`}
            >
                {Checklists}
            </div>
        </div>
    );
};
