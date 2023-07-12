import { Router } from 'express';
import {
  ADD_TASKS,
  GET_TASK_BY_ID,
  GET_TASKS,
  REMOVE_TASK,
  UPDATE_TASK,
} from '../controllers/tasks.js';
export const taskRouter = Router();

taskRouter.get('/tasks', GET_TASKS);
taskRouter.post('/tasks', ADD_TASKS);
taskRouter.get('/tasks/:id', GET_TASK_BY_ID);
taskRouter.delete('/tasks/:id', REMOVE_TASK);
taskRouter.patch('/tasks/:id', UPDATE_TASK);
