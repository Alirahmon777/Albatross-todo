import { Router } from 'express';
import {
  addTasks,
  getTaskById,
  getTasks,
  removeTask,
  updateTask,
} from '../controllers/tasks.js';
export const taskRouter = Router();

taskRouter.get('/tasks', getTasks);
taskRouter.post('/tasks', addTasks);
taskRouter.get('/tasks/:id', getTaskById);
taskRouter.delete('/tasks/:id', removeTask);
taskRouter.put('/tasks/:id', updateTask);
