import { api } from './api';

export const updateBody = (body, active, setTasks) => {
  api()
    .patch(`/tasks/${active}`, {
      body: body?.trim(),
    })
    .then((res) => {
      setTasks(res.data);
    });
};

export const updateSmallBody = (smallBody, active, setTasks) => {
  api()
    .patch(`/tasks/${active}`, {
      smallBody: smallBody?.trim(),
    })
    .then((res) => {
      setTasks(res.data);
    });
};

export const updateDate = (date, active, setTasks) => {
  api()
    .patch(`/tasks/${active}`, {
      date,
    })
    .then((res) => {
      setTasks(res.data);
    });
};

export const updateCompleted = (completed, active, setTasks) => {
  api()
    .patch(`/tasks/${active}`, {
      completed,
    })
    .then((res) => {
      setTasks(res.data);
    });
};

export const updateCategoryId = (categoryId, active, setTasks) => {
  api()
    .patch(`/tasks/${active}`, {
      categoryId: +categoryId,
    })
    .then((res) => {
      setTasks(res.data);
    });
};
