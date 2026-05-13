import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/content/articles";
import ArticleOverviewContent from "./ArticleOverviewContent";

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticleOverviewPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleOverviewContent article={article} />;
}
