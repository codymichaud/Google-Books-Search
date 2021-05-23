import React from 'react';
import './booklist.css'

export function BookListItem({ children }) {
    return <li className='listItem'>{children}</li>;
}