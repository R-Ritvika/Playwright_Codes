import { test } from '../fixtures/auth';
import { expect } from '@playwright/test';
import { setPageZoom } from "../helpers/pageZoom";
import { getAssetCount } from '../helpers/db';

test('TC_Logout_0003', async ({ page }) => {

  // Already logged in by fixture — start directly on assets page

  // 1. Ensure page fully loaded
  await page.waitForLoadState('networkidle');

  //Zoomout the page
  await setPageZoom(page, 0.75);

  // 3. Screenshot after login
  await expect(page).toHaveScreenshot('TC_0004.png', {
    fullPage: true,
    animations: 'disabled',
  });

  await page.locator('button.mat-menu-trigger:has(mat-icon:text("person"))').click();

  //await page.getByRole('button', { name: /person.*keyboard_arrow_down/i }).click();
  await expect(page).toHaveScreenshot('TC_0003_a.png', {
        fullPage: true,
        animations: 'disabled'
    });
  await page.getByRole('menuitem', { name: /log out/i }).click();
  await expect(page).toHaveURL('https://autotest.sixense-test.co/login');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('TC_0003_b.png', {
        fullPage: true,
        animations: 'disabled'
    });

});
