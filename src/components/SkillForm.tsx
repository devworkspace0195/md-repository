import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import type { Skill, Category } from '@/types';

const CATEGORIES: Category[] = ['Design', 'Dev', 'Research', 'Writing', 'Other'];

interface SkillFormProps {
  skill?: Skill;
  onClose: () => void;
}

export function SkillForm({ skill, onClose }: SkillFormProps) {
  const { dispatch } = useApp();
  const [name, setName] = useState(skill?.name ?? '');
  const [category, setCategory] = useState<Category>(skill?.category ?? 'Other');
  const [tags, setTags] = useState(skill?.tags.join(', ') ?? '');
  const [shortDescription, setShortDescription] = useState(skill?.shortDescription ?? '');
  const [longDescription, setLongDescription] = useState(skill?.longDescription ?? '');
  const [promptTemplate, setPromptTemplate] = useState(skill?.promptTemplate ?? '');

  const isEdit = !!skill;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedTags = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (isEdit) {
      dispatch({
        type: 'UPDATE_SKILL',
        skill: {
          ...skill,
          name,
          category,
          tags: parsedTags,
          shortDescription,
          longDescription,
          promptTemplate,
        },
      });
    } else {
      dispatch({
        type: 'ADD_SKILL',
        skill: { name, category, tags: parsedTags, shortDescription, longDescription, promptTemplate },
      });
    }
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
          <label className="text-sm font-medium">Name</label>
          <Input
            required
            placeholder="e.g. Code Reviewer"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
          <label className="text-sm font-medium">Category</label>
          <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Tags</label>
        <Input
          placeholder="e.g. code, review, typescript (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Short Description</label>
        <Input
          required
          placeholder="One-line summary shown on the card"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Long Description</label>
        <Textarea
          rows={3}
          placeholder="Detailed notes about when and how to use this skill"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Prompt Template</label>
        <Textarea
          required
          rows={6}
          placeholder="Use {{variable}} for placeholders..."
          value={promptTemplate}
          onChange={(e) => setPromptTemplate(e.target.value)}
          className="font-mono text-sm"
        />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{isEdit ? 'Save Changes' : 'Create Skill'}</Button>
      </div>
    </form>
  );
}
