import chalk from 'chalk';

export default function logTodos(todos: Todo[], showCheckbox = true): void {
  const checked = chalk.green('[x]');
  const unchecked = chalk.red('[ ]');

  todos.forEach((item, index) => {
    const checkbox = item.done ? checked : unchecked;

    if (showCheckbox) {
      console.log(`${index + 1}. ${checkbox} ${item.todo}`);
    } else {
      console.log(`${index + 1}. ${item.todo}`);
    }
  });
}
