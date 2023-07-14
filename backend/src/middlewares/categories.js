import { readFile } from '../utils/fileSystem.js';
import { join } from 'path';

export const CATEGORY_BY_ID_VALID = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!isNaN(id)) {
      const categories = readFile(join('src', 'db'), 'categories.json');

      const category = categories.find((category) => category.id == id);

      if (!category) {
        res.status(404).json({ error: 'Category not found' });
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

export const ADD_CATEGORY_VALID = (req, res, next) => {
  try {
    const categories = readFile(join('src', 'db'), 'categories.json');

    if (categories.length >= 0) {
      next();
    }

    res.status(500).json({ error: 'Internal server error' });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
