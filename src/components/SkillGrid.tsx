import { useApp } from '@/contexts/AppContext';
import { SkillCard } from './SkillCard';
import type { Skill } from '@/types';

export function SkillGrid() {
  const { state } = useApp();

  const filtered = state.skills.filter((skill: Skill) => {
    const matchesCategory =
      state.selectedCategory === 'All' || skill.category === state.selectedCategory;
    const q = state.searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      skill.name.toLowerCase().includes(q) ||
      skill.shortDescription.toLowerCase().includes(q) ||
      skill.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground text-sm">No skills found.</p>
        {state.searchQuery || state.selectedCategory !== 'All' ? (
          <p className="text-muted-foreground text-xs mt-1">Try adjusting your filters.</p>
        ) : (
          <p className="text-muted-foreground text-xs mt-1">Click "+ New Skill" to get started.</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {filtered.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
