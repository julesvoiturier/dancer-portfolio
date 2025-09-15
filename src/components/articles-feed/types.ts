export interface Article {
  title: string;
  date: string;
  topParagraphs: Array<string>;
  image: string;
  imageDescription: string;
  bottomParagraphs: Array<string>;
}

export interface ArticlesSection {
  sectionTitle: string;
  sectionArticles: Array<Article>;
}
