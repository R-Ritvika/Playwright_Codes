// reporters/excelReporter.ts
import { FullConfig, Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

type Row = {
  testName: string;
  status: string;
  durationSec: number;
  date: string; // mm/dd/yyyy
  time: string; // hh:mm:ss
};

export default class ExcelReporter implements Reporter {
  private rows: Row[] = [];
  private outFile: string;
  private sheetName: string;

  constructor(options?: { output?: string; sheetName?: string }) {
    // Absolute path to shared Excel file
    this.outFile =
      options?.output ||
      'C:/Users/ritvika.ritvika/OneDrive - VINCI Construction/Images/Playwright-e2e/Test_Results/test-reports.xlsx';

    // Project-specific sheet name
    this.sheetName = options?.sheetName || 'Filters';
  }

  // Reads version from a file (adjust path if needed)
  private readVersionFile(): string {
    const filePath =
      'C:/Users/ritvika.ritvika/OneDrive - VINCI Construction/Images/Playwright-e2e/Filters/reports/runtime-version.txt';
    if (fs.existsSync(filePath)) {
      try {
        return fs.readFileSync(filePath, 'utf8').trim();
      } catch (e) {
        console.warn('Could not read version file:', e);
        return 'unknown';
      }
    }
    return 'unknown';
  }

  onBegin(config: FullConfig) {
    const dir = path.dirname(this.outFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    console.log(`Using shared Excel file: ${this.outFile}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const testName = test.title;
    const status = result.status;
    const durationSec = result.duration ? +(result.duration / 1000).toFixed(2) : 0;

    const now = new Date();
    const pad2 = (n: number) => n.toString().padStart(2, '0');

    const date = `${pad2(now.getMonth() + 1)}/${pad2(now.getDate())}/${now.getFullYear()}`;
    const time = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;

    this.rows.push({ testName, status, durationSec, date, time });
  }

  async onEnd() {
    const workbook = new ExcelJS.Workbook();
    const fileExists = fs.existsSync(this.outFile);

    if (fileExists) {
      try {
        await workbook.xlsx.readFile(this.outFile);
      } catch (e) {
        console.warn('Could not read existing report file. Creating new workbook.', e);
      }
    }

    // Use existing sheet or create new
    let sheet = workbook.getWorksheet(this.sheetName);
    if (!sheet) {
      sheet = workbook.addWorksheet(this.sheetName);
      sheet.addRow(['Test Name', 'Status', 'Duration (sec)', 'Date', 'Time', 'Version']);
    }

    const version = this.readVersionFile();

    // Append all rows to the sheet
    for (const r of this.rows) {
      sheet.addRow([r.testName, r.status, r.durationSec, r.date, r.time, version]);
    }

    await workbook.xlsx.writeFile(this.outFile);
    console.log(`Excel test report written to ${this.outFile} (sheet: ${this.sheetName})`);
  }
}
