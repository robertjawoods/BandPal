import { test, expect } from '@playwright/test';
import { addUserRole, login } from './helpers';
import { faker } from '@faker-js/faker';
import { EditUserPage } from './pages/editUserPage';


test.describe('Edit user', () => {
    test('editing user is successful', async ({ page }) => {
        const testName = `${faker.person.firstName()} ${faker.person.lastName()}`;
        const testBio = faker.lorem.paragraph();
        const testLocation = faker.location.city();

        await login(page);

        const userPage = new EditUserPage(page);

        await userPage.navigateToEditPage();


        await userPage.fillName(testName);
        await userPage.fillBio(testBio);
        await userPage.fillLocation(testLocation);

        await addUserRole({ page, role: 'bass' });

        await userPage.saveChanges();

        await page.waitForSelector('[data-testid="name"]');

        expect(await userPage.getName()).toHaveText(testName, { useInnerText: true });
        expect(await userPage.getBio()).toHaveText(testBio, { useInnerText: true });
        expect(await userPage.getLocation()).toHaveText(testLocation, { useInnerText: true });

        const roles = await userPage.getRoles();

        expect(roles).toHaveCount(1);
        expect(roles).toContainText('Bass', { useInnerText: true });
    });
});