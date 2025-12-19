import { test } from '../fixtures/auth';
import { setPageZoom } from "../helpers/pageZoom";
import { expect } from '@playwright/test';

test('TC_Ast_List_Ftr_0025', async ({ page }) => { 

//Zoomout the page
    //await setPageZoom(page, 0.75);

// got to assets url
await page.goto('/assets', { waitUntil: 'networkidle' });
//Zoomout the page
await setPageZoom(page, 0.75);

//open the filter
const filterPanel = page.locator('[role="dialog"], .clr-popover-content, .datagrid-filter');
  await page.getByRole('columnheader', { name: /Site Number/i })
  .locator('.datagrid-filter-toggle')
  .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
    //click screenshot
    await expect(page).toHaveScreenshot('TC_0025.png', {
        fullPage: true,
        animations: 'disabled'
    });

    //Click filter icon and search the number
    const filterInputSite = page.locator('input[name="userFilter.number"]');
    // input the value
    await filterInputSite.fill('381');
    // click on search button
    const searchButton = page.locator('button:has(clr-icon[shape="search"])');
    await searchButton.click();
    await page.waitForLoadState('networkidle');

    // 5. Ensure grid is visible
    const firstRow = page.locator('clr-dg-row').first();
    await firstRow.waitFor({ state: 'visible' });
    
    // click the screenshot
    await expect(page).toHaveScreenshot('TC_0026_a.png', {
        fullPage: true,
        animations: 'disabled'
    });

    // click the filter again

    await page.getByRole('columnheader', { name: /Site Number/i })
  .locator('.datagrid-filter-toggle')
  .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
    // click the reset button
    const resetButton = page.locator('button:has-text("Reset")');

await resetButton.click();
// compare final screenshot after the reset
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');

//Check the Empty Values
await page.getByRole('columnheader', { name: /Site Number/i })
  .locator('.datagrid-filter-toggle')
  .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
const emptyValuesCheckbox = page.locator('label:has-text("Empty values")');
await emptyValuesCheckbox.click();
await searchButton.click();
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('TC_0026_b.png', {
        fullPage: true,
        animations: 'disabled'
    });
await page.getByRole('columnheader', { name: /Site Number/i })
  .locator('.datagrid-filter-toggle')
  .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
await resetButton.click();
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');


});