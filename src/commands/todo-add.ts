#!/usr/bin/env node
import { Command } from 'commander';
import { v4 as uuidv4 } from 'uuid';
import readTodos from '../helper/readTodos.js';
import writeTodos from '../helper/writeTodos.js';
import chalk from 'chalk';

const program = new Command();

program.parse();

function addTodo(todo: string) {
  const todos = readTodos();

  if (todos) {
    todos.push({ todo, done: false, id: uuidv4() });
    writeTodos(todos);
    console.log(chalk.green(`Added new todo: ${todo}`));
  }
}

if (program.args.length) {
  const [todoItem] = program.args;
  addTodo(todoItem);
} else {
  console.error('Enter a todo item.');
}