#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import checkbox from '@inquirer/checkbox';
import { v4 as uuidv4 } from 'uuid';
import readTodos from './helper/readTodos.js';
import writeTodos from './helper/writeTodos.js';
import logTodos from './helper/logTodos.js';

program.version('1.0.0').description('To-Do List');

program.command('add <todo>', 'Add a new todo').executableDir('./commands');

program
  .command('list', { isDefault: true })
  .alias('ls')
  .description('List your todos')
  .option('-d, done', 'List only finished todos')
  .option('-a, all', 'List all todos')
  .action((options) => {
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
  });

program
  .command('remove')
  .alias('rm')
  .description('Remove todo items')
  .action(async () => {
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
  });

program
  .command('toggle')
  .description('Toggle todo items status')
  .action(async () => {
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
  });

program
  .command('mark-done')
  .alias('md')
  .description('Mark todo items as done')
  .action(async () => {
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
  });

program
  .command('remove-done')
  .alias('rmd')
  .description('Remove all todo items marked as done')
  .action(() => {
    const todos = readTodos();
    const filteredTodos = todos.filter((todo) => !todo.done);
    writeTodos(filteredTodos);
    console.log('Removed all todo items marked as done.');
  });

program.parse();

process.addListener('uncaughtException', (err) => {});
