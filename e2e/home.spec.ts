import { test, expect } from "@playwright/test";

test("expect home to have a title", async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto("/");

    await expect(page).toHaveTitle(
        "DevChecklists | Always deliver your very best, always check"
    );
    await expect(page.locator("h1")).toContainText(
        "Always deliver your very best, always check"
    );

    await expect(
        page.getByRole("img", { name: "checklist board" })
    ).toBeVisible();
});

test("Navigate around the site", async ({ page }) => {
    // Go to Home
    await page.goto("/");

    // Click on a category page link
    await page.getByRole("link", { name: "Product Metrics" }).click();
    await expect(page).toHaveURL("/category/product-metrics");

    // Click on a checklist
    await page.getByRole("link", { name: "A/B Testing Checklist" }).click();
    await expect(page).toHaveURL("/checklist/ab-testing-checklist/en");

    // Click on the Header's logo to go back to Home
    await page.getByRole("link", { name: "Devchecklists logo" }).click();
    await expect(page).toHaveURL("/");

    // Click on a tag link
    await page.getByRole("link", { name: "good-practices" }).first().click();
    await expect(page).toHaveURL("/tag/good-practices");

    // Click on a checklist
    await page
        .getByRole("link", { name: "Design: Specs & Interaction" })
        .click();
    await expect(page).toHaveURL("/checklist/design-specs-interaction/en");
});

test("Click on an author link and go to github", async ({ page, context }) => {
    // Go to Home
    await page.goto("/");

    // Check if link opened on a new tab
    // https://playwright.dev/docs/pages#handling-new-pages
    const pagePromise = context.waitForEvent("page");

    // Click on fjsj name
    await page
        .getByRole("link", { name: "fjsj Flávio Juvenal da Silva Junior" })
        .first()
        .click();

    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    expect(newPage).toBeDefined();
    await expect(newPage).toHaveURL("https://github.com/fjsj/");
});

test("Authors without author_username should not be links", async ({
    page,
}) => {
    // Go to Home
    await page.goto("/");

    // Aline does not have a github username, so there should be no link with her name
    expect(
        await page.getByRole("link", { name: "Aline Silveira" }).count()
    ).toBe(0);
});

test("Click on Vinta's logo and go to Vinta homepage", async ({
    page,
    context,
}) => {
    // Go to Home
    await page.goto("/");

    // Check if link opened on a new tab
    // https://playwright.dev/docs/pages#handling-new-pages
    const pagePromise = context.waitForEvent("page");

    // Click on Vinta's logo on the footer
    await page.getByRole("link", { name: "Vinta Software Logo" }).click();

    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    expect(newPage).toBeDefined();
    await expect(newPage).toHaveURL("https://www.vintasoftware.com/");
});

test("Click on Collaborate button and go to collaborate.md on github", async ({
    page,
    context,
}) => {
    // Go to Home
    await page.goto("/");

    // Check if link opened on a new tab
    // https://playwright.dev/docs/pages#handling-new-pages
    const pagePromise = context.waitForEvent("page");

    // Click on Collaborate button on the header
    await page.getByRole("link", { name: "+ Collaborate" }).click();

    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    expect(newPage).toBeDefined();
    await expect(newPage).toHaveURL(
        "https://github.com/vintasoftware/devchecklists.com-content/blob/main/COLLABORATE.md"
    );
});
