// tests/e2e/userRoles.spec.ts
import { test, expect, Page } from '@playwright/test';
import { addUserRole, login } from './helpers';

test.describe('User Roles', () => {
    test('adding roles with mouse', async ({ page }) => {
        await login(page);

        await page.click('text=Account');
        await page.click('text=Edit');

        await addUserRole({ page });

        const roles = page.getByTestId("role-display");

        expect(roles).not.toBeNull();

        expect(await roles.textContent()).toContain("Bass");

    });

    test('adding roles with keyboard', async ({ page }) => {
        await login(page);

        await page.click('text=Account');
        await page.click('text=Edit');

        await addUserRole({ page });

        const roles = page.getByTestId("role-display");

        expect(roles).not.toBeNull();

        expect(await roles.textContent()).toContain("Bass");

    });

    test.fixme('navigating roles with keyboard and adding', async ({ page }) => {
        await login(page);

        await page.click('text=Account');
        await page.click('text=Edit');

        const input = page.getByTestId("role-input");

        await input.fill("g");

        await input.press("ArrowDown");
        await input.press("Enter");

        const roles = page.getByTestId("role-display");

        expect(roles).not.toBeNull();

        expect(await roles.textContent()).toContain("Guitar");
    });

    test('removing roles', async ({ page }) => {
        await login(page);

        await page.click('text=Account');
        await page.click('text=Edit');

        await addUserRole({ page });

        const roles = page.getByTestId("role-display");

        expect(roles).not.toBeNull();

        console.log(await roles.textContent());

        const removeButton = page.getByTestId("bass guitar-role-remove");

        await removeButton.click();

        expect(await roles.textContent()).not.toContain("Bass");
    });
});

