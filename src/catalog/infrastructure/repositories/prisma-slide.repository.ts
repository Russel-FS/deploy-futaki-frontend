import { prisma } from "@/shared/lib/prisma";

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  ctaText: string | null;
  ctaUrl: string | null;
  btnBgColor: string | null;
  btnTextColor: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class PrismaSlideRepository {
  async getAllSlides(): Promise<HeroSlide[]> {
    return prisma.heroSlide.findMany({
      orderBy: { order: "asc" },
    });
  }

  async getActiveSlides(): Promise<HeroSlide[]> {
    return prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });
  }

  async createSlide(data: any): Promise<HeroSlide> {
    return prisma.heroSlide.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        imageUrl: data.imageUrl,
        ctaText: data.ctaText,
        ctaUrl: data.ctaUrl,
        btnBgColor: data.btnBgColor || "#000000",
        btnTextColor: data.btnTextColor || "#FFFFFF",
        order: data.order ?? 0,
        isActive: data.isActive ?? true,
      },
    });
  }

  async updateSlide(id: string, data: any): Promise<HeroSlide> {
    return prisma.heroSlide.update({
      where: { id },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        imageUrl: data.imageUrl,
        ctaText: data.ctaText,
        ctaUrl: data.ctaUrl,
        btnBgColor: data.btnBgColor,
        btnTextColor: data.btnTextColor,
        order: data.order,
        isActive: data.isActive,
      },
    });
  }

  async deleteSlide(id: string): Promise<HeroSlide> {
    return prisma.heroSlide.delete({
      where: { id },
    });
  }
}
