export type BlogCategory = 'Tech' | 'Lifestyle' | 'Business';

export interface BlogPostFormData {
  title: string;
  author: string;
  summary: string;
  category: BlogCategory;
  content: string;
}

export interface BlogPost extends BlogPostFormData {
  id: string;
  date: string;
}

export type WizardStep = 1 | 2 | 3 | 4;
