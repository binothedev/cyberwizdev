/**
 * scripts/verify-landing-seed.ts
 *
 * Round-trip check for the landing-page case studies: a seeded row must render
 * on the landing page exactly like the original static card, and
 * `longDescription` must be tolerated in every shape an admin could leave it in
 * (JSON, plain text, null, malformed).
 *
 *   npx tsx scripts/verify-landing-seed.ts
 */

import {
  decodeLandingMeta,
  encodeLandingMeta,
  landingProjects,
  projectRowToCaseStudy,
  seedToCaseStudy,
} from "../lib/landing-projects";

let failures = 0;
const check = (name: string, ok: boolean, extra?: unknown) => {
  if (!ok) {
    failures += 1;
    console.error(`FAIL  ${name}`, extra ?? "");
  } else {
    console.log(`ok    ${name}`);
  }
};

for (const item of landingProjects) {
  // The exact row POST /api/admin/projects/seed writes.
  const row = {
    slug: item.slug,
    title: item.title,
    description: item.description,
    longDescription: encodeLandingMeta(item),
    demoUrl: item.caseStudyUrl,
  };

  const fromDb = projectRowToCaseStudy(row);
  const fromSeed = seedToCaseStudy(item);
  check(
    `${item.slug}: seeded row renders identically to the static card`,
    JSON.stringify(fromDb) === JSON.stringify(fromSeed),
    { fromDb, fromSeed }
  );

  check(
    `${item.slug}: meta survives the encode/decode round-trip`,
    JSON.stringify(decodeLandingMeta(row.longDescription)) ===
      JSON.stringify({ category: item.category, duration: item.duration, results: item.results })
  );

  const plain = projectRowToCaseStudy({ ...row, longDescription: "A normal paragraph." });
  check(
    `${item.slug}: plain-text longDescription drops the extras, keeps the link`,
    plain.category === undefined &&
      plain.duration === undefined &&
      plain.results === undefined &&
      plain.href === item.caseStudyUrl
  );

  check(
    `${item.slug}: null longDescription tolerated`,
    projectRowToCaseStudy({ ...row, longDescription: null }).title === item.title
  );

  check(
    `${item.slug}: malformed JSON tolerated`,
    projectRowToCaseStudy({ ...row, longDescription: "{oops" }).title === item.title
  );

  check(
    `${item.slug}: JSON array / scalar tolerated`,
    decodeLandingMeta("[1,2]").category === undefined &&
      decodeLandingMeta("123").category === undefined
  );

  check(
    `${item.slug}: slug matches the admin's slug generation`,
    item.slug === item.title.toLowerCase().replace(/\s+/g, "-")
  );
}

if (failures > 0) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log(`\nAll checks passed (${landingProjects.length} seed entries).`);
