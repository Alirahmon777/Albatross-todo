import React from 'react';
import { api } from '../utils/api';

export default function EditModal({ categories, setOpen, setCategories }) {
  const addCategory = () => {
    api()
      .post('/categories', {})
      .then((res) => {
        setCategories(res.data);
      });
  };

  const removeCategory = (id) => {
    api()
      .delete(`/categories/${id}`)
      .then((res) => {
        setCategories(res.data);
      });
  };

  return (
    <div className='h-full w-full fixed flex justify-center items-center bg-[rgba(0,0,0,.15)] z-[999]'>
      <dialog className='category-editor flex-col' open=''>
        <div className='category-editor-header flex-row'>
          <h2 className=''>Categories</h2>
          <div className='flex-spacer w-0 flex-grow'></div>
          <button
            title='Save and close'
            className='dialog-close'
            onClick={() => setOpen(false)}
          >
            Done
          </button>
        </div>
        <ul className='category-editor-list flex-col'>
          {categories?.map((category) => (
            <li className='category-editor-item flex-row'>
              <input
                type='color'
                value={category.background}
                className='category-editor-color-input'
              />
              <input
                placeholder='New category'
                value={category.title}
                className='category-editor-name-input'
              />
              <button
                title='Delete category'
                className='category-editor-delete'
                onClick={() => removeCategory(category.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
        <button
          title='Add category'
          className='category-editor-add'
          onClick={() => addCategory()}
        >
          + New Category
        </button>
      </dialog>
    </div>
  );
}
