import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import type { Category } from '@/types';
import { Search } from 'lucide-react';

const CATEGORIES: (Category | 'All')[] = ['All', 'Design', 'Dev', 'Research', 'Writing', 'Other'];

export function SearchBar() {
  const { state, dispatch } = useApp();

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder="Search skills..."
          value={state.searchQuery}
          onChange={(e) => dispatch({ type: 'SET_SEARCH', query: e.target.value })}
        />
      </div>
      <Select
        value={state.selectedCategory}
        onValueChange={(val) =>
          dispatch({ type: 'SET_CATEGORY', category: val as Category | 'All' })
        }
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
