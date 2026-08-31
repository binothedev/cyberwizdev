import { NextResponse } from "next/server";
import { Project } from "@/lib/db/models/Project";

export async function GET() {
  try {
    const projects = await Project.findMany({
      where: { status: "active" },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ projects: projects.map((p) => p.toObject()) });
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
