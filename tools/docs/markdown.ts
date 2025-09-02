import { readFileSync } from 'fs';
import path, { resolve } from 'path';

// Regex to match: !INCLUDE "file"
const includePattern = /!INCLUDE\s+"([^"]+)"/g;

const TEMPLATES = path.join(__dirname, 'templates');
const EXAMPLES = path.join('examples', 'api');

const preprocessMarkdown = async (inputPath: string, outputPath: string) => {
  let content = await Bun.file(inputPath).text();

  content = content.replace(includePattern, (_, includePath) => {
    const fullPath = resolve(includePath);
    return readFileSync(fullPath, 'utf8').trim();
  });

  await Bun.file(outputPath).write(content);
  console.log(`✅ Preprocessed ${inputPath} -> ${outputPath}`);
};

['meta'].forEach((component) => {
  preprocessMarkdown(
    path.join(TEMPLATES, component + '.md'),
    path.join(EXAMPLES, component, 'README.md'),
  );
});
