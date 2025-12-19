import { test } from '../fixtures/auth';
import { expect } from '@playwright/test';
import { setPageZoom } from "../helpers/pageZoom";
import { getAssetCount } from '../helpers/db';

test('TC_LoginPage_0001', async ({ page }) => {

  // Already logged in by fixture — start directly on assets page

  // 1. Ensure page fully loaded
  await page.waitForLoadState('networkidle');

  //Zoomout the page
  await setPageZoom(page, 0.75);

  // 2. Compare DB vs UI
  const dbCount = await getAssetCount();
  const uiCount = await page.locator('clr-dg-row').count();

  console.log('DB count =', dbCount);
  console.log('UI count =', uiCount);

  expect(uiCount).toBe(dbCount);

  // 3. Screenshot after login
  await expect(page).toHaveScreenshot('TC_0004.png', {
    fullPage: true,
    animations: 'disabled',
  });
});
