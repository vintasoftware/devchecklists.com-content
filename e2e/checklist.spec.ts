import { test, expect } from "@playwright/test";

test("Check a checkbox and ensure it's still checked after refreshing", async ({
    context,
    page,
}) => {
    // Go to Home
    await page.goto("/en");

    // Click on a checklist
    await page.getByRole("link", { name: "Web Quality Checklist" }).click();
    await expect(page).toHaveURL("/en/checklist/web-quality-checklist");

    // Click on a checkmark
    await page
        .getByLabel(
            "3. Each information-carrying image has an appropriate text alternative.",
        )
        .check();

    // Click on a checkmark label
    await page
        .getByText(
            "10. Captchas are accompanied by an alternative access solution.",
        )
        .check();

    // Click on a checkmark
    await page
        .getByLabel(
            "16. Navigation blocks are located in the same place in every page’s source code.",
        )
        .check();

    // Open new page
    const newPage = await context.newPage();
    await newPage.goto("/en/checklist/web-quality-checklist");

    // Check if checkmarks are checkmarked on new page
    await expect(
        newPage.getByLabel(
            "3. Each information-carrying image has an appropriate text alternative.",
        ),
    ).toBeChecked();
    await expect(
        newPage.getByText(
            "10. Captchas are accompanied by an alternative access solution.",
        ),
    ).toBeChecked();
    await expect(
        newPage.getByLabel(
            "16. Navigation blocks are located in the same place in every page’s source code.",
        ),
    ).toBeChecked();

    // Go to another language
    await page.getByText("Languages", { exact: true }).click();
    await page.getByRole("link", { name: "fr" }).click();

    // Click on a checkmark
    await page
        .getByLabel(
            "20. Le contenu et le sens de chaque page ne sont pas altérés lorsque les styles sont désactivés.",
        )
        .check();
    await page
        .getByText(
            "25. Le code source de chaque page ne contient pas d'éléments ou d'attributs de p",
        )
        .click();

    // Check if checkmark is checkmarked on new page
    await newPage.goto("/fr/checklist/web-quality-checklist");
    await expect(
        newPage.getByText(
            "25. Le code source de chaque page ne contient pas d'éléments ou d'attributs de p",
        ),
    ).toBeChecked();

    // Go back to english
    await page.getByText("Languages").click();
    await page.getByRole("link", { name: "en", exact: true }).click();

    // Check if checkmarks are still checkmarked
    await expect(
        page.getByLabel(
            "3. Each information-carrying image has an appropriate text alternative.",
        ),
    ).toBeChecked();
    await expect(
        page.getByText(
            "10. Captchas are accompanied by an alternative access solution.",
        ),
    ).toBeChecked();
    await expect(
        page.getByLabel(
            "16. Navigation blocks are located in the same place in every page’s source code.",
        ),
    ).toBeChecked();
});
