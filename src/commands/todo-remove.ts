#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import checkbox from '@inquirer/checkbox';
import readTodos from '../helper/readTodos.js';
import logTodos from '../helper/logTodos.js';
import writeTodos from '../helper/writeTodos.js';

const program = new Command();

await program.parseAsync();

async function removeTodos() {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log(chalk.yellow('No todos found.'));
    return;
  }

  const removedIndices = await checkbox({
    message: 'Which todo item would you like to delete?',
    choices: todos.map((item, idx) => ({
      name: `${item.done ? '[x]' : '[ ]'} ${item.todo}`,
      value: idx,
    })),
    pageSize: 12,
    required: true,
  });

  const removedIndicesMap = removedIndices.reduce(
    (acc, curr) => {
      acc[curr] = true;
      return acc;
    },
    {} as Record<number, boolean>
  );

  const newTodos: Todo[] = [];
  const removedTodos: Todo[] = [];

  todos.forEach((item, idx) => {
    if (removedIndicesMap[idx]) {
      removedTodos.push(item);
    } else {
      newTodos.push(item);
    }
  });

  writeTodos(newTodos);

  console.log('Removed the following todos: ');
  logTodos(removedTodos);
}

try {
  await removeTodos();
} catch (e) {
  console.log('Error when removing todo items. Please try again.');
}
