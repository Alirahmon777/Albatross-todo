import { readFile } from '../utils/fileSystem.js';
import { join } from 'path';
export const getCategories = (req, res) => {
  try {
    res.status(200).json(readFile(join('src', 'db'), 'categories.json'));
  } catch (error) {
    res.status(500).json({
      error: error.stack,
    });
  }
};
export const addCategories = (req, res) => {};
export const getCategoryById = (req, res) => {};
export const removeCategory = (req, res) => {};
export const updateCategory = (req, res) => {};
