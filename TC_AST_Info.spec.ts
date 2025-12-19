import { expect } from '@playwright/test';
import { test } from '../fixtures/auth';
import { setPageZoom } from "../helpers/pageZoom";

test('TC_Ast_Info', async ({ page }) => {
  // Already logged in by fixture — start directly on assets page

  // Ensure page fully loaded
  await page.goto('/assets', { waitUntil: 'networkidle' });
  
  // Zoom out the page
  await setPageZoom(page, 0.75);

  // Click the desired grid cell
  await page.getByRole('gridcell', {
    name: "Prince's Island/Bow River",
  }).click();

  await expect(page).toHaveScreenshot('SS_1.png', {
    fullPage: true,
    animations: 'disabled',
  });

  // Expand all sections
  const expandBtn = page.getByRole('button', { name: 'Expand all' });
  //await expandBtn.scrollIntoViewIfNeeded();
  await expandBtn.click();
  await page.waitForTimeout(300); // wait for animations/rendering
  const selector2 =  page.locator('div.chapter', {hasText: 'Bridge Chapter 2',});
  await selector2.scrollIntoViewIfNeeded();

  // Full-page screenshot after expanding
  await expect(page).toHaveScreenshot('SS_2.png', {
    fullPage: true,
    animations: 'disabled',
  });

});
