import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    use: {
        baseURL: "http://localhost:3000",
        // Collect trace when retrying the failed test.
        trace: "on-first-retry",
    },
    // Run your local dev server before starting the tests
    webServer: {
        command: "npm run build && npm start",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: !process.env.CI,
        // 3min timeout as build may take longer on CI
        timeout: 180 * 1000,
        stdout: "pipe",
        stderr: "pipe",
    },
    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,
    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,

    projects: [
        {
            name: "chromium",
            use: devices["Desktop Chrome"],
        },
        {
            name: "firefox",
            use: devices["Desktop Firefox"],
        },
        {
            name: "webkit",
            use: devices["Desktop Safari"],
        },
        {
            name: "Mobile Chrome",
            use: devices["Pixel 5"],
        },
        {
            name: "Mobile Safari",
            use: devices["iPhone 12"],
        },
    ],
});
