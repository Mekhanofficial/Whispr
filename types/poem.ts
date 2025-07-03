export interface Poem {
  id: string;
  title: string;
  body: string;
  author: string;
  likes: number;
  date: string;
  category: string; // Changed from optional to required
  featured?: boolean;
}
