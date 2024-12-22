import db from './db.js';

export default function readTodos(): Todo[] {
  return db.data.todos;
}
