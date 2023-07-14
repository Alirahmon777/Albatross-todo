import { Router } from 'express';
import {
  GET_CATEGORIES,
  ADD_CATEGORIES,
  GET_CATEGORY_BY_ID,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
} from '../controllers/categories.js';
import { ADD_CATEGORY_VALID, CATEGORY_BY_ID_VALID } from '../middlewares/categories.js';
export const categoryRouter = Router();

categoryRouter.get('/categories', GET_CATEGORIES);
categoryRouter.get('/categories/:id', CATEGORY_BY_ID_VALID, GET_CATEGORY_BY_ID);
categoryRouter.post('/categories', ADD_CATEGORY_VALID, ADD_CATEGORIES);
categoryRouter.delete('/categories/:id', CATEGORY_BY_ID_VALID, REMOVE_CATEGORY);
categoryRouter.put('/categories/:id', CATEGORY_BY_ID_VALID, UPDATE_CATEGORY);
