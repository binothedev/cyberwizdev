/**
 * lib/landing-projects.ts
 *
 * Source of truth for the case studies in the landing page "Success Stories"
 * (#work) section.
 *
 * The landing page reads these rows from the `Project` table so the section is
 * editable from the admin dashboard. This array is:
 *   1. what `POST /api/admin/projects/seed` inserts (admin button), and
 *   2. the fallback the landing page renders when the DB relay is unreachable.
 *
 * Storage — the Project table has no case-study columns, so:
 *   - category / duration / results -> packed as JSON into `longDescription`
 *     (see encodeLandingMeta / decodeLandingMeta)
 *   - the "View case study" link  -> `demoUrl`
 * Plain-text `longDescription` values (projects created by hand in the admin)
 * simply decode to no extras — the card renders without those lines.
 */

/** One card in the landing page "Success Stories" (#work) section. */
export interface CaseStudy {
  slug?: string;
  category?: string;
  duration?: string;
  title: string;
  description: string;
  results?: string;
  href?: string;
}

export interface LandingProject {
  slug: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  results: string;
  /** Destination of the "View case study →" link. */
  caseStudyUrl: string;
  image: string;
  sortOrder: number;
}

export const landingProjects: LandingProject[] = [
  {
    slug: "groove-music-studios",
    title: "Groove Music Studios",
    description:
      "An immersive portfolio site showcasing music production with interactive audio elements.",
    results: "300% more client inquiries",
    category: "Creative Portfolio",
    duration: "2 months",
    caseStudyUrl: "https://groovemusic.ca",
    image: "",
    sortOrder: 10,
  },
  {
    slug: "dipo-resort",
    title: "Dipo Resort",
    description:
      "A complete digital presence with booking systems, virtual tours and guest experience management.",
    results: "450% boost in direct bookings",
    category: "Hospitality",
    duration: "4 months",
    caseStudyUrl: "https://diporesort.com",
    image: "",
    sortOrder: 20,
  },
  {
    slug: "jemai-interiors",
    title: "Jemai Interiors",
    description:
      "An elegant portfolio platform with dynamic galleries and client testimonial integration.",
    results: "250% growth in project requests",
    category: "Interior Design",
    duration: "3 months",
    caseStudyUrl: "https://www.jemai.xyz",
    image: "",
    sortOrder: 30,
  },
];

/** The landing-only fields that get packed into `Project.longDescription`. */
export interface LandingMeta {
  category?: string;
  duration?: string;
  results?: string;
}

/** Pack the landing-only fields into the `longDescription` column. */
export function encodeLandingMeta(
  project: Pick<LandingProject, "category" | "duration" | "results">
): string {
  return JSON.stringify({
    category: project.category,
    duration: project.duration,
    results: project.results,
  });
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

/**
 * Unpack `Project.longDescription`. Tolerates plain text (returns no extras)
 * and malformed JSON instead of throwing.
 */
export function decodeLandingMeta(
  longDescription: string | null | undefined
): LandingMeta {
  if (!longDescription) return {};
  try {
    const parsed: unknown = JSON.parse(longDescription);
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }
    const meta = parsed as Record<string, unknown>;
    return {
      category: optionalString(meta.category),
      duration: optionalString(meta.duration),
      results: optionalString(meta.results),
    };
  } catch {
    return {};
  }
}

/** Structural shape of a Project row as returned by the model's getters. */
export interface ProjectLike {
  slug: string;
  title: string;
  description: string;
  longDescription: string | null;
  demoUrl: string | null;
}

/** Map a Project row from the database to a landing case-study card. */
export function projectRowToCaseStudy(project: ProjectLike): CaseStudy {
  const meta = decodeLandingMeta(project.longDescription);
  return {
    slug: project.slug,
    title: project.title,
    description: project.description,
    category: meta.category,
    duration: meta.duration,
    results: meta.results,
    href: project.demoUrl ?? undefined,
  };
}

/** Map a seed entry to a landing case-study card (relay-failure fallback). */
export function seedToCaseStudy(project: LandingProject): CaseStudy {
  return {
    slug: project.slug,
    title: project.title,
    description: project.description,
    category: project.category,
    duration: project.duration,
    results: project.results,
    href: project.caseStudyUrl,
  };
}
