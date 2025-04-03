export interface Article {
  title: string;
  date: string;
  topParagraphs: string[];
  bottomParagraphs: string[];
  image: string;
  imageDescription: string;
}

export interface Section {
  sectionTitle: string;
  sectionArticles: Article[];
}
