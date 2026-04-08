import type { Skill } from '@/types';
import { sampleSkills } from './sampleData';

const STORAGE_KEY = 'md-repository-skills';

export function loadSkills(): Skill[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Skill[];
    // Seed with sample data on first load
    saveSkills(sampleSkills);
    return sampleSkills;
  } catch {
    return sampleSkills;
  }
}

export function saveSkills(skills: Skill[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
