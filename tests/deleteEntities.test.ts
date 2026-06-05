import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

test("Delete all API entities from entities.txt", async ({ request }) => {
  test.setTimeout(0);
  const apiBaseUrl = process.env.API_BASE_URL ?? "";
  const apiKey = process.env.APIMATIC_API_KEY;

  if (!apiKey) {
    throw new Error("APIMATIC_API_KEY environment variable is not set");
  }

  const filePath = path.join(__dirname, "../entities.txt");
  const ids = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  console.log(`Found ${ids.length} entities to delete`);

  const failed: string[] = [];

  for (const id of ids) {
    const response = await request.delete(`${apiBaseUrl}/api-entities/${id}`, {
      headers: {
        Authorization: `X-Auth-Key "${apiKey}"`,
      },
    });

    if (!response.ok()) {
      console.warn(
        `Failed to delete ${id}: ${response.status()} ${response.statusText()}`,
      );
      failed.push(id);
    } else {
      console.log(`Deleted: ${id}`);
    }
  }

  if (failed.length > 0) {
    console.error(
      `Failed to delete ${failed.length} entities:\n${failed.join("\n")}`,
    );
  }

  expect(failed).toHaveLength(0);
});
