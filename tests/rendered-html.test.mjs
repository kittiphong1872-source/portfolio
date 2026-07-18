import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished national portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="th">/i);
  assert.match(html, /<title>รุ้งกานฎา จีนา/);
  assert.match(html, /name="description" content="แฟ้มผลงานเด็กหญิงรุ้งกานฎา จีนา/);
  assert.match(html, /id="highlights"/);
  assert.match(html, /id="cases"/);
  assert.match(html, /id="timeline"/);
  assert.match(html, /id="evidence"/);
  assert.match(html, /ความอ่อนน้อมที่ฝึกฝนจนเป็นเหรียญทอง/);
  assert.match(html, /Night at the Museum Festival 2025/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|Your site is taking shape/);
});

test("publishes structured metadata and accessible navigation", async () => {
  const html = await (await render()).text();
  assert.match(html, /type="application\/ld\+json"/);
  assert.match(html, /"@type":"ProfilePage"/);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /property="og:image" content="\/og.jpg"/);
  assert.match(html, /class="skip-link" href="#main-content"/);
  assert.match(html, /id="main-content"/);
  assert.match(html, /<h1>รุ้งกานฎา/);
  assert.match(html, /aria-label="เมนูหลัก"/);
});

test("ships evidence and social preview assets", async () => {
  const pdf = await stat(new URL("../public/portfolio-rungkanda-jeena.pdf", import.meta.url));
  const og = await stat(new URL("../public/og.jpg", import.meta.url));
  assert.ok(pdf.isFile() && pdf.size > 100_000);
  assert.ok(og.isFile() && og.size > 50_000);
});
