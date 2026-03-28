import { BlogRepository } from "@/blog/domain/repositories/blog.repository";
import { BlogPost } from "@/blog/domain/models/blog-post.model";
import {
  CreateBlogPostDto,
  UpdateBlogPostDto,
} from "@/blog/domain/repositories/blog.repository";

export class GetBlogPostsUseCase {
  constructor(private repository: BlogRepository) {}
  execute(includeUnpublished = false): Promise<BlogPost[]> {
    return this.repository.getAllPosts(includeUnpublished);
  }
}

export class GetBlogPostByIdUseCase {
  constructor(private repository: BlogRepository) {}
  execute(id: string): Promise<BlogPost | null> {
    return this.repository.getPostById(id);
  }
}

export class GetBlogPostBySlugUseCase {
  constructor(private repository: BlogRepository) {}
  execute(slug: string): Promise<BlogPost | null> {
    return this.repository.getPostBySlug(slug);
  }
}

export class CreateBlogPostUseCase {
  constructor(private repository: BlogRepository) {}
  execute(data: CreateBlogPostDto): Promise<BlogPost> {
    return this.repository.createPost(data);
  }
}

export class UpdateBlogPostUseCase {
  constructor(private repository: BlogRepository) {}
  execute(data: UpdateBlogPostDto): Promise<BlogPost> {
    return this.repository.updatePost(data);
  }
}

export class DeleteBlogPostUseCase {
  constructor(private repository: BlogRepository) {}
  execute(id: string): Promise<void> {
    return this.repository.deletePost(id);
  }
}
