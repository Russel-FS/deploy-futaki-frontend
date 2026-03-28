import { NextResponse } from "next/server";
import { PrismaBlogRepository } from "@/blog/infrastructure/repositories/prisma-blog.repository";
import { prisma } from "@/shared/lib/prisma";
import {
  GetBlogPostsUseCase,
  CreateBlogPostUseCase,
} from "@/blog/application/use-cases/blog.use-cases";

const repo = new PrismaBlogRepository(prisma);

export async function GET() {
  try {
    const posts = await new GetBlogPostsUseCase(repo).execute(true);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("[ADMIN_BLOG_GET]", error);
    return NextResponse.json(
      { error: "Error al obtener posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, content, excerpt, imageUrl, isPublished, authorId } =
      body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 },
      );
    }

    const post = await new CreateBlogPostUseCase(repo).execute({
      title,
      slug,
      content,
      excerpt,
      imageUrl,
      isPublished: isPublished ?? false,
      authorId,
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "El slug ya existe, usa uno diferente." },
        { status: 409 },
      );
    }
    console.error("[ADMIN_BLOG_POST]", error);
    return NextResponse.json({ error: "Error al crear post" }, { status: 500 });
  }
}
