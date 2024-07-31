#!/usr/bin/env node
import { Command } from 'commander';
import writeTodos from '../helper/writeTodos.js';
import chalk from 'chalk';
import { confirm } from '@inquirer/prompts';

const program = new Command();

program.parse();

async function clearTodos() {
  const answer = await confirm({
    message:
      'WARNING: This action will permanently delete all todos. Are you sure you want to proceed?',
    default: false,
    theme: {
      prefix: '!',
      style: {
        message: (message: string) => chalk.bgRedBright(message),
      },
    },
  });

  if (answer) {
    writeTodos([]);
    console.log(
      chalk.green(
        'All todos have been cleared! Your list is now fresh and ready for new tasks.'
      )
    );
  } else {
    console.log(chalk.yellowBright('Action canceled. No todos were deleted.'));
  }
}

try {
  await clearTodos();
} catch (e) {
  console.log(chalk.yellowBright('Action canceled. No todos were deleted.'));
}
