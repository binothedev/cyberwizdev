import { NextResponse } from "next/server";
import { Project } from "@/lib/db/models/Project";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await Project.findMany({
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ projects: projects.map((p) => p.toObject()) });
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, longDescription, image, githubUrl, demoUrl } = body;

    const project = await Project.create({
      data: {
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        description,
        longDescription,
        image,
        githubUrl,
        demoUrl,
        status: "active",
        sortOrder: 0,
      },
    });

    return NextResponse.json({ project: project.toObject() }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
