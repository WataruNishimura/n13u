import Link from 'next/link';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir: string, baseRoute = ''): string[] {
  return readdirSync(dir).flatMap((file) => {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      return file;
    }

    return '';
  });
}

export default function DocsPage() {
  const dirs = walk('app/docs');

  return (
    <main>
      <h1>n13u Documentation</h1>
      <ul>
        {dirs.map((dir) => (
          <li key={dir}>
            <Link href={'/docs/' + dir}>{dir}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
