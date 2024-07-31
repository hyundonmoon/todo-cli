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
    const newTodo: Todo = {
      todo,
      done: false,
      id: uuidv4().slice(0, 8),
      createdAt: new Date(),
    };

    writeTodos([...todos, newTodo]);
    console.log(chalk.green(`Added new todo: ${todo}`));
  }
}

try {
  if (program.args.length) {
    const [todoItem] = program.args;
    addTodo(todoItem);
  } else {
    console.log('Enter a todo item.');
  }
} catch (e) {
  console.log('An error occured while adding the todo item. Please try again');
}
