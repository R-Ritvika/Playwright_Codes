import { test as base, expect, Page } from '@playwright/test';
import { setPageZoom } from "../helpers/pageZoom";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

// ---------- SAVE VERSION TO FILE ----------
export async function saveVersion(page: Page) {  // <-- lowercase 'page' with type annotation
  const version = await page.locator('span.version').innerText();
  console.log('Version = ', version);

  // Ensure reports folder exists
  const dir = path.resolve('reports');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const file = path.resolve(dir, 'runtime-version.txt');
  fs.writeFileSync(file, version, 'utf-8');

  return version;
}
// --------------------------------------------

const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export const test = base.extend({
  page: async ({ page }, use) => {
    // 1. Go to login page
    await page.goto('/login', { waitUntil: 'networkidle' });

    // Zoom out
    await setPageZoom(page, 0.75);

    await expect(page).toHaveScreenshot('TC_0001.png', {
      fullPage: true,
      animations: 'disabled',
    });

    // --------------- READ + SAVE VERSION ---------------
    const version = await saveVersion(page);
    // ---------------------------------------------------

    // 2. Fill username + password
    await page.getByLabel('Username *').fill(ADMIN_USERNAME);
    await page.getByLabel('Password *').fill(ADMIN_PASSWORD);

    // 3. Click login
    await page.getByRole('button', { name: 'Log in' }).click();

    // 4. Wait to land on assets page
    await page.waitForURL('**/assets**', { timeout: 30000 });

    // 5. Ensure grid is visible
    const firstRow = page.locator('clr-dg-row').first();
    await firstRow.waitFor({ state: 'visible' });

    // Provide the logged-in page to your tests
    await use(page);
  }
});
