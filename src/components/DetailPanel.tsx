import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useApp } from '@/contexts/AppContext';
import { categoryColors } from '@/utils/categoryColors';
import { SkillForm } from './SkillForm';
import { Copy, Check, Pencil, Trash2, X } from 'lucide-react';

const IS_DEV = import.meta.env.DEV;

export function DetailPanel() {
  const { state, dispatch } = useApp();
  const [copied, setCopied] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const skill = state.skills.find((s) => s.id === state.selectedSkillId);

  if (!skill) {
    return (
      <div className="hidden lg:flex flex-col items-center justify-center h-full text-center p-8 text-muted-foreground">
        <p className="text-sm">Select a skill to view details</p>
      </div>
    );
  }

  function handleCopy() {
    navigator.clipboard.writeText(skill!.promptTemplate);
    dispatch({ type: 'INCREMENT_USAGE', id: skill!.id });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDelete() {
    dispatch({ type: 'DELETE_SKILL', id: skill!.id });
    setDeleteOpen(false);
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 p-5 pb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold">{skill.name}</h2>
              <Badge
                className={`text-xs border ${categoryColors[skill.category]}`}
                variant="outline"
              >
                {skill.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{skill.shortDescription}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 lg:hidden"
            onClick={() => dispatch({ type: 'SELECT_SKILL', id: null })}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tags */}
        {skill.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-5 pb-3">
            {skill.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-muted text-muted-foreground rounded px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Separator />

        <ScrollArea className="flex-1">
          <div className="p-5 space-y-5">
            {/* Description */}
            {skill.longDescription && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  About
                </h3>
                <div className="prose prose-sm max-w-none text-foreground">
                  <ReactMarkdown>{skill.longDescription}</ReactMarkdown>
                </div>
              </div>
            )}

            {/* Prompt Template */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Prompt Template
                </h3>
                <Button
                  size="sm"
                  variant={copied ? 'secondary' : 'default'}
                  className="h-7 text-xs gap-1.5"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </Button>
              </div>
              <pre className="text-xs bg-muted rounded-md p-3 whitespace-pre-wrap font-mono leading-relaxed">
                {skill.promptTemplate}
              </pre>
            </div>

            {/* Metadata */}
            <div className="text-xs text-muted-foreground space-y-1">
              <Separator className="mb-3" />
              <p>Used {skill.usageCount} time{skill.usageCount !== 1 ? 's' : ''}</p>
              <p>Created {new Date(skill.createdAt).toLocaleDateString()}</p>
              <p>Updated {new Date(skill.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </ScrollArea>

        {/* Actions — dev only */}
        {IS_DEV && (
          <>
            <Separator />
            <div className="flex gap-2 p-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1.5"
                onClick={() => setEditOpen(true)}
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-destructive hover:text-destructive"
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Edit Dialog — dev only */}
      {IS_DEV && (
        <>
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Skill</DialogTitle>
              </DialogHeader>
              <SkillForm skill={skill} onClose={() => setEditOpen(false)} />
            </DialogContent>
          </Dialog>

          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete "{skill.name}"?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={handleDelete}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
}
