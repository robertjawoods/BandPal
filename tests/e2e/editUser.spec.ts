// tests/e2e/userRoles.spec.ts
import { test, expect, Page } from '@playwright/test';
import { addUserRole, login } from './helpers';

import { faker } from '@faker-js/faker';

test.describe('Edit user', () => {
    test('editing user is successful', async ({ page }) => {
        const testName = `${faker.person.firstName()} ${faker.person.lastName()}`;
        const testBio = faker.lorem.paragraph();
        const testLocation = faker.location.city();

        await login(page);

        await page.click('text=Account');
        await page.click('text=Edit');

        await page.waitForURL(/\/user\/edit\/[0-9a-fA-F-]{36}$/);

        await page.fill('input[name="name"]', testName);
        await page.fill('textarea[name="bio"]', testBio);
        await page.fill('input[name="location"]', testLocation);

        await addUserRole({ page, role: 'bass' });

        await page.click('text=Save');

        await page.waitForURL(/\/user\/[0-9a-fA-F-]{36}$/);

        await page.waitForSelector('[data-testid="name"]');

        expect(page.getByTestId('name')).toHaveText(testName, { useInnerText: true });
        expect(page.getByTestId('bio')).toHaveText(testBio, { useInnerText: true });
        expect(page.getByTestId('location')).toHaveText(testLocation, { useInnerText: true });

        const roles = page.getByTestId('roles');

        expect(roles).toHaveCount(1);

        expect(roles).toContainText('Bass', { useInnerText: true });
    });
});

