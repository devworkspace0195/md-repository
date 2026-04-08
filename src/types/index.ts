export type Category = 'Design' | 'Dev' | 'Research' | 'Writing' | 'Other';

export interface Skill {
  id: string;
  name: string;
  category: Category;
  tags: string[];
  shortDescription: string;
  longDescription: string;
  promptTemplate: string;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  skills: Skill[];
  selectedSkillId: string | null;
  searchQuery: string;
  selectedCategory: Category | 'All';
}
