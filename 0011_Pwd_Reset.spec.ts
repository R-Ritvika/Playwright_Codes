import { test } from '../fixtures/auth';
import { expect } from '@playwright/test';
import { setPageZoom } from "../helpers/pageZoom";
import { getAssetCount } from '../helpers/db';

test('TC_Reset_Pwd_0002', async ({ page }) => {

  // Already logged in by fixture — start directly on assets page

  // 1. Ensure page fully loaded
  await page.waitForLoadState('networkidle');

  //Zoomout the page
  await setPageZoom(page, 0.75);

 

  await page.locator('button.mat-menu-trigger:has(mat-icon:text("person"))').click();  
  await page.getByRole('menuitem', { name: /log out/i }).click();
  await expect(page).toHaveURL('https://autotest.sixense-test.co/login');
  await page.waitForLoadState('networkidle');
  
  await page.getByText("This is my first connection or I've lost my password", { exact: true })
  .click({ force: true });

  
  await page.waitForLoadState('networkidle');
await page.getByRole('textbox', { name: 'Email' }).fill('test123@example.com');
await expect(page).toHaveScreenshot('TC_0002_a.png', {
    fullPage: true,
    animations: 'disabled',
  });
await page.getByRole('button', { name: 'Send' }).click();
await expect(page.getByText(
  "If the email you specified exists in our system, we've sent a reset link to it."
)).toBeVisible();
await expect(page).toHaveScreenshot('TC_0002_b.png', {
    fullPage: true,
    animations: 'disabled',
  });


});
