import formatDate from './formatDate.js';
import truncateTitle from './truncateTitle.js';

export default function logTodos(todos: Todo[]): void {
  const formattedTodos = todos.map((todo) => ({
    id: todo.id,
    title: truncateTitle(todo.todo),
    done: todo.done ? `[v]` : '[ ]',
  }));

  console.table(formattedTodos);
}
