import { redirect } from 'next/navigation';
import { articles, getArticleBySlug, getSection } from '@/content/articles';

export function generateStaticParams() {
  const params: { slug: string; section: string }[] = [];

  articles.forEach((article) => {
    article.sections.forEach((section) => {
      params.push({
        slug: article.slug,
        section: section.slug,
      });
    });
  });

  return params;
}

interface PageProps {
  params: Promise<{ slug: string; section: string }>;
}

export default async function ArticleSectionPage({ params }: PageProps) {
  const { slug, section } = await params;
  const article = getArticleBySlug(slug);
  const sectionData = getSection(slug, section);

  if (!article || !sectionData) {
    redirect(`/articles/${slug}`);
  }

  redirect(`/articles/${slug}#${section}`);
}
