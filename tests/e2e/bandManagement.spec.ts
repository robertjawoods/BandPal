// tests/e2e/createBand.spec.ts
import { test, expect } from '@playwright/test';
import { login, createBand } from './helpers';

test.describe('Band Management', () => {
  test('should create and delete a band', async ({ page }) => {
    let bandName: string;
    let bandUrl: string;

    await test.step('Login to the app', async () => {
      await login(page);
    });

    await test.step('Create a new band', async () => {
      const band = await createBand(page);
      bandName = band.name;
      bandUrl = band.url;

      const actualBandName = await page.textContent(`text=${bandName}`);
      expect(actualBandName).toBe(bandName);
    });

    await test.step('Delete the created band', async () => {
      await page.goto(bandUrl);

      await page.click('[data-testid="edit-button"]');
      
      await page.waitForURL(/\/band\/[0-9a-fA-F-]{36}\/edit$/);

      await page.click('[data-testid="delete-button"]');

      await page.waitForURL('/bands');

      const isBandStillVisible = await page.isVisible(`text=${bandName}`);
      expect(isBandStillVisible).toBeFalsy();
    });
  });
});
