#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import checkbox from '@inquirer/checkbox';
import readTodos from '../helper/readTodos.js';
import logTodos from '../helper/logTodos.js';
import writeTodos from '../helper/writeTodos.js';

const program = new Command();

await program.parseAsync();

async function markTodoItemsAsDone() {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log(chalk.yellow('No todos found.'));
    return;
  }

  const options = todos.filter((todo) => !todo.done);

  const markedTodos = await checkbox({
    message: 'Which todo item would you like to mark as done?',
    choices: options.map((item) => ({
      name: `[ ] ${item.todo}`,
      value: item,
    })),
    pageSize: 12,
    required: true,
  });

  const markedIdsMap = markedTodos.reduce(
    (acc, curr) => {
      acc[curr.id] = true;
      return acc;
    },
    {} as Record<string, true>
  );

  const updatedTodos = todos.map((todo) => {
    if (markedIdsMap[todo.id]) {
      todo.done = true;
    }

    return todo;
  });

  writeTodos(updatedTodos);
  console.log('Marked the following items as done:');
  logTodos(markedTodos);
}

try {
  markTodoItemsAsDone();
} catch (e) {
  console.log(
    'An error occured when marking todo items as done. Please try again.'
  );
}
