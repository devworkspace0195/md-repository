import type { Category } from '@/types';

export const categoryColors: Record<Category, string> = {
  Design: 'bg-amber-100 text-amber-800 border-amber-200',
  Dev: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Research: 'bg-purple-100 text-purple-800 border-purple-200',
  Writing: 'bg-blue-100 text-blue-800 border-blue-200',
  Other: 'bg-slate-100 text-slate-800 border-slate-200',
};
