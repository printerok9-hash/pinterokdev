const { chromium } = require("@playwright/test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const dotenv = require("../../backend/node_modules/dotenv");
const env = dotenv.parse(
  fs.readFileSync(path.join(__dirname, "../../backend/.env")),
);
if (env.SMTP_HOST)
  throw new Error(
    "Disable SMTP for local browser tests to avoid sending test enquiries.",
  );
if (env.NODE_ENV === "production")
  throw new Error(
    "Run browser tests only against the local development configuration.",
  );
const root = path.join(
  process.env.USERPROFILE || process.env.HOME,
  ".agent-browser/browsers",
);
const executablePath =
  process.env.BROWSER_EXECUTABLE ||
  path.join(
    root,
    fs.readdirSync(root).find((x) => x.startsWith("chrome-")),
    "chrome.exe",
  );
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    baseURL: "http://localhost:3000",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const marker = `Browser QA ${Date.now()}`;
  let postId;
  async function visit(url) {
    const r = await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    assert.ok(r.status() < 400, `${url} returned ${r.status()}`);
    await page.locator("h1").waitFor();
  }
  async function fillRepair(booking = false) {
    await page.getByLabel("Your name").fill(marker);
    await page.getByLabel("Phone number").fill("+447700900123");
    await page.getByLabel("Email address").fill("browser-test@example.com");
    await page.getByLabel("Printer brand").selectOption("Canon");
    await page.getByLabel("Postcode", { exact: true }).fill("SW1A 1AA");
    await page
      .getByLabel("What’s happening with your printer?")
      .fill("Local automated test: printer not connecting to WiFi.");
    if (booking) await page.getByLabel("Preferred date").fill("2099-01-01");
    await page.getByRole("checkbox").check();
    await page
      .getByRole("button", {
        name: booking ? "Request appointment" : "Send repair enquiry",
        exact: true,
      })
      .click();
    await page.getByRole("heading", { name: "Request received." }).waitFor();
  }
  try {
    await visit("/");
    assert.match(await page.title(), /Pinterok/);
    assert.equal(await page.locator("h1").count(), 1);
    assert.equal(
      await page.locator('script[type="application/ld+json"]').count(),
      1,
    );
    await page
      .locator("summary")
      .filter({ hasText: "Are you connected with HP or Canon?" })
      .click();
    assert.match(
      await page.locator("details[open]").innerText(),
      /independent/i,
    );
    console.log("PASS homepage, SEO schema and FAQ accordion");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Toggle navigation" }).click();
    await page
      .locator("nav")
      .getByRole("link", { name: "Services", exact: true })
      .click();
    await page.waitForURL("**/services", {waitUntil:'domcontentloaded'});
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    console.log("PASS mobile menu and overflow");
    await visit("/book");
    assert.equal(await page.locator("iframe").count(), 0);
    await fillRepair(true);
    console.log("PASS browser appointment submission");
    await visit("/contact");
    await fillRepair();
    console.log("PASS browser enquiry submission");
    await page.setViewportSize({ width: 1440, height: 1000 });
    await visit("/admin");
    await page.getByLabel("Email address").fill(env.ADMIN_EMAIL);
    await page.getByLabel("Password", { exact: true }).fill(env.ADMIN_PASSWORD);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await page.getByText("Admin workspace").waitFor();
    let row = page.locator("tr").filter({ hasText: marker });
    await row.waitFor();
    await row.getByRole("combobox").selectOption("completed");
    await page
      .getByText("Appointment status updated.", { exact: true })
      .waitFor();
    assert.equal(await row.getByRole("combobox").inputValue(), "completed");
    console.log("PASS admin login and appointment status");
    await page.getByRole("button", { name: "Blog posts", exact: true }).click();
    await page.getByRole("button", { name: "Create new" }).click();
    await page.getByLabel("Title", { exact: true }).fill(marker);
    const slug = `browser-qa-${Date.now()}`;
    await page.getByLabel("URL slug / unique identifier").fill(slug);
    await page
      .getByLabel("Short description / SEO description")
      .fill("Local browser test article.");
    await page
      .getByLabel("Content", { exact: true })
      .fill(
        "Browser tested\nThis article checks the complete publishing flow.",
      );
    await page
      .getByLabel("Article image")
      .setInputFiles(path.join(__dirname, "../public/printer.jpg"));
    await page
      .getByText("Image uploaded. Save the content to use it.")
      .waitFor();
    await page.getByLabel("Publish on website").check();
    await page
      .getByRole("button", { name: "Save content", exact: true })
      .click();
    await page
      .getByText(
        "Content saved. Published content is now available on the website.",
      )
      .waitFor();
    const all = await (await context.request.get("/api/admin/posts")).json();
    postId = all.find((p) => p.slug === slug)._id;
    await visit(`/blog/${slug}`);
    assert.equal(await page.locator("h1").innerText(), marker);
    assert.equal(await page.locator("article img").count(), 1);
    assert.match(
      await page.locator("article").innerText(),
      /complete publishing flow/,
    );
    console.log("PASS blog creation, image upload and public publishing");
    await visit("/admin");
    await page.getByText("Admin workspace").waitFor();
    await page.getByRole("button", { name: "Blog posts", exact: true }).click();
    row = page.locator("tr").filter({ hasText: marker });
    await row.getByRole("button", { name: "Edit", exact: true }).click();
    await page.getByLabel("Title", { exact: true }).fill(marker + " edited");
    await page
      .getByRole("button", { name: "Save content", exact: true })
      .click();
    await page
      .getByText(
        "Content saved. Published content is now available on the website.",
      )
      .waitFor();
    await row.getByRole("button", { name: "Delete", exact: true }).click();
    await page
      .getByRole("button", { name: "Delete record", exact: true })
      .click();
    await page.getByText("Record deleted.", { exact: true }).waitFor();
    postId = null;
    const deleted = await page.goto(`/blog/${slug}`, {waitUntil:'domcontentloaded'});
    assert.equal(deleted.status(), 404);
    console.log("PASS blog edit and deletion without fallback resurrection");
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await visit("/");
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `overflow at ${width}`,
      );
    }
    for (const url of [
      "/about",
      "/services/printer-repair",
      "/blog",
      "/blog/why-printer-shows-offline",
      "/privacy",
    ])
      await visit(url);
    assert.equal(errors.length, 0, errors.join("\n"));
    console.log(
      "PASS all public routes, responsive widths and no browser runtime errors",
    );
  } finally {
    // Remove only records created by this run, leaving business data untouched.
    for (const kind of ["appointments", "enquiries", "posts"]) {
      const response = await context.request.get(`/api/admin/${kind}`);
      if (response.ok()) {
        const records = await response.json();
        for (const item of records.filter(
          (r) =>
            r.name === marker ||
            r.title?.startsWith(marker) ||
            r._id === postId,
        ))
          await context.request.delete(`/api/admin/${kind}/${item._id}`, {
            headers: { Origin: "http://localhost:3000" },
          });
      }
    }
    await context.request.post("/api/admin/logout", {
      headers: { Origin: "http://localhost:3000" },
    });
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
