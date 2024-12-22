import db from './db.js';
import readTodos from './readTodos.js';

export default async function removeTodos(
  todosToRemove: Todo[]
): Promise<Todo[]> {
  const targetTodoIdMap = todosToRemove.reduce(
    (acc, todo) => {
      if (todo.done) {
        acc[todo.id] = true;
      }
      return acc;
    },
    {} as Record<string, boolean>
  );

  const allTodos = readTodos();
  const newTodos = allTodos.filter((todo) => !targetTodoIdMap[todo.id]);
  db.data.todos = newTodos;
  await db.write();
  return todosToRemove;
}
