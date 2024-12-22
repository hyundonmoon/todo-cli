#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import { v4 as uuidv4 } from 'uuid';
import db from '../helper/db.js';
import { logTodo } from '../helper/logTodos.js';

const program = new Command();
program.parse();

async function addTodo(todo: string): Promise<Todo> {
  try {
    const newTodo: Todo = {
      todo,
      done: false,
      id: uuidv4().slice(0, 8),
      createdAt: new Date(),
    };

    db.data.todos.push(newTodo);
    await db.write();

    return newTodo;
  } catch (e) {
    throw e;
  }
}

try {
  if (program.args.length) {
    const [todoItem] = program.args;
    const newTodo = await addTodo(todoItem);

    console.log(chalk.green(`Added the following todo:`));
    logTodo(newTodo);
  } else {
    console.log(chalk.red('Please provide a todo item to add'));
  }
} catch (e) {
  console.log(
    chalk.red(
      'An error occurred while trying to add a todo item. Please try again.'
    )
  );
}
