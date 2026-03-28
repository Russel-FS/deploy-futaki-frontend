import { NextResponse } from "next/server";
import { PrismaBlogRepository } from "@/blog/infrastructure/repositories/prisma-blog.repository";
import { prisma } from "@/shared/lib/prisma";
import { GetBlogPostBySlugUseCase } from "@/blog/application/use-cases/blog.use-cases";

const repo = new PrismaBlogRepository(prisma);

export async function GET(
  _: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const post = await new GetBlogPostBySlugUseCase(repo).execute(slug);
    if (!post)
      return NextResponse.json(
        { error: "Artículo no encontrado" },
        { status: 404 },
      );
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
