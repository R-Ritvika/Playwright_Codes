import { test } from '../fixtures/auth';
import { setPageZoom } from "../helpers/pageZoom";
import { expect } from '@playwright/test';

test('TC_Ast_Flag', async ({ page }) => { 
await page.goto('/assets', { waitUntil: 'networkidle' });
  // Zoom out the page
await setPageZoom(page, 0.75);
await page.getByRole('gridcell', {
    name: "Prince's Island/Bow River",
  }).click();
// Click the Masters
await page.locator('a.mat-tab-link', { hasText: 'Flags' }).click();
// Click somewhere outside
await page.mouse.click(10, 10);
await page.waitForLoadState();
// Click the screenshot
await expect(page).toHaveScreenshot('SS.png', {fullPage: true,animations: 'disabled',});

});