import type { Skill } from '@/types';

export const sampleSkills: Skill[] = [
  {
    id: 'sample-1',
    name: 'UX Audit',
    category: 'Design',
    tags: ['ux', 'audit', 'heuristics'],
    shortDescription: 'Evaluate a UI against Nielsen\'s 10 usability heuristics.',
    longDescription: 'A structured prompt for running a heuristic evaluation on any interface. Surfaces friction points, accessibility gaps, and quick-win improvements.',
    promptTemplate: `You are a UX expert. Evaluate the following interface description against Nielsen's 10 usability heuristics.

Interface: {{interface_description}}

For each heuristic, rate it 1–5 and explain any violations found. End with a prioritized list of top 3 improvements.`,
    usageCount: 12,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-02-01T08:30:00Z',
  },
  {
    id: 'sample-2',
    name: 'Code Reviewer',
    category: 'Dev',
    tags: ['code', 'review', 'typescript'],
    shortDescription: 'Review code for bugs, performance, and best practices.',
    longDescription: 'Performs a thorough code review covering correctness, readability, security, and performance. Returns structured feedback with severity levels.',
    promptTemplate: `You are a senior software engineer. Review the following code:

\`\`\`{{language}}
{{code}}
\`\`\`

Provide feedback in three categories:
1. **Bugs / Correctness** — anything that will break
2. **Performance** — inefficiencies worth fixing
3. **Style / Readability** — minor suggestions

Be concise. Label each issue as [critical], [major], or [minor].`,
    usageCount: 34,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-03-05T14:00:00Z',
  },
  {
    id: 'sample-3',
    name: 'Literature Summarizer',
    category: 'Research',
    tags: ['summary', 'academic', 'papers'],
    shortDescription: 'Summarize academic papers into structured notes.',
    longDescription: 'Extracts key findings, methodology, limitations, and citations from academic papers. Outputs a structured summary suitable for a literature review.',
    promptTemplate: `Summarize the following academic paper:

Title: {{title}}
Abstract: {{abstract}}

Output a structured summary with these sections:
- **Research Question**
- **Methodology**
- **Key Findings**
- **Limitations**
- **Relevance** (1–2 sentences on why this matters)`,
    usageCount: 8,
    createdAt: '2024-02-01T11:00:00Z',
    updatedAt: '2024-02-20T16:45:00Z',
  },
  {
    id: 'sample-4',
    name: 'Blog Post Draft',
    category: 'Writing',
    tags: ['blog', 'content', 'seo'],
    shortDescription: 'Draft a SEO-friendly blog post from a topic and outline.',
    longDescription: 'Generates a full blog post draft with a compelling headline, introduction hook, structured body, and call-to-action. Naturally incorporates target keywords.',
    promptTemplate: `Write a blog post about: {{topic}}

Target audience: {{audience}}
Target keywords: {{keywords}}
Tone: {{tone}}

Structure:
1. Headline (give 3 options)
2. Introduction with a hook (2–3 sentences)
3. 3–5 body sections with subheadings
4. Conclusion with CTA

Aim for {{word_count}} words.`,
    usageCount: 21,
    createdAt: '2024-01-20T13:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
  },
  {
    id: 'sample-5',
    name: 'Meeting Notes',
    category: 'Other',
    tags: ['meetings', 'notes', 'action-items'],
    shortDescription: 'Transform raw meeting notes into structured summaries.',
    longDescription: 'Takes messy meeting notes and produces a clean summary with decisions made, action items with owners, and open questions.',
    promptTemplate: `Clean up these meeting notes into a structured summary:

Raw notes:
{{raw_notes}}

Output format:
**Date:** {{date}}
**Attendees:** {{attendees}}

**Decisions Made:**
-

**Action Items:**
- [ ] Owner: Task (due date)

**Open Questions:**
- `,
    usageCount: 5,
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-10T12:00:00Z',
  },
];
