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

  if (options.all) {
    logTodos(todos);
  } else if (options.done) {
    const doneTodos = todos.filter((todo) => todo.done);

    if (!doneTodos.length) {
      console.log(chalk.yellow('No finished todos found.'));
    } else {
      logTodos(doneTodos);
    }
  } else {
    const notDoneTodos = todos.filter((todo) => !todo.done);
    if (!notDoneTodos.length) {
      console.log(chalk.yellow('No remaining todos.'));
    } else {
      logTodos(notDoneTodos);
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
