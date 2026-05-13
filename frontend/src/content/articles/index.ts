import recursionMeta from "./recursion/meta.json";
import algorithmParadigmsMeta from "./algorithm-paradigms/meta.json";

export interface ArticleSection {
  slug: string;
  title: string;
  description: string;
  order: number;
  estimatedTime: string;
}

export interface ArticleMeta {
  title: string;
  slug: string;
  description: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  tags: string[];
  sections: ArticleSection[];
}

export const articles: ArticleMeta[] = [
  recursionMeta as ArticleMeta,
  algorithmParadigmsMeta as ArticleMeta,
];

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticleSections(articleSlug: string): ArticleSection[] {
  const article = getArticleBySlug(articleSlug);
  return article?.sections || [];
}

export function getSection(
  articleSlug: string,
  sectionSlug: string
): ArticleSection | undefined {
  const sections = getArticleSections(articleSlug);
  return sections.find((section) => section.slug === sectionSlug);
}
