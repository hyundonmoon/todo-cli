#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import checkbox from '@inquirer/checkbox';
import readTodos from '../helper/readTodos.js';
import logTodos from '../helper/logTodos.js';
import writeTodos from '../helper/writeTodos.js';

const program = new Command();

await program.parseAsync();

async function toggleTodos() {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log(chalk.yellow('No todos found.'));
    return;
  }

  const checkedIndices = await checkbox({
    message: 'Which todo item status would you like to toggle?',
    choices: todos.map((item, idx) => ({
      name: `${item.done ? '[x]' : '[ ]'} ${item.todo}`,
      value: idx,
    })),
    pageSize: 12,
    required: true,
  });

  const toggledItems: Todo[] = [];

  checkedIndices.forEach((idx) => {
    const todoItem = todos[idx];

    todos[idx] = { ...todoItem, done: !todoItem.done };
    toggledItems.push(todos[idx]);
  });

  writeTodos(todos);
  console.log('Toggled the statuses of the following items: ');
  logTodos(toggledItems);
}

try {
  await toggleTodos();
} catch {
  console.log('Errors toggling todo items. Please try again.');
}
