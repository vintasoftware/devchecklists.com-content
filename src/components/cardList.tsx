import Link from "next/link";
import { Card } from "./card";
import { Checklist } from "@/services/checklist";

export interface CardListProps {
    listName: string;
    listLink?: string;
    checklists: Checklist[];
    lang?: string;
    oneRow?: boolean;
}

export const CardList = ({
    listName,
    listLink = "",
    checklists,
    lang = "en",
    oneRow = true,
}: CardListProps) => {
    const Checklists = checklists.map((checklist) => (
        <Card key={checklist.slug} checklist={checklist} lang={lang} />
    ));

    return (
        <div className="container">
            <Link href={listLink}>
                <h2 className="my-8 p-4 text-3xl font-medium md:p-0">
                    {listName}
                </h2>
            </Link>

            <div
                className={`flex ${oneRow ? "overflow-x-scroll" : "flex-wrap"}`}
            >
                {Checklists}
            </div>
        </div>
    );
};
