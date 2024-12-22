#!/usr/bin/env node
import checkbox from '@inquirer/checkbox';
import chalk from 'chalk';
import { Command } from 'commander';
import logTodos from '../helper/logTodos.js';
import readTodos from '../helper/readTodos.js';
import toggleTodos from '../helper/toggleTodos.js';

const program = new Command();
await program.parseAsync();

async function markTodoItemsAsDone() {
  const todos = readTodos();
  const options = todos.filter((todo) => !todo.done);

  if (options.length === 0) {
    console.log(chalk.yellow('You have no todo items to mark as done.'));
    return;
  }

  const markedTodos = await checkbox({
    message: 'Which todo items would you like to mark as done?',
    choices: options.map((item) => ({
      name: `[ ] ${item.todo}`,
      value: item,
    })),
    pageSize: 12,
    required: true,
  });

  await toggleTodos(markedTodos);
  return markedTodos;
}

try {
  const markedTodos = await markTodoItemsAsDone();
  if (markedTodos) {
    console.log(
      chalk.green('Successfully marked the following todo items as done:')
    );
    logTodos(markedTodos);
  }
} catch (e) {
  console.log(
    chalk.red(
      'An error occurred while marking todo items as done. Please try again.'
    )
  );
}
