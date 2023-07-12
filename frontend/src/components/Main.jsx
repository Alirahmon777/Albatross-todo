import { useContext, useEffect, useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { api } from '../utils/api';
import TaskCard from './TaskCard';
import {
  updateBody,
  updateCategoryId,
  updateDate,
  updateSmallBody,
} from '../utils/helpers';
import { TasksContext } from '../context/TasksContext';
import EditModal from './EditModal';

export default function Main() {
  const { tasks, setTasks, active, setActive } = useContext(TasksContext);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [openUpdates, setOpenUpdates] = useState(false);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filteredTasks = tasks?.filter((task) => task.completed != true);

  const activetask = tasks?.find((task) => task.id == active);

  const addTask = async () => {
    await api()
      .post('/tasks', {})
      .then((res) => {
        setTasks(res.data);
        setOpenUpdates(true);
        setActive(() => res.data.length + 1);
      });
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const handleDelete = async () => {
    const confirmDelete = confirm('Delete this task?');

    confirmDelete
      ? await api()
          .delete(`/tasks/${active}`)
          .then((res) => {
            setTasks(res.data);
            setOpenUpdates(false);
          })
      : null;
  };

  const searchingTask = () => {
    return tasks.filter((task) =>
      task.body.toLowerCase().includes(search?.toLowerCase())
    );
  };

  useEffect(() => {
    api()
      .get('/tasks')
      .then((res) => setTasks(res.data));

    api()
      .get('/categories')
      .then((res) => setCategories(res.data));
  }, []);

  return (
    <>
      {open ? (
        <EditModal
          categories={categories}
          setOpen={setOpen}
          setCategories={setCategories}
        />
      ) : null}
      <main className='flex-row'>
        <SnackbarProvider />
        <div className='task-list'>
          <div className='task-list-search flex-col'>
            <div className='task-list-search-row flex-row'>
              <input
                placeholder={`Search ${tasks.length} tasks...`}
                className='task-list-search-input flex-grow w-0'
                onChange={handleSearch}
              />
              <button
                title='New task'
                className='task-list-new-task bg-[#bd4444] text-[#fdfeff]'
                onClick={() => addTask()}
              >
                +
              </button>
            </div>
            <div className='task-list-search-row flex-row'>
              <button
                title='Show tasks marked as done'
                className='task-list-show-done'
                onClick={() => setShow(!show)}
              >
                {!show ? 'Show done' : 'Hide done'}
              </button>
              <select className='task-list-range-select flex-grow w-0'>
                <option value='today' className=''>
                  Today
                </option>
                <option value='week' className=''>
                  This week
                </option>
                <option value='month' className=''>
                  Next 30 days
                </option>
                <option value='all' className=''>
                  All tasks
                </option>
              </select>
            </div>
          </div>
          <div className='task-list-list'>
            {tasks.length ? (
              <div className='day day-mons'>
                <div className='pt-2 pb-[0.3em] border-b border-b-[#111] font-bold justify-between flex-row'>
                  <p>Today</p>
                  <p>{!show ? filteredTasks.length : tasks.length}</p>
                </div>
                <ul className='tasks flex-col !pl-0 !gap-1 !my-1 !mx-0 '>
                  {!search.length == 0
                    ? searchingTask().map((task, i) =>
                        show || !task.completed ? (
                          <TaskCard
                            categories={categories}
                            task={task}
                            key={i}
                            setOpenUpdates={setOpenUpdates}
                          />
                        ) : (
                          ''
                        )
                      )
                    : tasks.map((task, i) =>
                        show || !task.completed ? (
                          <TaskCard
                            categories={categories}
                            task={task}
                            key={i}
                            setOpenUpdates={setOpenUpdates}
                          />
                        ) : (
                          ''
                        )
                      )}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        <div className='task-page'>
          {openUpdates ? (
            <>
              <div className='task-page-header flex-row'>
                <button
                  title='Close'
                  className='task-page-header-close'
                  onClick={() => {
                    setOpenUpdates(false);
                    setActive(0);
                  }}
                >
                  Close
                </button>
                <button title='Move up in list' className='task-page-header-up'>
                  ↖
                </button>
                <button
                  title='Move down in list'
                  className='task-page-header-down'
                >
                  ↘
                </button>
                <div className='flex-grow h-0 w-0'></div>
                <button
                  title='Delete task'
                  className='task-page-header-delete'
                  onClick={() => handleDelete()}
                >
                  Delete
                </button>
                <button
                  title='Pull forward 1 day'
                  className='task-page-header-prev'
                >
                  ←
                </button>
                <button title='Make due day' className='task-page-header-today'>
                  ↓
                </button>
                <button
                  title='Postpone 1 day'
                  className='task-page-header-next'
                >
                  →
                </button>
              </div>
              <div className='task-editor items-start gap-2'>
                <div className='task-editor-text'>
                  <div className='textarea-group'>
                    <div className='textarea-shadow'></div>
                    <textarea
                      placeholder='Do this'
                      className='textarea-itself'
                      defaultValue={activetask?.body}
                      onChange={(e) => {
                        updateBody(e.target.value, active, setTasks);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className='task-editor-option-row'>
                  <div className='task-editor-option-subrow'>
                    <input
                      type='date'
                      value={activetask?.date}
                      onChange={(e) => {
                        updateDate(e.target.value, active, setTasks);
                      }}
                      className='task-editor-due-input'
                    />
                    <button
                      title='Unset due date'
                      className='task-editor-due-reset'
                      onClick={() => {
                        updateDate('', active, setTasks);
                      }}
                    >
                      Unset
                    </button>
                  </div>
                  <div className='task-editor-option-subrow'>
                    <select
                      className='task-editor-category-select'
                      value={activetask?.categoryId}
                      onChange={async (e) => {
                        updateCategoryId(e.target.value, active, setTasks);
                      }}
                    >
                      <option value='0' className=''>
                        No category
                      </option>
                      <optgroup label='Categories' className=''>
                        {categories.map((category, i) => (
                          <option key={i} value={category.id} className=''>
                            {category.title}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    <button
                      className='task-editor-category-edit'
                      onClick={() => setOpen(true)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
                <div className='task-editor-body'>
                  <div className='textarea-group'>
                    <div className='textarea-shadow '></div>
                    <textarea
                      placeholder='Some more context'
                      defaultValue={activetask?.smallBody}
                      onChange={(e) => {
                        updateSmallBody(e.target.value, active, setTasks);
                      }}
                      className='textarea-itself'
                    ></textarea>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </main>
    </>
  );
}
