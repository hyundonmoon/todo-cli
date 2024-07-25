import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TODOS = path.join(__dirname, '../..', 'todos.json');

export default function readTodos(): Todo[] {
  try {
    if (!fs.existsSync(TODOS)) {
      return [];
    }
    const data = fs.readFileSync(TODOS, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Uh oh, an occurred while reading your todo list.');
    process.exit(1);
  }
}
