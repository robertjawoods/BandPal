import { Page, } from '@playwright/test';

export async function login(page: Page, username: string = 'test@example.com', password: string = 'password') {
  await page.goto('/login');
  await page.fill('input[name="email"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('text=Log in');
  await page.waitForURL('http://localhost:3000/');
}

export async function createBand(page: Page, namePrefix = 'Test Band') {
  const bandName = `${namePrefix} ${Date.now()}`;
  await page.goto('/band/create');
  await page.fill('input[name="name"]', bandName);
  await page.click('text=Create');
  await page.waitForURL(/\/band\/[0-9a-fA-F-]{36}$/);
  return {
    name: bandName,
    url: page.url(),
  };
}