import { readFile } from '../utils/fileSystem.js';
import { join } from 'path';
import { parseTaskBody } from '../utils/helpers.js';

export const TASK_BY_ID_VALID = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!isNaN(id)) {
      const tasks = readFile(join('src', 'db'), 'tasks.json');

      const task = tasks.find((task) => task.id == id);

      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      next();
    }

    res.status(400).json({ error: 'Invalid request params' });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const ADD_TASK_VALID = (req, res, next) => {
  try {
    const tasks = readFile(join('src', 'db'), 'tasks.json');

    if (tasks.length >= 0) {
      next();
    }

    res.status(500).json({ error: 'Internal server error' });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const UPDATE_TASK_VALID = (req, res, next) => {
  try {
    const data = parseTaskBody(req.body);

    if (data instanceof Error) {
      res.status(400).json({ error: JSON.parse(data.message) });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
