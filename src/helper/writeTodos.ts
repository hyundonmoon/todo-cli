import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TODOS = path.join(__dirname, '../..', 'todos.json');

export default function writeTodos(todos: Todo[]): void {
  try {
    fs.writeFileSync(TODOS, JSON.stringify(todos, null, 2));
  } catch (err) {
    console.error('Uh oh, an error occurred while adding your new todo');
    process.exit(1);
  }
}
