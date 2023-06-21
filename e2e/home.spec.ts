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
