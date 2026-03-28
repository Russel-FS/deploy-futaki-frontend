import { BlogPost } from "../models/blog-post.model";

export interface CreateBlogPostDto {
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  isPublished?: boolean;
  authorId?: string | null;
}

export interface UpdateBlogPostDto extends Partial<CreateBlogPostDto> {
  id: string;
}

export interface BlogRepository {
  getAllPosts(includeUnpublished?: boolean): Promise<BlogPost[]>;
  getPostById(id: string): Promise<BlogPost | null>;
  getPostBySlug(slug: string): Promise<BlogPost | null>;
  createPost(data: CreateBlogPostDto): Promise<BlogPost>;
  updatePost(data: UpdateBlogPostDto): Promise<BlogPost>;
  deletePost(id: string): Promise<void>;
}
