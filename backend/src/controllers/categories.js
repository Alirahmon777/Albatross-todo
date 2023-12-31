import { readFile, writeFile } from '../utils/fileSystem.js';
import { join } from 'path';

export const GET_CATEGORIES = (req, res) => {
  try {
    res.status(200).json(readFile(join('src', 'db'), 'categories.json'));
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const GET_CATEGORY_BY_ID = (req, res) => {
  try {
    const id = req.params.id;

    const categories = readFile(join('src', 'db'), 'categories.json');

    const task = categories.find((task) => task.id == id);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const ADD_CATEGORIES = (req, res) => {
  try {
    const categories = readFile(join('src', 'db'), 'categories.json');

    categories.push({
      id: categories.at(-1)?.id + 1 || 1,
      title: '',
      background: `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase()}`,
    });

    writeFile(join('src', 'db'), 'categories.json', categories);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const REMOVE_CATEGORY = (req, res) => {
  try {
    const id = req.params.id;

    const categories = readFile(join('src', 'db'), 'categories.json');

    const filteredCategories = categories.filter((task) => task.id != id);

    writeFile(join('src', 'db'), 'categories.json', filteredCategories);

    res.status(200).json(filteredCategories);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const UPDATE_CATEGORY = (req, res) => {
  try {
    const id = req.params.id;

    const data = req.body;

    const { title, background } = data;

    const categories = readFile(join('src', 'db'), 'categories.json');
    const category = categories?.find((category) => category.id == id);

    category.title = title ?? category.title;
    category.background = background ?? category.background;

    writeFile(join('src', 'db'), 'categories.json', categories);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
