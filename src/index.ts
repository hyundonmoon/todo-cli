#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import checkbox from '@inquirer/checkbox';
import { v4 as uuidv4 } from 'uuid';
import readTodos from './helper/readTodos.js';
import writeTodos from './helper/writeTodos.js';
import logTodos from './helper/logTodos.js';

program.version('1.0.0').description('To-Do List');

program
  .command('add <todo>', 'Add a new todo')
  .command('list', 'List your todos', { isDefault: true })
  .alias('ls')
  .command('remove', 'Select todo items to remove')
  .alias('rm')
  .command('toggle', 'Toggle todo items status')
  .command('mark-done', 'Mark todo items as done')
  .alias('md')
  .command('remove-done', 'Remove all todo items marked as done')
  .alias('rmd')
  .executableDir('./commands');

program.parse();

process.addListener('uncaughtException', (err) => {
  console.log('An unknown error occured.');
});
