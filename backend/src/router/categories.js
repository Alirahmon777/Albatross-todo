import { Router } from 'express';
import {
  GET_CATEGORIES,
  ADD_CATEGORIES,
  GET_CATEGORY_BY_ID,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY,
} from '../controllers/categories.js';
export const categoryRouter = Router();

categoryRouter.get('/categories', GET_CATEGORIES);
categoryRouter.post('/categories', ADD_CATEGORIES);
categoryRouter.get('/categories/:id', GET_CATEGORY_BY_ID);
categoryRouter.delete('/categories/:id', REMOVE_CATEGORY);
categoryRouter.put('/categories/:id', UPDATE_CATEGORY);
