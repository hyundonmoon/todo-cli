#!/usr/bin/env node

import chalk from 'chalk';
import { Command } from 'commander';
import logTodos from '../helper/logTodos.js';
import readTodos from '../helper/readTodos.js';
import writeTodos from '../helper/writeTodos.js';

const program = new Command();

await program.parseAsync();

async function popTodo() {
  const todos = readTodos();
  const popped = todos?.pop();

  if (!todos || !popped) {
    console.log(chalk.yellow('No todos found.'));
    return;
  }

  writeTodos([...todos]);
  console.log('Popping the last todo item from the list.');
  logTodos([popped]);
}

try {
  await popTodo();
} catch (e) {
  console.log(
    'An error occured while popping the last todo item. Please try again.'
  );
}
