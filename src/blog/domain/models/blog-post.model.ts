export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  imageUrl?: string | null;
  isPublished: boolean;
  authorId?: string | null;
  author?: {
    id: string;
    name?: string | null;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}
