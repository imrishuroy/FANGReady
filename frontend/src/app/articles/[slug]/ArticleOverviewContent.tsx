"use client";

import { ArticleMeta } from "@/content/articles";
import SinglePageArticleLayout from "@/components/articles/SinglePageArticleLayout";
import { sections as recursionSections } from "@/content/articles/recursion/sections";
import { sections as algorithmParadigmsSections } from "@/content/articles/algorithm-paradigms/sections";

interface Props {
  article: ArticleMeta;
}

function getSectionComponents(
  articleSlug: string,
): Record<string, React.ComponentType> {
  switch (articleSlug) {
    case "recursion":
      return recursionSections;
    case "algorithm-paradigms":
      return algorithmParadigmsSections;
    default:
      return {};
  }
}

export default function ArticleOverviewContent({ article }: Props) {
  const sectionComponents = getSectionComponents(article.slug);

  return (
    <SinglePageArticleLayout
      article={article}
      sectionComponents={sectionComponents}
    />
  );
}
