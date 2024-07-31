#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import checkbox from '@inquirer/checkbox';
import readTodos from '../helper/readTodos.js';
import logTodos from '../helper/logTodos.js';
import writeTodos from '../helper/writeTodos.js';

const program = new Command();

await program.parseAsync();

async function promptAndRemoveTodos(todos: Todo[]) {
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
}

// TODO: could probably be improved
async function removeTargetIds(todos: Todo[], ids: string[]) {
  if (!todos.length || !ids.length) return;
  const newTodos: Todo[] = [];
  const removedTodos: Todo[] = [];

  const idsMap = ids.reduce((acc, curr) => {
    acc.set(curr, true);
    return acc;
  }, new Map<string, true>());

  for (let todo of todos) {
    if (idsMap.has(todo.id)) {
      removedTodos.push(todo);
      idsMap.delete(todo.id);
    } else {
      newTodos.push(todo);
    }
  }

  if (todos.length === newTodos.length) {
    console.log(chalk.yellow('Please enter valid IDs.'));
  } else {
    writeTodos(newTodos);

    console.log('Removed the following todos: ');
    logTodos(removedTodos);
  }
}

async function removeTodos(ids: string[]) {
  const todos = readTodos();

  if (todos.length === 0) {
    console.log(chalk.yellow('No todos found.'));
    return;
  }

  if (ids.length) {
    await removeTargetIds(todos, ids);
  } else {
    await promptAndRemoveTodos(todos);
  }
}

try {
  await removeTodos(program.args);
} catch (e) {
  console.log('Error when removing todo items. Please try again.');
}
