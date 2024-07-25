#!/usr/bin/env node
import { Command } from 'commander';
import readTodos from '../helper/readTodos.js';
import writeTodos from '../helper/writeTodos.js';

const program = new Command();

await program.parseAsync();

async function removeTodosMarkedAsDone() {
  const todos = readTodos();
  const filteredTodos = todos.filter((todo) => !todo.done);
  writeTodos(filteredTodos);
  console.log('Removed all todo items marked as done.');
}

try {
  await removeTodosMarkedAsDone();
} catch (e) {
  console.log(
    'An error occured while removing items marked as done. Please try again.'
  );
}
