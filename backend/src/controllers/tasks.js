import { readFile, writeFile } from '../utils/fileSystem.js';
import { join } from 'path';

export const getTasks = (req, res) => {
  try {
    res.status(200).json(readFile(join('src', 'db'), 'tasks.json'));
  } catch (error) {
    res.status(500).json({
      error: error.stack,
    });
  }
};

export const getTaskById = (req, res) => {
  try {
    const id = req.params.id;

    const tasks = readFile(join('src', 'db'), 'tasks.json');

    const task = tasks.find((task) => task.id == id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      error: error.stack,
    });
  }
};

export const addTasks = (req, res) => {
  try {
    const tasks = readFile(join('src', 'db'), 'tasks.json');

    tasks.push({
      id: tasks.at(-1)?.id + 1 || 1,
      body: '',
      orderId: 1,
      completed: false,
      smallBody: '',
      date: '10.07.2023',
      categoryId: 0,
    });

    writeFile(join('src', 'db'), 'tasks.json', tasks);
    res.send(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.stack,
    });
  }
};

export const removeTask = (req, res) => {
  try {
    const id = req.params.id;

    const tasks = readFile(join('src', 'db'), 'tasks.json');

    const filteredTasks = tasks.filter((task) => task.id != id);

    writeFile(join('src', 'db'), 'tasks.json', filteredTasks);

    res.status(200).json(filteredTasks);
  } catch (error) {
    res.status(500).json({
      error: error.stack,
    });
  }
};

export const updateTask = (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const { date, categoryId, completed, body, smallBody } = data;
    const tasks = readFile(join('src', 'db'), 'tasks.json');
    const task = tasks?.find((task) => task.id == id);

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    if(!parseData){
      
    }

    task.date = date ?? task.date;
    task.body = body ?? task.body;
    task.categoryId =
      (categoryId ? +categoryId : categoryId) ?? task.categoryId;
    task.smallBody = smallBody ?? task.smallBody;
    task.completed = completed ?? task.completed;

    writeFile(join('src', 'db'), 'tasks.json', tasks);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.stack,
    });
  }
};
