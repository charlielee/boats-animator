export interface NewsResponse {
  posts: NewsResponsePost[];
}

export interface NewsResponsePost {
  id: string;
  url: string;
  title: string;
  date: Date;
  excerpt: string;
}
