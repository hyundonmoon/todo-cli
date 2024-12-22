#!/usr/bin/env node

import { Command } from 'commander';
import console from 'console';
import db from '../helper/db.js';
import { logTodo } from '../helper/logTodos.js';
import readTodos from '../helper/readTodos.js';

const program = new Command();
await program.parseAsync();

async function popPendingTodo() {
  const todos = readTodos();
  const pending = todos.filter((todo) => !todo.done);
  const popped = pending.pop();

  if (!popped) {
    return;
  }

  db.data.todos = todos.filter((todo) => todo.id !== popped.id);
  await db.write();
  return popped;
}

try {
  const popped = await popPendingTodo();
  if (popped) {
    console.log('Popping the last pending todo item from the list.');
    logTodo(popped);
  } else {
    console.log('The todo list is empty.');
  }
} catch (e) {
  console.log(
    'An error occured while popping the last todo item. Please try again.'
  );
}
