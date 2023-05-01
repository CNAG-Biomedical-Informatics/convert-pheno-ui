import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('./home');
  expect(await page.innerText('h4')).toBe('Welcome to Convert-Pheno');
});