import React, { useContext } from 'react';
import { SnackbarProvider } from 'notistack';
import { updateCompleted } from '../utils/helpers';
import { TasksContext } from '../context/TasksContext';

export default function TaskCard({ categories, task, setOpenUpdates }) {
  const { setTasks, setActive, active } = useContext(TasksContext);
  const category = categories.find((c) => c.id == task.categoryId);

  return (
    <li
      className={`task-li w-full hover:bg-[#fdfeff] ${
        active == task.id ? 'bg-[#fdfeff]' : ''
      }`}
      onClick={() => {
        setOpenUpdates(true);
        setActive(task.id);
      }}
    >
      <SnackbarProvider />
      <div
        className={`task task-${
          task.completed ? 'done' : 'undone'
        } !cursor-default`}
      >
        <label className='task-status cursor-pointer'>
          <input
            type='checkbox'
            checked={task.completed}
            className='task-checkbox pointer-events-none'
            onChange={() => updateCompleted(!task.completed, active, setTasks)}
          />
        </label>
        <div tabIndex='0' className='task-content'>
          <div className={`task-text ${task.completed ? 'line-through' : ''}`}>
            {!task.body ? 'Unnamed task' : task.body}
          </div>
          <div className='task-body-preview'>
            {task.date ? (
              <span className=''>
                <span className='task-due'>{task.date}</span>{' '}
                {task.smallBody ? ' · ' : ''}
              </span>
            ) : (
              ''
            )}
            {task.smallBody}
          </div>
          {category ? (
            <div className='task-category mt-1'>
              <div
                className='category'
                style={{ background: category?.background }}
              >
                {category?.title}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}
