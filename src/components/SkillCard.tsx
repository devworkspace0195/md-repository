import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { categoryColors } from '@/utils/categoryColors';
import type { Skill } from '@/types';

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const { state, dispatch } = useApp();
  const isSelected = state.selectedSkillId === skill.id;

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary shadow-md' : ''
      }`}
      onClick={() => dispatch({ type: 'SELECT_SKILL', id: skill.id })}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-tight">{skill.name}</h3>
          <Badge className={`text-xs shrink-0 border ${categoryColors[skill.category]}`} variant="outline">
            {skill.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {skill.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {skill.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-muted text-muted-foreground rounded px-1.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
          {skill.usageCount > 0 && (
            <span className="text-xs text-muted-foreground shrink-0">
              {skill.usageCount}×
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
