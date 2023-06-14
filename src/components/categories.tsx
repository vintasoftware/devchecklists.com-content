"use client";

import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
    debounce,
    generateSlug,
    groupChecklistsByCategory,
    normalizeString,
} from "../app/utils";
import { CardList } from "./cardList";
import { Checklist } from "@/services/checklist";

const debouncedGroupChecklistsByCategory = debounce(groupChecklistsByCategory);

export const Categories = ({
    checklists,
    locale,
}: {
    checklists: Checklist[];
    locale: string;
}) => {
    const [searchInputValue, setSearchInputValue] = useState("");
    const normalizedSearchInput = normalizeString(searchInputValue);

    const [checklistsGroupedByCategory, setChecklistsGroupedByCategory] =
        useState(
            groupChecklistsByCategory(
                checklists,
                (checklist) => checklist.locale === locale
            )
        );

    useEffect(() => {
        const checklistFilter = ({
            locale: checklistLocale,
            slug,
            frontmatter: { title, description, author_name, author_username },
        }: Checklist): boolean => {
            if (checklistLocale !== locale) return false;

            const includes = (target?: string) =>
                !!target &&
                normalizeString(target).includes(normalizedSearchInput);

            if (normalizedSearchInput) {
                return (
                    includes(slug) ||
                    includes(title) ||
                    includes(description) ||
                    includes(author_name) ||
                    includes(author_username)
                );
            }

            return true;
        };

        async function updateChecklists() {
            setChecklistsGroupedByCategory(
                await debouncedGroupChecklistsByCategory(
                    checklists,
                    checklistFilter
                )
            );
        }

        updateChecklists();
    }, [locale, checklists, normalizedSearchInput]);

    const Lists = Object.entries(checklistsGroupedByCategory).map(
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
        <div>
            <label
                htmlFor="home-page-search"
                className="mb-2 flex items-center text-xl font-bold"
            >
                <MagnifyingGlassIcon
                    width="1.5em"
                    className="mr-1"
                    title="Search Icon"
                />
                Search
            </label>
            <input
                id="home-page-search"
                type="search"
                value={searchInputValue}
                onChange={(event) => setSearchInputValue(event.target.value)}
                className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            />
            {Lists}
        </div>
    );
};
