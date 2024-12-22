#!/usr/bin/env node
import checkbox from '@inquirer/checkbox';
import chalk from 'chalk';
import { Command } from 'commander';
import logTodos from '../helper/logTodos.js';
import readTodos from '../helper/readTodos.js';
import removeTodos from '../helper/removeTodos.js';

const program = new Command();

await program.parseAsync();

try {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log(chalk.yellow('No todos found.'));
  } else {
    const todosToRemove = await checkbox({
      message: 'Which todo item would you like to delete?',
      choices: todos.map((item, idx) => ({
        name: `${item.done ? '[x]' : '[ ]'} ${item.todo}`,
        value: item,
      })),
      pageSize: 12,
      required: true,
    });
    const removed = await removeTodos(todosToRemove);

    console.log(chalk.green('Successfully removed the following todos:'));
    logTodos(removed);
  }
} catch (e) {
  console.log(chalk.red('Error when removing todo items. Please try again.'));
}
