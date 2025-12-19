import { test } from '../fixtures/auth';
import { setPageZoom } from "../helpers/pageZoom";
import { expect } from '@playwright/test';

test('TC_Ast_Elmt', async ({ page }) => { 

await page.goto('/assets', { waitUntil: 'networkidle' });
  // Zoom out the page
await setPageZoom(page, 0.75);
await page.getByRole('gridcell', {
    name: "Prince's Island/Bow River",
  }).click();
await expect(page).toHaveScreenshot('SS_1.png', {fullPage: true,animations: 'disabled',});

await page.locator('a.mat-tab-link', { hasText: 'Element / Spans' }).click();

// Expand Joints
await page
  .locator('div.p-treenode-content', { hasText: 'Joints' })
  .locator('button.p-tree-toggler')
  .click();

// Click Concrete End Dams
await page
  .locator('span.mat-tooltip-trigger', { hasText: 'Concrete End Dams' })
  .click();
  await page.mouse.click(10, 10);

  await page.waitForLoadState();
await expect(page).toHaveScreenshot('SS_2.png', {fullPage: true,animations: 'disabled',});
// scroll to the bottom of the page
const yearOfRehabInput = page.locator(
  'input[aria-describedby="Year of Rehab"]'
);
await yearOfRehabInput.scrollIntoViewIfNeeded();
await expect(page).toHaveScreenshot('SS_3.png', {fullPage: true,animations: 'disabled',});

});