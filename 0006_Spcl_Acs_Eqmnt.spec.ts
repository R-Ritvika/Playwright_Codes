import { test } from '../fixtures/auth';
import { setPageZoom } from "../helpers/pageZoom";
import { expect } from '@playwright/test';

test('TC_Ast_List_Ftr_0016', async ({ page }) => { 

// got to assets url
await page.goto('/assets', { waitUntil: 'networkidle' });

await setPageZoom(page, 0.75);

//open the filter
const filterPanel = page.locator('[role="dialog"], .clr-popover-content, .datagrid-filter');
  await page.getByRole('columnheader', { name: "Sp. Access Equip't - Yes/No" })
  .locator('.datagrid-filter-toggle')
  .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
    //click screenshot
    await expect(page).toHaveScreenshot('TC_0016.png', {
        fullPage: true,
        animations: 'disabled'
    });
    // Click the check box for True
await page.locator('.selectable', { hasText: 'True' })
  .locator('xpath=../preceding-sibling::div//label')
  .click();
    const searchButton = page.locator('button:has(clr-icon[shape="search"])');
//await searchButton.click();
await expect(page).toHaveScreenshot('TC_0018_a.png', {
        fullPage: true,
        animations: 'disabled'
    });
await searchButton.click();
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('TC_0018_b.png', {
        fullPage: true,
        animations: 'disabled'
    });
    await page.getByRole('columnheader', { name: "Sp. Access Equip't - Yes/No" })
    .locator('.datagrid-filter-toggle')
    .click();
const resetButton = page.locator('button:has(div.filter-btn-label:has-text("Reset"))');
await resetButton.click();
// compare final screenshot after the reset
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');

 // Click the check box for False
 await page.getByRole('columnheader', { name: "Sp. Access Equip't - Yes/No" })
    .locator('.datagrid-filter-toggle')
    .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');
await page.locator('.selectable', { hasText: 'False' })
  .locator('xpath=../preceding-sibling::div//label')
  .click();
 await expect(page).toHaveScreenshot('TC_0019_a.png', {
        fullPage: true,
        animations: 'disabled'
    });
await searchButton.click();

await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('TC_0019_b.png', {
        fullPage: true,
        animations: 'disabled'
    });
    await page.getByRole('columnheader', { name: "Sp. Access Equip't - Yes/No" })
    .locator('.datagrid-filter-toggle')
    .click();
await resetButton.click();
// compare final screenshot after the reset
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');

//Check the values for Null
await page.getByRole('columnheader', { name: "Sp. Access Equip't - Yes/No" })
    .locator('.datagrid-filter-toggle')
    .click();
    await filterPanel.first().waitFor({ state: 'visible', timeout: 50000 });
    await page.waitForLoadState('networkidle');

await page.locator('.selectable', { hasText: 'Null' })
  .locator('xpath=../preceding-sibling::div//label')
  .click();
await expect(page).toHaveScreenshot('TC_0017_a.png', {
        fullPage: true,
        animations: 'disabled'
    });
await searchButton.click();

await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('TC_0017_b.png', {
        fullPage: true,
        animations: 'disabled'
    });
    await page.getByRole('columnheader', { name: "Sp. Access Equip't - Yes/No" })
    .locator('.datagrid-filter-toggle')
    .click();
await resetButton.click();
// compare final screenshot after the reset
await page.waitForLoadState('networkidle');
await expect(page).toHaveScreenshot('AST_RST.png');


});