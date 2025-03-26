// tests/e2e/createBand.spec.ts
import { test, expect } from '@playwright/test';
import { login, createBand } from './helpers';

test.describe('Band Management', () => {
  test.fixme('should create a new band', async ({ page }) => {
    await login(page);

    const { name: bandName } = await createBand(page);

    const actualBandName = await page.textContent('text=Test Band');
    expect(actualBandName).toBe(bandName);
  });

  test.fixme('should delete a band', async ({ page }) => {
    await login(page);

    const { name: bandName, url: bandUrl } = await createBand(page, 'Band To Delete');

    await page.goto(bandUrl);
  });
});
