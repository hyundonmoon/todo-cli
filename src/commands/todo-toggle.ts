#!/usr/bin/env node
import checkbox from '@inquirer/checkbox';
import chalk from 'chalk';
import { Command } from 'commander';
import readTodos from '../helper/readTodos.js';
import toggleTodos from '../helper/toggleTodos.js';

const program = new Command();
await program.parseAsync();

try {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log(chalk.yellow('No todos found.'));
  } else {
    const todosToToggle = await checkbox({
      message: 'Which todo item status would you like to toggle?',
      choices: todos.map((item, idx) => ({
        name: `${item.done ? '[x]' : '[ ]'} ${item.todo}`,
        value: item,
      })),
      pageSize: 12,
      required: true,
    });

    const toggledTodos = await toggleTodos(todosToToggle);
    if (toggledTodos) {
      console.log(chalk.green('Todo items toggled successfully.'));
    }
  }
} catch {
  console.log('Errors toggling todo items. Please try again.');
}
