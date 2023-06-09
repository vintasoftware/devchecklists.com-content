"use client";

import { useLayoutEffect } from "react";

function updateCheckboxUI(checkbox: HTMLInputElement) {
    if (checkbox.checked) {
        checkbox.parentElement!.classList.add("line-through");
    } else {
        checkbox.parentElement!.classList.remove("line-through");
    }
}

function getStorageKey() {
    return "devChecklists" + location.pathname;
}

// Retrieve checkbox state from local storage
function getCheckboxStateFromLocalStorage() {
    const state = localStorage.getItem(getStorageKey());
    return state ? JSON.parse(state) : {};
}

function updateCheckboxStateFromLocalStorage() {
    const localStorageState = getCheckboxStateFromLocalStorage();

    const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
        "input[type=checkbox]"
    );

    checkboxes.forEach((checkbox) => {
        const checkboxId = checkbox.id;
        if (localStorageState[checkboxId]) {
            checkbox.checked = localStorageState[checkboxId];
            updateCheckboxUI(checkbox);
        }
    });
}

// Save checkbox state to local storage
function saveCheckboxState(checkboxId: string, checkboxState: boolean) {
    const localStorageState = getCheckboxStateFromLocalStorage();
    localStorageState[checkboxId] = checkboxState;

    localStorage.setItem(getStorageKey(), JSON.stringify(localStorageState));
}

// Event listener for checkbox changes
function handleCheckboxChange(event: Event) {
    console.log("handleCheckboxChange");
    const checkbox = event.target! as HTMLInputElement;
    const checkboxId = checkbox.id;
    const checkboxState = checkbox.checked;
    saveCheckboxState(checkboxId, checkboxState);

    // If a checkbox with a sublist is checked,
    // check/uncheck all items in the sublist
    const sublist = checkbox.parentElement!.querySelector(
        "ul.contains-task-list"
    );
    if (sublist) {
        const sublistCheckboxes: NodeListOf<HTMLInputElement> =
            sublist.querySelectorAll("li > input[type=checkbox]");

        sublistCheckboxes.forEach((subCheckbox) => {
            subCheckbox.checked = checkboxState;
            saveCheckboxState(subCheckbox.id, checkboxState);
        });
    }

    updateCheckboxUI(checkbox);
}

// Attach event listeners to checkboxes
function attachCheckboxListeners() {
    const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
        "input[type=checkbox]"
    );

    console.log({ checkboxes });

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", handleCheckboxChange);
    });
}

export const Checklist = ({ checklistHTML }: { checklistHTML: string }) => {
    useLayoutEffect(() => {
        updateCheckboxStateFromLocalStorage();
        attachCheckboxListeners();
    }, []);

    return <div dangerouslySetInnerHTML={{ __html: checklistHTML }} />;
};
