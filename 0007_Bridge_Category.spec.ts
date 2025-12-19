import { test } from '../fixtures/auth';
import { setPageZoom } from "../helpers/pageZoom";
import { expect } from '@playwright/test';

test('TC_Ast_List_Ftr_0027', async ({ page }) => { 

// got to assets url
await page.goto('/assets', { waitUntil: 'networkidle' });

await setPageZoom(page, 0.75);

//open the filter
const filterPanel = page.locator('[role="dialog"], .clr-popover-content, .datagrid-filter');
  await page.getByRole('columnheader', { name: /Bridge Category/i })
  .locator('.datagrid-filter-toggle')
  .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
    //click screenshot
    await expect(page).toHaveScreenshot('TC_0027.png', {
        fullPage: true,
        animations: 'disabled'
    });

    //Click filter icon and search the number
    await page.locator('.selectable', { hasText: 'Truss bridge' })
  .locator('xpath=../preceding-sibling::div//label')
  .click();
    const searchButton = page.locator('button:has(clr-icon[shape="search"])');
    await searchButton.click();
    await page.waitForLoadState('networkidle');
    // 5. Ensure grid is visible
    const firstRow = page.locator('clr-dg-row').first();
    await firstRow.waitFor({ state: 'visible' });
    // click the screenshot
    await expect(page).toHaveScreenshot('TC_0030.png', {
        fullPage: true,
        animations: 'disabled'
    });
    //Reset the filter
    //Declaring the Reset Button
   const resetButton = page.locator('button:has(div.filter-btn-label:has-text("Reset"))');
   await page.getByRole('columnheader', { name: /Bridge Category/i })
  .locator('.datagrid-filter-toggle')
  .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
    await resetButton.click();
    // click the filter again
//Check the Empty Values
    await page.getByRole('columnheader', { name: /Bridge Category/i })
    .locator('.datagrid-filter-toggle')
    .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
    const emptyValuesCheckbox = page.locator('label:has-text("Empty values")');
await emptyValuesCheckbox.click();
await expect(page).toHaveScreenshot('TC_0028_a.png', {
        fullPage: true,
        animations: 'disabled'
    });
await searchButton.click();
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('TC_0028_b.png', {
        fullPage: true,
        animations: 'disabled'
    });
    await page.getByRole('columnheader', { name: /Bridge Category/i })
    .locator('.datagrid-filter-toggle')
    .click();
await resetButton.click();
// compare final screenshot after the reset
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');
await page.getByRole('columnheader', { name: /Bridge Category/i })
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
await page.locator('.selectable', { hasText: 'Beam bridge' })
  .locator('xpath=../preceding-sibling::div//label')
  .click();
await expect(page).toHaveScreenshot('TC_0029_a.png', {
        fullPage: true,
        animations: 'disabled'
    });
    await searchButton.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('TC_0029_b.png', {
        fullPage: true,
        animations: 'disabled'
    });
    await page.getByRole('columnheader', { name: /Bridge Category/i })
    .locator('.datagrid-filter-toggle')
    .click();
await resetButton.click();
// compare final screenshot 
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');

});