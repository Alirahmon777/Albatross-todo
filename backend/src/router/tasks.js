import { Router } from 'express';

import { ADD_TASKS, GET_TASK_BY_ID, GET_TASKS, REMOVE_TASK, UPDATE_TASK } from '../controllers/tasks.js';

import { ADD_TASK_VALID, TASK_BY_ID_VALID, UPDATE_TASK_VALID } from '../middlewares/tasks.js';

export const taskRouter = Router();

taskRouter.get('/tasks', GET_TASKS);
taskRouter.get('/tasks/:id', TASK_BY_ID_VALID, GET_TASK_BY_ID);
taskRouter.post('/tasks', ADD_TASK_VALID, ADD_TASKS);
taskRouter.delete('/tasks/:id', TASK_BY_ID_VALID, REMOVE_TASK);
taskRouter.patch('/tasks/:id', TASK_BY_ID_VALID, UPDATE_TASK_VALID, UPDATE_TASK);
