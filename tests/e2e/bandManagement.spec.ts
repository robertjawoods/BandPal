// tests/e2e/createBand.spec.ts
import { test, expect } from '@playwright/test';
import { login, createBand } from './helpers';

test.describe('Band Management', () => {
  test('should create a new band', async ({ page }) => {
    await login(page);

    const { name: bandName } = await createBand(page);

    const actualBandName = await page.textContent('text=Test Band');
    expect(actualBandName).toBe(bandName);
  });

  test('should delete a band', async ({ page }) => {
    await login(page);

    const { name: bandName, url: bandUrl } = await createBand(page, 'Band To Delete');

    await page.goto(bandUrl);
  });
});
