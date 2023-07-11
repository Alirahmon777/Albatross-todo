import React from 'react';

export default function Footer() {
  return (
    <footer className='flex-row justify-between'>
      <div className=''>
        <a
          href='https://github.com/thesephist/albatross'
          target='_blank'
          className='underline'
        >
          Albatross
        </a>
        , a way to organize life, by{' '}
        <a href='https://thesephist.com' target='_blank' className='underline'>
          L
        </a>
        {' for '}
        <a
          href='https://karinanguyen.com'
          target='_blank'
          className='underline'
        >
          K
        </a>
        .
      </div>
      <p>
        Copied from{' '}
        <a
          href='https://albatross.oaklang.org/'
          target='_blank'
          className='hover:underline font-bold text-[#979797]'
        >
          Albatross
        </a>
      </p>
    </footer>
  );
}
