import { test } from '../fixtures/auth';
import { setPageZoom } from "../helpers/pageZoom";
import { expect } from '@playwright/test';

test('TC_Ast_List_Ftr_0020', async ({ page }) => { 

// got to assets url
await page.goto('/assets', { waitUntil: 'networkidle' });

await setPageZoom(page, 0.75);

//open the filter
const filterPanel = page.locator('[role="dialog"], .clr-popover-content, .datagrid-filter');
  await page.getByRole('columnheader', { name: /Previous Inspection Date/i })
  .locator('.datagrid-filter-toggle')
  .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
    //click screenshot
    await expect(page).toHaveScreenshot('TC_0020.png', {
        fullPage: true,
        animations: 'disabled'
    });
//Check the empty values
const emptyValuesCheckbox = page.locator('label:has-text("Empty values")');
await emptyValuesCheckbox.click();
await expect(page).toHaveScreenshot('TC_0022_a.png', {
        fullPage: true,
        animations: 'disabled'
    });
const searchButton = page.locator('button:has(clr-icon[shape="search"])');
await searchButton.click();

await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('TC_0022_b.png', {
        fullPage: true,
        animations: 'disabled'
    });
    await page.getByRole('columnheader', { name: /Previous Inspection Date/i })
    .locator('.datagrid-filter-toggle')
    .click();
const resetButton = page.locator('button:has(div.filter-btn-label:has-text("Reset"))');
await resetButton.click();
// compare final screenshot after the reset
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');

await page.getByRole('columnheader', { name: /Previous Inspection Date/i })
    .locator('.datagrid-filter-toggle')
    .click();

    //Click filter icon and search the date
    const filterInputSite = page.locator('input[name="dateBegin"]');
    // input the begin date
    await filterInputSite.fill('12/30/2024');
    //Click filter icon and search the date
    const filterInputSite2 = page.locator('input[name="dateEnd"]');
    // input the end date
    await filterInputSite2.fill('12/30/2024');
    // click on search button
    await searchButton.click();
    await page.waitForLoadState('networkidle');

    // 5. Ensure grid is visible
    const firstRow = page.locator('clr-dg-row').first();
    await firstRow.waitFor({ state: 'visible' });
    
    // click the screenshot
    await expect(page).toHaveScreenshot('TC_0021.png', {
        fullPage: true,
        animations: 'disabled'
    });

    //Reset the filter
    //Declaring the Reset Button
   await page.getByRole('columnheader', { name: /Previous Inspection Date/i })
  .locator('.datagrid-filter-toggle')
  .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
    await resetButton.click();
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');

});