import { CardList } from "@/components/cardList";
import { ChecklistService } from "@/services/checklist";

export function generateStaticParams() {
    const tags = ChecklistService.getInstance().getAllChecklistTags();

    return tags.map((tag) => ({ tag }));
}

const TagPage = ({ params: { tag } }: { params: { tag: string } }) => {
    const checklists = ChecklistService.getInstance().getChecklistsByTag(tag);

    return (
        <CardList
            listName={`Tag ${tag}`}
            checklists={checklists}
            oneRow={false}
        />
    );
};

export default TagPage;
