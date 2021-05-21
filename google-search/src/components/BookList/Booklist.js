import React from 'react';
import './BookList.css';

export function Booklist({ children }) {
    return (
        <div className='listOverflow'>
            <ul className='listGroup'>
                {children}
            </ul>
        </div>
    )
}