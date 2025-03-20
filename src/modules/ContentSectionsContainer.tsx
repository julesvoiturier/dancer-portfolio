import ContentSection from "./ContentSection";

export default function ContentSectionsContainer({ sectionsData }: any) {
  return (
    <div className="relative">
      {sectionsData?.map((section, index) => (
        <ContentSection
          key={index}
          index={index}
          data={section.SectionArticles}
          title={section.SectionTitle}
        />
      ))}
    </div>
  );
}
