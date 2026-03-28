import { NextResponse } from "next/server";
import { PrismaBlogRepository } from "@/blog/infrastructure/repositories/prisma-blog.repository";
import { prisma } from "@/shared/lib/prisma";
import {
  GetBlogPostByIdUseCase,
  UpdateBlogPostUseCase,
  DeleteBlogPostUseCase,
} from "@/blog/application/use-cases/blog.use-cases";

type RouteContext = { params: Promise<{ id: string }> };

const repo = new PrismaBlogRepository(prisma);

export async function GET(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const post = await new GetBlogPostByIdUseCase(repo).execute(id);
    if (!post)
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener post" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();
    const post = await new UpdateBlogPostUseCase(repo).execute({ id, ...body });
    return NextResponse.json(post);
  } catch (error: any) {
    if (error.code === "P2025")
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    if (error.code === "P2002")
      return NextResponse.json(
        { error: "El slug ya existe." },
        { status: 409 },
      );
    return NextResponse.json(
      { error: "Error al actualizar post" },
      { status: 500 },
    );
  }
}

export async function DELETE(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    await new DeleteBlogPostUseCase(repo).execute(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2025")
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    return NextResponse.json(
      { error: "Error al eliminar post" },
      { status: 500 },
    );
  }
}
