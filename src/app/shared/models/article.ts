export interface Article {
  id?: string;
  title: string;
  text?: string;
  image?: string;
  favorite: boolean;
}

export interface ArticleTab extends Article {
  open?: boolean;
}
