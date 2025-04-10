import ContentSection from "./ArticlesSection";
import { ArticlesSection } from "./types";

interface ArticlesFeedProps {
  sectionsArray: ArticlesSection[];
}

export default function ArticlesFeed({ sectionsArray }: ArticlesFeedProps) {
  return (
    <div className="relative z-20 border-l border-border-glass bg-background">
      {sectionsArray?.map((section, index) => (
        <ContentSection
          key={index}
          index={index}
          title={section.sectionTitle}
          data={section.sectionArticles}
        />
      ))}
    </div>
  );
}
