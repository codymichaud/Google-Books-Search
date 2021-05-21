import React from './react';
import './DeleteBtn.css';

function DeleteBtn(props) {
    return (
        <span className='deleteBtn' {...props} role='button' tabindex='0'>
            ✗
        </span>
    );
}

export default DeleteBtn;