import { truncateTitle } from './utils.js';

export default function logTodos(todos: Todo[]): void {
  const formattedTodos = todos.map((todo) => ({
    id: todo.id,
    title: truncateTitle(todo.todo),
    done: todo.done ? `[v]` : '[ ]',
  }));

  console.table(formattedTodos);
}

export function logTodo(todo: Todo) {
  logTodos([todo]);
}
