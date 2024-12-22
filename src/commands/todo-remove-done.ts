#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import logTodos from '../helper/logTodos.js';
import readTodos from '../helper/readTodos.js';
import removeTodos from '../helper/removeTodos.js';

const program = new Command();
await program.parseAsync();

try {
  const todos = readTodos();
  const todosToRemove = todos.filter((todo) => !todo.done);
  const removed = await removeTodos(todosToRemove);
  if (removed.length) {
    console.log(chalk.green('Successfully removed the following todos:'));
    logTodos(removed);
  }
} catch (e) {
  console.log(
    chalk.red('An error occurred while removing todos. Please try again.')
  );
}
