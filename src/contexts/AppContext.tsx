import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Skill, AppState, Category } from '@/types';
import { loadSkills, saveSkills, generateId } from '@/utils/localStorage';

type Action =
  | { type: 'SELECT_SKILL'; id: string | null }
  | { type: 'SET_SEARCH'; query: string }
  | { type: 'SET_CATEGORY'; category: Category | 'All' }
  | { type: 'ADD_SKILL'; skill: Omit<Skill, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'> }
  | { type: 'UPDATE_SKILL'; skill: Skill }
  | { type: 'DELETE_SKILL'; id: string }
  | { type: 'INCREMENT_USAGE'; id: string }
  | { type: 'LOAD_SKILLS'; skills: Skill[] };

const initialState: AppState = {
  skills: [],
  selectedSkillId: null,
  searchQuery: '',
  selectedCategory: 'All',
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_SKILLS':
      return { ...state, skills: action.skills };
    case 'SELECT_SKILL':
      return { ...state, selectedSkillId: action.id };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.query };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.category };
    case 'ADD_SKILL': {
      const now = new Date().toISOString();
      const newSkill: Skill = {
        ...action.skill,
        id: generateId(),
        usageCount: 0,
        createdAt: now,
        updatedAt: now,
      };
      return { ...state, skills: [...state.skills, newSkill] };
    }
    case 'UPDATE_SKILL': {
      const updated = state.skills.map((s) =>
        s.id === action.skill.id ? { ...action.skill, updatedAt: new Date().toISOString() } : s
      );
      return { ...state, skills: updated };
    }
    case 'DELETE_SKILL': {
      const filtered = state.skills.filter((s) => s.id !== action.id);
      const selectedSkillId = state.selectedSkillId === action.id ? null : state.selectedSkillId;
      return { ...state, skills: filtered, selectedSkillId };
    }
    case 'INCREMENT_USAGE': {
      const updated = state.skills.map((s) =>
        s.id === action.id ? { ...s, usageCount: s.usageCount + 1 } : s
      );
      return { ...state, skills: updated };
    }
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      if (import.meta.env.DEV) {
        // Dev: use localStorage (with sample data seeding)
        dispatch({ type: 'LOAD_SKILLS', skills: loadSkills() });
      } else {
        // Production: fetch from published skills.json
        try {
          const res = await fetch(`${import.meta.env.BASE_URL}skills.json`);
          const data = await res.json() as Skill[];
          dispatch({ type: 'LOAD_SKILLS', skills: data });
        } catch {
          dispatch({ type: 'LOAD_SKILLS', skills: [] });
        }
      }
      setIsLoading(false);
    }
    void init();
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV && !isLoading) {
      saveSkills(state.skills);
    }
  }, [state.skills, isLoading]);

  return (
    <AppContext.Provider value={{ state, dispatch, isLoading }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
