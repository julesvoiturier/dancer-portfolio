export interface Article {
  title: string;
  date: string;
  topParagraphs: string[];
  image: string;
  imageDescription: string;
  bottomParagraphs: string[];
}

export interface ArticlesSection {
  sectionTitle: string;
  sectionArticles: Article[];
}
