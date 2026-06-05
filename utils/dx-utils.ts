// at top of your test file
import fs from "fs";
import path from "path";
import os from "os";
import { Page } from '@playwright/test';

type UpdateArgs = {
  filePath: string;
  property: string;
  newValue: string | boolean;
  page?: Page;  
};

export function createTempPortalJs(templatePortalPath: string): string {
  const baseTempDir = path.resolve(__dirname, "../.tmp-portals");
  fs.mkdirSync(baseTempDir, { recursive: true });
  const tempDir = fs.mkdtempSync(path.join(baseTempDir, "portal-"));
  const destPath = path.join(tempDir, "portal.js");
  fs.copyFileSync(templatePortalPath, destPath);
  return destPath;
}

export function updatePortalJsProperty({
  filePath,
  property,
  newValue,
  page,
}: UpdateArgs) {
  let content = fs.readFileSync(filePath, "utf-8");

  const escapedProp = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`${escapedProp}:\\s*(true|false|["'][^"']*["'])`);

  const isBooleanLike =
    typeof newValue === "boolean" ||
    newValue === "true" ||
    newValue === "false";

  const literal = isBooleanLike ? newValue : `"${newValue}"`;

  const updated = content.replace(regex, `${property}: ${literal}`);
  fs.writeFileSync(filePath, updated, "utf-8");

   if (page) {
    page.route('**/portal.js', async route => {
      const tempContent = fs.readFileSync(filePath, 'utf-8');
      await route.fulfill({
        contentType: 'application/javascript',
        body: tempContent,
      });
    });
  }


}
