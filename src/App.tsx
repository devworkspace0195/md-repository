import { useState } from 'react';
import { AppProvider, useApp } from '@/contexts/AppContext';
import { SearchBar } from '@/components/SearchBar';
import { SkillGrid } from '@/components/SkillGrid';
import { DetailPanel } from '@/components/DetailPanel';
import { SkillForm } from '@/components/SkillForm';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Toaster } from '@/components/ui/toaster';
import { Plus, Upload, Check, Loader2 } from 'lucide-react';

const IS_DEV = import.meta.env.DEV;

function MobileDetailSheet() {
  const { state } = useApp();
  if (!state.selectedSkillId) return null;
  return (
    <div className="lg:hidden fixed inset-0 z-40 bg-background flex flex-col">
      <DetailPanel />
    </div>
  );
}

function PublishButton() {
  const { state } = useApp();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'no-changes'>('idle');

  async function handlePublish() {
    setStatus('loading');
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: state.skills }),
      });
      const data = await res.json() as { status: string };
      setStatus(data.status === 'no-changes' ? 'no-changes' : 'done');
    } catch {
      setStatus('idle');
      alert('Publish failed — check the terminal for errors.');
    }
    setTimeout(() => setStatus('idle'), 3000);
  }

  return (
    <Button
      size="sm"
      variant="outline"
      className="gap-1.5"
      onClick={handlePublish}
      disabled={status === 'loading'}
    >
      {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
      {status === 'done' && <Check className="h-4 w-4 text-green-600" />}
      {status === 'no-changes' && <Check className="h-4 w-4 text-muted-foreground" />}
      {status === 'idle' && <Upload className="h-4 w-4" />}
      {status === 'loading' ? 'Publishing…' : status === 'done' ? 'Published!' : status === 'no-changes' ? 'Up to date' : 'Publish'}
    </Button>
  );
}

function Layout() {
  const [newSkillOpen, setNewSkillOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b shrink-0">
        <div>
          <h1 className="text-lg font-semibold">MD Repository</h1>
          <p className="text-xs text-muted-foreground">Skills &amp; prompts library</p>
        </div>
        <div className="flex items-center gap-2">
          {IS_DEV && <PublishButton />}
          {IS_DEV && (
            <Button size="sm" className="gap-1.5" onClick={() => setNewSkillOpen(true)}>
              <Plus className="h-4 w-4" /> New Skill
            </Button>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — skill list */}
        <div className="flex flex-col w-full lg:w-[420px] shrink-0 border-r overflow-hidden">
          <div className="p-4 pb-3">
            <SearchBar />
          </div>
          <Separator />
          <div className="flex-1 overflow-y-auto p-4">
            <SkillGrid />
          </div>
        </div>

        {/* Right panel — detail (desktop only) */}
        <div className="hidden lg:flex flex-1 flex-col overflow-hidden">
          <DetailPanel />
        </div>
      </div>

      {/* Mobile: full-screen detail overlay */}
      <MobileDetailSheet />

      {/* New Skill Dialog */}
      <Dialog open={newSkillOpen} onOpenChange={setNewSkillOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Skill</DialogTitle>
          </DialogHeader>
          <SkillForm onClose={() => setNewSkillOpen(false)} />
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Layout />
    </AppProvider>
  );
}
