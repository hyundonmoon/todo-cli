# To-Do List CLI

A command-line tool to manage your to-do list. This tool allows you to add, list, toggle, and remove todos from your to-do list directly from the terminal.

## Features

- Add new todos
- List all todos
- Toggle the status of todos (mark as done/undone)
- Remove todos

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hyundonmoon/todo-cli.git
   cd todo-cli
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Link the package locally:**
   ```bash
   npm link
   ```

## Usage

Once the package is linked, you can use the `todo` command from anywhere in your terminal.

### Add a New Todo

To add a new todo, use the `add` command followed by its description:

```bash
todo add "Learn Node.js"
```

### List All Todos

To list all todos, use the `list` or `ls` command:

```bash
todo list
todo ls
```

### Toggle Todo Status

To toggle the status of one or more todos (mark as done/undone), use the `toggle` command:

```bash
todo toggle
```

You will be prompted to select todos to toggle their status.

### Remove Todos

To remove one or more todos, use the `remove` or `rm` command:

```bash
todo remove
todo rm
```

You will be prompted to select todos to remove.

## Examples

### Adding Todos

```bash
$ todo add "Write README"
Added new todo: Write README
```

### Listing Todos

```bash
$ todo list
1. [ ] Write README
2. [ ] Learn Node.js
```

### Toggling Todo Statuses

```bash
$ todo toggle
? Which todo item status would you like to toggle?
 ◯ [ ] Write README
 ◯ [ ] Learn Node.js
Toggled the statuses of the following items:
```

### Removing Todos

```bash
$ todo remove
? Which todo item would you like to delete?
 ◯ [ ] Write README
 ◯ [ ] Learn Node.js
```
