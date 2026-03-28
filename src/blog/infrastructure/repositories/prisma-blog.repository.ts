import { PrismaClient } from "@prisma/client";
import { BlogPost } from "../../domain/models/blog-post.model";
import {
  BlogRepository,
  CreateBlogPostDto,
  UpdateBlogPostDto,
} from "../../domain/repositories/blog.repository";

const mapToDomain = (post: any): BlogPost => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  content: post.content,
  excerpt: post.excerpt,
  imageUrl: post.imageUrl,
  isPublished: post.isPublished,
  authorId: post.authorId,
  author: post.author ? { id: post.author.id, name: post.author.name } : null,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
});

export class PrismaBlogRepository implements BlogRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllPosts(includeUnpublished: boolean = false): Promise<BlogPost[]> {
    const posts = await this.prisma.blogPost.findMany({
      where: includeUnpublished ? undefined : { isPublished: true },
      include: {
        author: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return posts.map(mapToDomain);
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    const post = await this.prisma.blogPost.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true } },
      },
    });
    return post ? mapToDomain(post) : null;
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, name: true } },
      },
    });
    return post ? mapToDomain(post) : null;
  }

  async createPost(data: CreateBlogPostDto): Promise<BlogPost> {
    const post = await this.prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl,
        isPublished: data.isPublished ?? false,
        authorId: data.authorId,
      },
      include: {
        author: { select: { id: true, name: true } },
      },
    });
    return mapToDomain(post);
  }

  async updatePost(data: UpdateBlogPostDto): Promise<BlogPost> {
    const { id, ...updateData } = data;
    const post = await this.prisma.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        author: { select: { id: true, name: true } },
      },
    });
    return mapToDomain(post);
  }

  async deletePost(id: string): Promise<void> {
    await this.prisma.blogPost.delete({ where: { id } });
  }
}
