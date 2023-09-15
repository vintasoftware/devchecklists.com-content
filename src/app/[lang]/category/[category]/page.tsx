import { CardList } from "@/components/cardList";
import { ChecklistService } from "@/services/checklist";

export function generateStaticParams() {
    const categories =
        ChecklistService.getInstance().getAllChecklistCategories();

    return categories.map((category) => ({ category }));
}

const CategoryPage = ({
    params: { category },
}: {
    params: { category: string };
}) => {
    const checklists =
        ChecklistService.getInstance().getChecklistsByCategory(category);

    return (
        <CardList
            listName={`Category ${category}`}
            checklists={checklists}
            oneRow={false}
        />
    );
};

export default CategoryPage;
