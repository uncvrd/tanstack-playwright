import { expect, test } from "@playwright/test";

test.describe("Test suite", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should click on the table header", async ({ page }) => {
        await page.getByTestId("create-address-button").click();

        await expect(page.getByTestId("displayed-div")).toBeVisible();
    });
});
