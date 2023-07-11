import { Router } from 'express';
import {
  getCategories,
  addCategories,
  getCategoryById,
  removeCategory,
  updateCategory,
} from '../controllers/categories.js';
export const categoryRouter = Router();

categoryRouter.get('/categories', getCategories);
categoryRouter.post('/categories', addCategories);
categoryRouter.get('/categories/:id', getCategoryById);
categoryRouter.delete('/categories/:id', removeCategory);
categoryRouter.put('/categories/:id', updateCategory);
