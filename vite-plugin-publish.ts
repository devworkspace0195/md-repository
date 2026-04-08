import type { Plugin } from 'vite';
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

export function publishPlugin(): Plugin {
  return {
    name: 'publish-plugin',
    configureServer(server) {
      server.middlewares.use('/api/publish', (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405);
          res.end();
          return;
        }

        let body = '';
        req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const { skills } = JSON.parse(body) as { skills: unknown[] };
            const filePath = resolve(__dirname, 'public/skills.json');
            writeFileSync(filePath, JSON.stringify(skills, null, 2));

            execSync('git add public/skills.json', { cwd: __dirname });

            // Check if there's anything to commit
            try {
              execSync('git diff --cached --exit-code', { cwd: __dirname });
              // No changes — already up to date
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ status: 'no-changes' }));
            } catch {
              // There are staged changes — commit and push
              const count = (skills as unknown[]).length;
              execSync(
                `git commit -m "publish: ${count} skill${count !== 1 ? 's' : ''}"`,
                { cwd: __dirname }
              );
              execSync('git push', { cwd: __dirname });
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ status: 'published' }));
            }
          } catch (err) {
            console.error('[publish]', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'error', message: String(err) }));
          }
        });
      });
    },
  };
}
