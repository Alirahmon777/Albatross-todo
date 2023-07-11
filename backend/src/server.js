import express from 'express';
import 'dotenv/config';
import { PORT } from './utils/constants.js';
import { taskRouter } from './router/tasks.js';
import cors from 'cors';
import { categoryRouter } from './router/categories.js';

(() => {
  try {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(taskRouter);
    app.use(categoryRouter);

    app.listen(PORT, () => console.log('Server is runnig on port ' + PORT));
  } catch (error) {
    console.log(error.message);
  }
})();
