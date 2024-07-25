#!/usr/bin/env node
import { Command } from 'commander';
import readTodos from '../helper/readTodos.js';
import chalk from 'chalk';
import logTodos from '../helper/logTodos.js';

const program = new Command();

program.option('-d, done', 'List only finished todos');
program.option('-a, all', 'List all todos');

program.parse();

function listTodos(options: Record<string, boolean>) {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log(chalk.yellow('No todos found.'));
    return;
  }

  const checked = chalk.green('[x]');
  const unchecked = chalk.red('[ ]');

  if (options.all) {
    logTodos(todos);
  } else if (options.done) {
    let index = 0;
    todos.forEach((item) => {
      // skip remaining todos
      if (!item.done) {
        return;
      }

      index++;
      console.log(`${index}. ${checked} ${item.todo}`);
    });

    if (index === 0) {
      console.log(chalk.yellow('No finished todos found.'));
    }
  } else {
    let index = 0;
    todos.forEach((item) => {
      // skip finished todos
      if (item.done) {
        return;
      }

      index++;
      console.log(`${index}. ${unchecked} ${item.todo}`);
    });

    if (index === 0) {
      console.log(chalk.yellow('No remaining todos.'));
    }
  }
}

try {
  listTodos(program.opts());
} catch (e) {
  console.log(
    'An error occured while listing your todo items. Please try again.'
  );
}
