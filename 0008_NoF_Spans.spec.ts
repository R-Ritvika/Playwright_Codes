import { test } from '../fixtures/auth';
import { setPageZoom } from "../helpers/pageZoom";
import { expect } from '@playwright/test';

test('TC_Ast_List_Ftr_0031', async ({ page }) => { 

// got to assets url
await page.goto('/assets', { waitUntil: 'networkidle' });

await setPageZoom(page, 0.75);

//open the filter
const filterPanel = page.locator('[role="dialog"], .clr-popover-content, .datagrid-filter');
  await page.getByRole('columnheader', { name: /Number of Spans/i })
  .locator('.datagrid-filter-toggle')
  .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
    //click screenshot
    await expect(page).toHaveScreenshot('TC_0031.png', {
        fullPage: true,
        animations: 'disabled'
    });

    //Click filter icon and search the number
    const filterInputSite = page.locator('input[name="col.filteredValue"]');
    // input the value
    await filterInputSite.fill('1');
    // click on search button
    const searchButton = page.locator('button:has(clr-icon[shape="search"])');
    await searchButton.click();
    await page.waitForLoadState('networkidle');

    // 5. Ensure grid is visible
    const firstRow = page.locator('clr-dg-row').first();
    await firstRow.waitFor({ state: 'visible' });
    
    // click the screenshot
    await expect(page).toHaveScreenshot('TC_0033.png', {
        fullPage: true,
        animations: 'disabled'
    });

    //Reset the filter
    //Declaring the Reset Button
   const resetButton = page.locator('button:has(div.filter-btn-label:has-text("Reset"))');
   await page.getByRole('columnheader', { name: /Number of Spans/i })
  .locator('.datagrid-filter-toggle')
  .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
    await resetButton.click();
    const yearColumn = page.locator('clr-dg-column:has-text("Number of Spans")');
    const yearFilterButton = yearColumn.locator('button[aria-label="Toggle column filter"]');
    await yearFilterButton.click();
    //Click filter icon and search the minimum value
    const filterMinValue = page.locator('input[name="col.filteredValueMin"]');
    // input the value
    await filterMinValue.fill('4');
    const filterMaxValue = page.locator('input[name="col.filteredValueMax"]');
    // input the value
    await filterMaxValue.fill('15');
    // click on search button
    await searchButton.click();
    await page.waitForLoadState('networkidle');
    // 5. Ensure grid is visible
    const FilterRow = page.locator('clr-dg-row').first();
    await FilterRow.waitFor({ state: 'visible' });
    // click the screenshot
    await expect(page).toHaveScreenshot('TC_0034.png', {
        fullPage: true,
        animations: 'disabled'
    });
    // click the filter again
    await page.getByRole('columnheader', { name: /Number of Spans/i })
    .locator('.datagrid-filter-toggle')
    .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
    
    await resetButton.click();
// compare final screenshot after the reset
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');

//Check the Empty Values
    await page.getByRole('columnheader', { name: /Number of Spans/i })
    .locator('.datagrid-filter-toggle')
    .click();
    const emptyValuesCheckbox = page.locator('label:has-text("Empty values")');
await emptyValuesCheckbox.click();
await expect(page).toHaveScreenshot('TC_0035_a.png', {
        fullPage: true,
        animations: 'disabled'
    });

await searchButton.click();

await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('TC_0035_b.png', {
        fullPage: true,
        animations: 'disabled'
    });
    await page.getByRole('columnheader', { name: /Number of Spans/i })
    .locator('.datagrid-filter-toggle')
    .click();
await resetButton.click();
// compare final screenshot after the reset
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');

await page.getByRole('columnheader', { name: /Number of Spans/i })
    .locator('.datagrid-filter-toggle')
    .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');

// Locate **only the toggle label**
const toggleLabel = filterPanel.locator('label.mat-slide-toggle-label');

// Scroll into view and click
await toggleLabel.scrollIntoViewIfNeeded();
await toggleLabel.click();

// Verify the toggle is ON
const toggleInput = filterPanel.locator('input[role="switch"]');
await expect(toggleInput).toBeChecked();
await filterInputSite.fill('2');
await expect(page).toHaveScreenshot('TC_0032_a.png', {
        fullPage: true,
        animations: 'disabled'
    });
    await searchButton.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('TC_0032_b.png', {
        fullPage: true,
        animations: 'disabled'
    });
    await page.getByRole('columnheader', { name: /Number of Spans/i })
    .locator('.datagrid-filter-toggle')
    .click();
await resetButton.click();
// compare final screenshot 
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');

});