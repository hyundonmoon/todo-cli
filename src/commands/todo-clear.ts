#!/usr/bin/env node
import { confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import { Command } from 'commander';
import db from '../helper/db.js';

const program = new Command();
program.parse();

async function clearTodos() {
  try {
    db.data.todos = [];
    await db.write();
  } catch (e) {
    throw e;
  }
}

try {
  const confirmed = await confirm({
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

  if (confirmed) {
    await clearTodos();

    console.log(
      chalk.green(
        'All todos have been cleared! Your list is now fresh and ready for new tasks.'
      )
    );
  } else {
    console.log(chalk.yellowBright('Action canceled. No todos were deleted.'));
  }
} catch (e) {
  console.log(
    chalk.red('An error occurred while clearing todo items. Please try again.')
  );
}
