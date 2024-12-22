import { JSONFilePreset } from 'lowdb/node';

const db = await JSONFilePreset<{
  todos: Todo[];
}>('db.json', { todos: [] });

export default db;
