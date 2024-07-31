#!/usr/bin/env node

import { program } from 'commander';

program.version('1.0.0').description('To-Do List');

program
  .command('add <todo>', 'Add a new todo')
  .command('list', 'List your todos', { isDefault: true })
  .alias('ls')
  .command('remove', 'Select todo items to remove')
  .alias('rm')
  .option('-id, --id <ids...>', 'Specify ids of todos to remove')
  .command('toggle', 'Toggle todo items status')
  .command('mark-done', 'Mark todo items as done')
  .alias('md')
  .command('remove-done', 'Remove all todo items marked as done')
  .alias('rmd')
  .command('clear', 'Remove all todo items')
  .executableDir('./commands');

program.parse();

process.addListener('uncaughtException', (err) => {
  console.log('An unknown error occured.');
});
