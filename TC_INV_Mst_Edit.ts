import { test } from '../fixtures/auth';
import { setPageZoom } from "../helpers/pageZoom";
import { expect } from '@playwright/test';

test('TC_INV_Mst_Edit', async ({ page }) => { 

await page.goto('/assets', { waitUntil: 'networkidle' });
  //Set the viewport and zoom scale
await page.setViewportSize({
  width: 1920, // or higher depending on your layout
  height: 1080, // increase as needed
});
await page.evaluate(() => {
  document.body.style.zoom = '0.90';
});
await page.getByRole('gridcell', {
    name: "River Park Ped. B",
  }).click();
await expect(page).toHaveScreenshot('SS_1.png', {fullPage: true,animations: 'disabled',});

await page.locator('a.mat-tab-link', { hasText: 'Masters' }).click();
await page.mouse.click(10, 10);
await page.waitForLoadState();
// Click Actions

await page.locator('clr-dg-cell[role="gridcell"].datagrid-cell').nth(0).click();
await page.locator('mat-icon', { hasText: 'edit' }).click();
const frequency = page.locator('input[name="master.frequency"]');
await frequency.click();
await frequency.fill('210');
const saveButton = page
  .locator('button')
  .filter({ has: page.locator('mat-icon', { hasText: 'check' }) })
  .first();

await expect(saveButton).toBeVisible();
await expect(saveButton).toBeEnabled(); 
await saveButton.click();


await expect(page).toHaveScreenshot('SS_2.png', {fullPage: true,animations: 'disabled',});

await page.locator('button:has(mat-icon:has-text("arrow_back"))').click();
await page.mouse.click(10, 10);
await page.waitForLoadState();
 await page.screenshot({
    path:'./tests/TC_Mst_Edit.spec.ts-snapshots/SS-3.png',
    fullPage: true,
    animations: 'disabled',
  });





});

