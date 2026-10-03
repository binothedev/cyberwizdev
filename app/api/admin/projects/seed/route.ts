import { NextResponse } from "next/server";
import { Project } from "@/lib/db/models/Project";
import { auth } from "@/auth";
import { encodeLandingMeta, landingProjects } from "@/lib/landing-projects";

/**
 * POST /api/admin/projects/seed
 *
 * Inserts the landing-page case studies (lib/landing-projects.ts) into the
 * Project table. Idempotent: rows whose slug already exists are skipped so
 * clicking the button twice never duplicates or overwrites projects.
 */
export async function POST() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const created: string[] = [];
    const skipped: string[] = [];

    for (const item of landingProjects) {
      const existing = await Project.findUnique({ where: { slug: item.slug } });
      if (existing) {
        skipped.push(item.slug);
        continue;
      }

      await Project.create({
        data: {
          title: item.title,
          slug: item.slug,
          description: item.description,
          longDescription: encodeLandingMeta(item),
          image: item.image,
          githubUrl: null,
          demoUrl: item.caseStudyUrl,
          status: "active",
          sortOrder: item.sortOrder,
        },
      });
      created.push(item.slug);
    }

    return NextResponse.json({ created, skipped });
  } catch (error) {
    console.error("Seed landing projects error:", error);
    return NextResponse.json(
      { error: "Failed to seed landing page projects" },
      { status: 500 }
    );
  }
}
