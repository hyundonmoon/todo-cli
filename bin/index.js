#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { program } from 'commander';
import chalk from 'chalk';
import checkbox from '@inquirer/checkbox';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TODOS = path.join(__dirname, '..', 'todos.json');

// Helper functions
const readTodos = () => {
  try {
    if (!fs.existsSync(TODOS)) {
      return [];
    }
    const data = fs.readFileSync(TODOS);
    return JSON.parse(data);
  } catch (error) {
    console.error('Uh oh, an occurred while reading your todo list.');
    exit(1);
  }
};

const writeTodos = (todos) => {
  try {
    fs.writeFileSync(TODOS, JSON.stringify(todos, null, 2));
  } catch (err) {
    console.error('Uh oh, an error occurred while adding your new todo');
    exit(1);
  }
};

const logTodos = (todos, showCheckbox = true) => {
  const checked = chalk.green('[x]');
  const unchecked = chalk.red('[ ]');

  todos.forEach((item, index) => {
    const checkbox = item.done ? checked : unchecked;

    if (showCheckbox) {
      console.log(`${index + 1}. ${checkbox} ${item.todo}`);
    } else {
      console.log(`${index + 1}. ${item.todo}`);
    }
  });
};

program.version('1.0.0').description('To-Do List');

program
  .command('add <todo>')
  .description('Add a new todo')
  .action((todo) => {
    const todos = readTodos();

    if (todos) {
      todos.push({ todo, done: false });
      writeTodos(todos);
      console.log(chalk.green(`Added new todo: ${todo}`));
    }
  });

program
  .command('list')
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

    const removedIndicesMap = removedIndices.reduce((acc, curr) => {
      acc[curr] = true;
      return acc;
    }, {});

    const newTodos = [];
    const removedTodos = [];

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

    const toggledItems = [];

    checkedIndices.forEach((idx) => {
      const todoItem = todos[idx];

      todos[idx] = { ...todoItem, done: !todoItem.done };
      toggledItems.push(todos[idx]);
    });

    writeTodos(todos);
    console.log('Toggled the statuses of the following items: ');
    logTodos(toggledItems);
  });

program.parse();
