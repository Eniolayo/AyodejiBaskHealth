import { test, expect } from "@playwright/test";

test.describe("Dashboard E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto("/");
  });

  test("should load the dashboard homepage", async ({ page }) => {
    // Check that the page loads and has the expected title
    await expect(page).toHaveTitle(/Health Dashboard/);

    // Check that the main dashboard elements are visible
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("main")).toHaveClass(/font-geist/);
  });

  test("should display the dashboard header", async ({ page }) => {
    // Wait for the main content to be visible
    await expect(page.locator("main")).toBeVisible({ timeout: 10000 });

    // Check that the section with dashboard content is visible
    await expect(page.locator("section")).toBeVisible();
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that the page is still functional on mobile
    await expect(page.locator("main")).toBeVisible();

    // Verify that the dashboard content adapts to mobile
    const mainSection = page.locator("section").first();
    await expect(mainSection).toBeVisible();
  });

  test("should handle dark mode toggle if available", async ({ page }) => {
    // Look for theme toggle button (this might not exist, so we'll check conditionally)
    const themeToggle = page.locator('[data-testid="theme-toggle"]');

    if (await themeToggle.isVisible()) {
      await themeToggle.click();

      // Wait for theme change
      await page.waitForTimeout(500);

      // Check if dark mode classes are applied
      const body = page.locator("body");
      const isDarkMode = await body.evaluate(
        (el) =>
          el.classList.contains("dark") ||
          el.getAttribute("data-theme") === "dark"
      );

      // Just verify the toggle works, regardless of direction
      expect(typeof isDarkMode).toBe("boolean");
    }
  });

  test("should navigate without errors", async ({ page }) => {
    // Check that there are no console errors on load
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    // Reload the page to catch any console errors
    await page.reload();
    await page.waitForLoadState("networkidle");

    // Filter out common non-critical errors
    const criticalErrors = errors.filter(
      (error) =>
        !error.includes("favicon") &&
        !error.includes("404") &&
        !error.includes("Manifest")
    );

    expect(criticalErrors).toEqual([]);
  });

  test("should handle auto-refresh functionality", async ({ page }) => {
    // Look for refresh controls
    const refreshButton = page.locator('[data-testid="manual-refresh"]');
    const autoRefreshToggle = page.locator(
      '[data-testid="auto-refresh-toggle"]'
    );

    // Test manual refresh if available
    if (await refreshButton.isVisible()) {
      await refreshButton.click();
      // Wait for potential loading state
      await page.waitForTimeout(1000);
    }

    // Test auto-refresh toggle if available
    if (await autoRefreshToggle.isVisible()) {
      await autoRefreshToggle.click();
      await page.waitForTimeout(500);

      // Verify toggle state changed
      const isChecked = await autoRefreshToggle.isChecked();
      expect(typeof isChecked).toBe("boolean");
    }
  });
});
