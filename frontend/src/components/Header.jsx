import React from 'react';

export default function Header() {
  return (
    <header className='flex-row justify-between'>
      <h1>
        <a
          className='hover:underline font-bold text-[#111111]'
          href='https://albatross.oaklang.org/'
        >
          Albatross
        </a>
      </h1>
      <button title='Dark mode' className='theme-button'>
        🌘
      </button>
    </header>
  );
}
