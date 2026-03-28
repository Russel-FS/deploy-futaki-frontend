import { NextResponse } from "next/server";
import { PrismaBlogRepository } from "@/blog/infrastructure/repositories/prisma-blog.repository";
import { prisma } from "@/shared/lib/prisma";
import { GetBlogPostsUseCase } from "@/blog/application/use-cases/blog.use-cases";

const repo = new PrismaBlogRepository(prisma);

// GET /api/blog → Solo posts publicados
export async function GET() {
  try {
    const posts = await new GetBlogPostsUseCase(repo).execute(false);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener posts" },
      { status: 500 },
    );
  }
}
