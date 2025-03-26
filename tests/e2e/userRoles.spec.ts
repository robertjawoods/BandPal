// tests/e2e/createBand.spec.ts
import { test, expect } from '@playwright/test';
import { login, createBand } from './helpers';

test.describe('User Roles', () => {
    test('adding roles with mouse', async ({ page }) => {
        await login(page);

        await page.click('text=Account');
        await page.click('text=Edit');

        const input = page.getByTestId("role-input"); 

        await input.fill("Bass");

        const suggestions = page.getByTestId("role-suggestions");

        expect(suggestions).not.toBeNull();

        await page.click('text=Bass');

        const roles = page.getByTestId("role-display");

        expect(roles).not.toBeNull();

        expect(await roles.textContent()).toContain("Bass");

    });

    test('adding roles with keyboard', async ({ page }) => {
        await login(page);

        await page.click('text=Account');
        await page.click('text=Edit');

        const input = page.getByTestId("role-input");

        await input.fill("Drums");

        await input.press("Enter");

        const roles = page.getByTestId("role-display");

        expect(roles).not.toBeNull();

        expect(await roles.textContent()).toContain("Drums");

    });

    // this should fail for now
    test.fail('navigating roles with keyboard and adding', async ({ page }) => {
        await login(page);

        await page.click('text=Account');
        await page.click('text=Edit');

        const input = page.getByTestId("role-input");

        await input.fill("Guitar");

        await input.press("ArrowDown");
        await input.press("Enter");

        const roles = page.getByTestId("role-display");

        expect(roles).not.toBeNull();

        expect(await roles.textContent()).toContain("Guitar");
    });
});
