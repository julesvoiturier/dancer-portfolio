import { Section } from "@/utils/types";
import ContentSection from "./ContentSection";

interface Props {
  sectionsArray: Section[];
}

export default function SectionsContainer({ sectionsArray }: Props) {
  return (
    <div className="relative border-l border-border">
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
