import db from './db.js';
import readTodos from './readTodos.js';

export default async function toggleTodos(
  targetTodos: Todo[]
): Promise<Todo[] | undefined> {
  const allTodos = readTodos();

  if (allTodos.length === 0) {
    return;
  }

  const targetTodoIds = targetTodos.reduce(
    (acc, curr) => {
      acc[curr.id] = true;
      return acc;
    },
    {} as Record<string, true>
  );

  const updatedTodos = allTodos.map((todo) => {
    if (targetTodoIds[todo.id]) {
      todo.done = !todo.done;
    }

    return todo;
  });

  db.data.todos = updatedTodos;
  await db.write();
  return targetTodos;
}
